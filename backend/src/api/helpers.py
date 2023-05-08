import time
from src.utils.constants import FAIL_RECOS
from src.data.query_helper import get_info_from_id, get_title_from_id, get_all_authors, get_recommendations, get_paper_authors, get_paper_keywords, get_cosine_similarity_paper_with_set
import pandas as pd


session_data_dict = {}
def title_helper(inp_json, action):
    return get_title_from_id(action)


def info_helper(inp_json):
    return [get_info_from_id(i) for i in inp_json]


def info_helper_single(paper_id):
    return get_info_from_id(paper_id)


def recommendations_helper(inp_json, v2=False):
    if not v2:
        return get_recommendations(inp_json, 5)
    else:
        reco_list = get_recommendations(inp_json, 5, v2=True)
        return [get_info_from_id(i) for i in reco_list]


def authors_helper():
    return get_all_authors()["Name"].values

def home_helper():
    return f"You've reached HOME at {time.time()}!"


def insights_helper(paper_id_list, query_paper_id):
    """

    :param paper_id_list: list of paper IDs to compare against
    :param query_paper_id: paper that has been toggled on the frontend
    :return:
    """
    # author insights
    # get all authors of query_paper_id
    query_authors = get_paper_authors(query_paper_id)
    author_intersection_array = []
    # for each paper is paper_id_list
    for input_paper_id in paper_id_list:
        # get all author IDs for the paper
        input_paper_authors = get_paper_authors(input_paper_id)
        # get intersection of the two sets and store length of intersection in an array
        intersection = len(set(query_authors).intersection(set(input_paper_authors)))
        print(f"intersection = {intersection}")
        print(f"set 1 = {set(query_authors)}")
        print(f"set 2 = {set(input_paper_authors)}")
        author_intersection_array.append(intersection)
    print(author_intersection_array)
    author_intersection_col = author_intersection_array

    # keyword insights
    # get keyword string of query_paper_id
    query_keywords_str = get_paper_keywords(query_paper_id)[0]
    query_keywords_set = set(query_keywords_str.split(","))
    keyword_intersection_array = []
    # for each paper is paper_id_list
    for input_paper_id in paper_id_list:
        # get keyword string of input_paper_id
        input_keywords_str = get_paper_keywords(input_paper_id)[0]
        input_keywords_set = set(input_keywords_str.split(","))
        # get intersection of the two sets and store length of intersection in an array
        intersection = len(query_keywords_set.intersection(input_keywords_set))
        keyword_intersection_array.append(intersection)
    keyword_intersection_col = keyword_intersection_array


    # abstract insights
    # for each paper is paper_id_list get cosine similarity of abstracts with query_paper_id
    # get top 5 papers with highest cosine similarity
    cosine_similarity_array = []
    for input_paper_id in paper_id_list:
        cosine_similarity = get_cosine_similarity_paper_with_set(query_paper_id, [input_paper_id])
        cosine_similarity_array.append(cosine_similarity)
    cosine_similarity_col = cosine_similarity_array

    # Clip and rescale insight scores to 0-1 via thresholding followed by min-max scaling
    author_threshold = 3
    keyword_threshold = 3
    # cosine_threshold = 0.5

    # Author score scaling
    author_intersection_col = [min(i, author_threshold) for i in author_intersection_col]
    author_intersection_col = [i/author_threshold for i in author_intersection_col]

    # Keyword score scaling
    keyword_intersection_col = [min(i, keyword_threshold) for i in keyword_intersection_col]
    keyword_intersection_col = [i/keyword_threshold for i in keyword_intersection_col]

    # Cosine similarity score scaling
    # cosine_similarity_col = [min(i, cosine_threshold) for i in cosine_similarity_col]
    # cosine_similarity_col = [i/cosine_threshold for i in cosine_similarity_col]


    # for each Paper_ID in paper_id_list, get_info_from_id(Paper_ID) and create new columns for each insight
    # return dataframe with all columns
    insights_df = [get_info_from_id(i) for i in paper_id_list]
    insights_df = pd.DataFrame(insights_df)
    insights_df["Author_Score"] = author_intersection_col
    insights_df["Keyword_Score"] = keyword_intersection_col
    insights_df["Abstract_Score"] = cosine_similarity_col

    # Convert dataframe to JSON
    insights_json = insights_df.to_json(orient="records")
    return insights_json


def get_session_data_helper(session_id):
    if session_id in session_data_dict:
        return session_data_dict[session_id]
    else:
        return "FAIL"


def set_session_data_helper(session_id, data):
    session_data_dict[session_id] = data
    return "SUCCESS"



if __name__ == "__main__":
    # ah = authors_helper()
    # print(ah)
    import json
    iins = insights_helper([1372243, 346340], 235178)
    iins_df = pd.DataFrame.from_records(json.loads(iins))
    # (iins_df['Authors'][1] + iins_df['Authors'][0])
    print(iins)

    print("DONE")
