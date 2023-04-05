import os
import json
from flask import Blueprint, request, send_file, jsonify, current_app
from src.api.helpers import title_helper, info_helper, recommendations_helper, home_helper
from src.utils.constants import get_logger

import time
logger = get_logger()

api = Blueprint(name="PaperPal_api2", import_name=__name__, template_folder='templates')
errors = Blueprint('errors', __name__)
logger.debug(f"API Root path:{api.root_path}")

print(f"PWD: {os.getcwd()}")


@api.route("/title/<action>", methods=["GET"])
def get_title(action):
    logger.info("Entered /title")
    if request.method != "GET":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    return json.dumps(title_helper(json_data, action))


@api.route("/", methods=["GET"])
def home():
    logger.info("Entered /")
    if request.method != "GET":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    return json.dumps(home_helper())


@api.route("/info", methods=["GET"])
def get_info():
    logger.info("Entered /info")
    if request.method != "GET":
        return "INVALID METHOD", 405
    json_data = request.get_json()
    return json.dumps(info_helper(json_data))


@api.route("/recommendations", methods=["GET"])
def recommendations():
    logger.info("Entered /reommendations")
    if request.method != "GET":
        return "INVALID METHOD", 405
    json_data = request.get_json()

    return json.dumps(recommendations_helper(json_data))


@errors.app_errorhandler(Exception)
def handle_error(error, messg, api_name):
    print("Inside handle error")
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
