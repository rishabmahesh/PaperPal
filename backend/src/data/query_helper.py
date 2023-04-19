import pandas as pd
import numpy as np
import json
from database.combine_intermediate_jsons import get_cosine_similarity_matrix, get_csm_matrix_from_zip


author = pd.read_csv("./database/BiblioVIS/CSV_Author.csv")
paper = pd.read_csv("./database/BiblioVIS/CSV_Paper.csv")
author_paper = pd.read_csv("./database/BiblioVIS/CSV_Author_Paper.csv")
author_paper_affiliation = pd.read_csv("./database/BiblioVIS/CSV_Paper_Author_Affiliation.csv")
# csm_df = get_cosine_similarity_matrix(as_df=True, intermediate_folder_path="./database/mapped_intermediate_folder")
# convert csm_df to matrix
# csm_df = csm_df.pivot(index='Paper_ID_1', columns='Paper_ID_2', values='Cosine_Similarity').fillna(1)
csm_df = get_csm_matrix_from_zip("./database/pivot_df.csv.zip")
def get_info_from_id(paper_id):
    authors = paper[paper["Paper_ID"] == int(paper_id)].merge(author_paper, on="Paper_ID").merge(author, on="Author_ID")['Name'].values
    response_payload = json.loads(paper[paper['Paper_ID'] == int(paper_id)].to_json(orient='records'))[0]
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


def get_recommendations(paper_id_arr, n):
    top_n_for_each_paper = {pid: [] for pid in paper_id_arr}
    all_paper_ids = get_all_paper_ids()
    for pid in paper_id_arr:
        top_n_for_each_paper[pid] = json.loads(csm_df.loc[pid].sort_values(ascending=False)[1:n+1].to_json())
    return top_n_for_each_paper


if __name__ == "__main__":
    resp = get_recommendations([146361, 146362], 10)
    print(resp)
