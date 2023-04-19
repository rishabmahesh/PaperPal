import time
from src.utils.constants import FAIL_RECOS
from src.data.query_helper import get_info_from_id, get_title_from_id, get_all_authors, get_recommendations


def title_helper(inp_json, action):
    return get_title_from_id(action)


def info_helper(inp_json):
    return [get_info_from_id(i) for i in inp_json]


def info_helper_single(paper_id):
    return get_info_from_id(paper_id)


def recommendations_helper(inp_json):
    return get_recommendations(inp_json, 5)


def authors_helper():
    return get_all_authors()["Name"].values

def home_helper():
    return f"You've reached HOME at {time.time()}!"


if __name__ == "__main__":
    ah = authors_helper()
    print(ah)
    print("DONE")
