import os
import json
from flask import Blueprint, request, send_file, jsonify, current_app
from src.api.helpers import title_helper, info_helper, recommendations_helper, home_helper, info_helper_single, authors_helper, insights_helper
from src.utils.constants import get_logger

import time
logger = get_logger()

api = Blueprint(name="PaperPal", import_name=__name__, template_folder='templates')
errors = Blueprint('errors', __name__)
logger.debug(f"API Root path:{api.root_path}")

print(f"PWD: {os.getcwd()}")


@api.route("/title/<action>", methods=["GET"])
def get_title(action):
    logger.info("Entered /title")
    if request.method != "GET":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    try:
        return json.dumps(title_helper(json_data, action).to_list())
    except IndexError as e:
        return handle_error(1, "Could not find paper in database", "paperpal")
    except ValueError as e:
        return handle_error(11, "Invalid Paper_ID - make sure it is an int", "paperpal")


@api.route("/", methods=["GET"])
def home():
    logger.info("Entered /")
    if request.method != "GET":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    return json.dumps(home_helper())


@api.route("/authors", methods=["GET"])
def get_authors():
    logger.info("Entered /authors")
    if request.method != "GET":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    try:
        resp = json.dumps(authors_helper())
    except IndexError as e:
        return handle_error(2, "Could not find paper in database", "paperpal")
    except ValueError as e:
        return handle_error(21, "Invalid Paper_ID - make sure it is an int", "paperpal")
    return resp


@api.route("/info", methods=["POST"])
def get_info():
    logger.info("Entered /info")
    if request.method != "POST":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    try:
        resp = json.dumps(info_helper(json_data))
    except IndexError as e:
        return handle_error(2, "Could not find paper in database", "paperpal")
    except ValueError as e:
        return handle_error(21, "Invalid Paper_ID - make sure it is an int", "paperpal")
    return resp


@api.route("/info/<paper_id>", methods=["GET"])
def get_info_single(paper_id):
    logger.info("Entered /info")
    if request.method != "GET":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    try:
        resp = json.dumps(info_helper_single(paper_id))
    except IndexError as e:
        return handle_error(3, "Could not find paper in database", "paperpal")
    except ValueError as e:
        return handle_error(31, "Invalid Paper_ID - make sure it is an int", "paperpal")
    return resp


@api.route("/recommendations", methods=["POST"])
def recommendations():
    logger.info("Entered /recommendations")
    if request.method != "POST":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    try:
        paper_list = json_data["my_list"]
    except KeyError as e:
        return handle_error(4, "Could not find 'my_list' parameter in payload", "paperpal")
    try:
        resp = json.dumps(recommendations_helper(paper_list))
    except (ValueError, IndexError, TypeError) as e:
        return handle_error(5, "could not prepare json response", "paperpal")
    except KeyError as e:
        return handle_error(6, "Invalid Paper ID in list", "paperpal")
    return resp


@api.route("/recommendations/v2", methods=["POST"])
def recommendations_v2():
    logger.info("Entered /recommendations/v2/")
    if request.method != "POST":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    try:
        paper_list = json_data["my_list"]
    except KeyError as e:
        return handle_error(4, "Could not find 'my_list' parameter in payload", "paperpal")
    try:
        resp = json.dumps(recommendations_helper(paper_list, v2=True))
    except (ValueError, IndexError, TypeError) as e:
        return handle_error(5, "could not prepare json response", "paperpal")
    except KeyError as e:
        return handle_error(6, f"Invalid Paper ID in list {e}", "paperpal")
    return resp


@api.route("/insights", methods=["POST"])
def insights():
    logger.info("Entered /insights")
    if request.method != "POST":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    try:
        paper_list = json_data["my_list"]
        query_paper = json_data["query_paper"]
    except KeyError as e:
        return handle_error(4, "Could not find 'my_list' parameter in payload", "paperpal")
    try:
        resp = insights_helper(paper_list, query_paper)
    except (ValueError, IndexError, TypeError) as e:
        return handle_error(5, f"could not prepare json response: {e}", "paperpal")
    except KeyError as e:
        return handle_error(6, "Invalid Paper ID in list", "paperpal")
    return resp



@errors.app_errorhandler(Exception)
def handle_error(error, messg, api_name):
    logger.debug("Inside handle error")
    if not (type(error) == int):
        message = [str(x) for x in error.args]
        status_code = error.status_code

    else:
        status_code = error
        message = messg  # "Exception! Some parameters are not found!"

    success = False
    response = {
        'success': success,
        'api': api_name,
        'error': {
            'type': error.__class__.__name__,
            'message': message
        }
    }

    return jsonify(response), status_code
