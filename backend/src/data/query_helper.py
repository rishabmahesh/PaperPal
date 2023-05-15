import pandas as pd
import numpy as np
import json
from src.utils.constants import logger
from database.combine_intermediate_jsons import get_cosine_similarity_matrix, get_csm_matrix_from_zip


author = pd.read_csv("./database/BiblioVIS/CSV_Author.csv")
paper = pd.read_csv("./database/BiblioVIS/CSV_Paper.csv")
author_paper = pd.read_csv("./database/BiblioVIS/CSV_Author_Paper.csv")
author_paper_affiliation = pd.read_csv("./database/BiblioVIS/CSV_Paper_Author_Affiliation.csv")
# csm_df = get_cosine_similarity_matrix(as_df=True, intermediate_folder_path="./database/mapped_intermediate_folder")
# convert csm_df to matrix
# csm_df = csm_df.pivot(index='Paper_ID_1', columns='Paper_ID_2', values='Cosine_Similarity').fillna(1)
csm_df = get_csm_matrix_from_zip("./database/pivot_df.csv.zip")
def get_info_from_id(_paper_id):
    paper_id = str(int(_paper_id))
    logger.debug(f"getting info for paper_id: {paper_id}")
    authors = paper[paper["Paper_ID"] == int(paper_id)].merge(author_paper, on="Paper_ID").merge(author, on="Author_ID")['Name'].values
    logger.debug(f"authors: {authors}")
    response_payload = json.loads(paper[paper['Paper_ID'] == int(paper_id)].to_json(orient='records'))
    logger.debug(f"response_payload: {response_payload}")
    response_payload = response_payload[0]
    response_payload['Authors'] = authors.tolist()
    return response_payload


def get_title_from_id(paper_id):
    return paper[paper["Paper_ID"] == int(paper_id)]['Title']


def get_papers_by_author(name=None, author_id=None):
    # todo: implement this
    if name:
        pass

    if author_id:
        pass
    pass


def get_author_id_from_name(name):
    pass



def get_papers_from_university():
    pass


def get_all_abstracts():
    return paper[['Paper_ID', 'Abstract']]


def get_all_authors():
    return author[['Author_ID', 'Name']]


def get_all_paper_ids():
    return paper['Paper_ID'].values


def get_recommendations(paper_id_arr, n, v2=False):
    if not v2:
        top_n_for_each_paper = {pid: [] for pid in paper_id_arr}
        for pid in paper_id_arr:
            top_n_for_each_paper[pid] = json.loads(csm_df.loc[pid].sort_values(ascending=False)[1:n + 1].to_json())
        return top_n_for_each_paper
    else:
        logger.debug("getting recommendations for authors")
        reco_set1 = get_papers_with_same_authors(paper_id_arr, n)
        logger.debug("getting recommendations for keywords")
        reco_set2 = get_papers_with_same_keywords(paper_id_arr, n)
        # use cosine similarity matrix to get top n papers for each paper in paper_id_arr and add to reco_set3
        logger.debug("getting recommendations for abstract")
        reco_set3 = []
        logger.debug("iterating over paper_id_arr")
        for pid in paper_id_arr:
            # get top n papers from csm_df
            top_n_papers = csm_df[str(pid)].sort_values(ascending=False).head(n)
            reco_set3.extend(top_n_papers.index.values)
        reco_set3 = np.array(reco_set3)
        unique_recos = np.unique(np.concatenate((reco_set1, reco_set2, reco_set3))).tolist()
        # remove papers in paper_id_arr from unique_recos
        logger.debug("removing papers in paper_id_arr to get unique_recos")
        unique_recos = [x for x in unique_recos if int(x) not in [int(i) for i in paper_id_arr]]
        return unique_recos


def get_papers_with_same_authors(paper_id_arr, n):
    # create a set of authors from the paper_id_arr
    authors = set()
    logger.debug("getting authors from paper_id_arr")
    for pid in paper_id_arr:
        authors.update(get_paper_authors(pid))
    # for each paper in all papers, get the authors and check if they are in the set
    paper_authors_subset = author_paper[author_paper['Author_ID'].isin(list(authors))]
    common_author_count = paper_authors_subset.groupby('Paper_ID').count()
    # sort by count and get top n PaperIDs
    logger.debug("getting top n papers with same authors")
    top_n_papers = common_author_count.sort_values(by='Author_ID', ascending=False).head(n)
    return top_n_papers.index.values


def get_papers_with_same_keywords(paper_id_arr, n):
    # create a set of keywords from the paper_id_arr
    keywords = set()
    logger.debug("getting keywords from paper_id_arr")
    for pid in paper_id_arr:
        keywords.update(get_paper_keywords(pid))
    # for each paper in all papers, get the keywords and check if they are in the set
    paper_keywords_subset = paper[paper['IEEE_Keywords'].isin(list(keywords))]
    common_keyword_count = paper_keywords_subset.groupby('Paper_ID').count()
    # sort by count and get top n PaperIDs
    logger.debug("getting top n papers with same keywords")
    top_n_papers = common_keyword_count.sort_values(by='IEEE_Keywords', ascending=False).head(n)
    return top_n_papers.index.values



def get_paper_authors(paper_id):
    return author_paper[author_paper['Paper_ID'] == str(int(paper_id))]['Author_ID'].values


def get_paper_keywords(paper_id):
    return paper[paper['Paper_ID'] == str(int(paper_id))]['IEEE_Keywords'].values


def get_cosine_similarity_paper_with_set(paper_id, paper_id_set):
    # ignore the first value as it is the paper itself
    logger.debug("getting cosine similarity for paper_id: {} with paper_id_set: {}".format(paper_id, paper_id_set))
    csm_arr = csm_df[str(int(paper_id))].sort_values(ascending=False).head(len(paper_id_set) + 1).values[1:]
    return csm_arr


if __name__ == "__main__":
    _paper_ids = [1372243]
    # resp = get_recommendations([146361, 146362], 10)
    # resp = get_papers_with_same_authors(_paper_ids, 5)
    resp = get_recommendations(_paper_ids, 5, v2=True)
    print(resp)
