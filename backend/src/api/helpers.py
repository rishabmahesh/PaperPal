import time
from src.utils.constants import FAIL_TITLE, FAIL_INFO, FAIL_RECOS


def title_helper(inp_json, action):
    return f"{FAIL_TITLE} + {action}"


def info_helper(inp_json):
    return FAIL_INFO


def recommendations_helper(inp_json):
    return FAIL_RECOS


def home_helper():
    return f"You've reached HOME at {time.time()}!"


if __name__ == "__main__":
    pass
