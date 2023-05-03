from flask import Flask, request, jsonify
import logging
# uncomment import if CORS is required
from flask_cors import CORS
from waitress import serve
import os, sys, inspect

# load modules
from src.utils.constants import get_logger, DEFAULT_VALUE1
from src.api.routes import api


logger = get_logger()
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

# init Flask app

# uncomment code below to allow CORS
# cors = CORS(app, resources={r"/*": {"origins": "*"}})


# uncomment code to only log errors
# init_logging(log_dir="logs", level=logging.ERROR)
logger.info("BP Register:")
logger.debug(f"[{__name__}]: CWD = {currentdir}")


def create_app():
    _app = Flask(__name__)
    print(f"ENV VARIABLES: {os.environ}")
    # Uncomment code below for v1
    _app.config['DEFAULT_VALUE1'] = DEFAULT_VALUE1
    _app.config["VARIABLE2"] = os.environ.get("VARIABLE2")
    _app.register_blueprint(api, url_prefix="/")
    return _app


GET = "GET"
POST = "POST"
PUT = "PUT"
DELETE = "DELETE"


def main():
    print("Main:app.py")
    app = create_app()
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config['CORS_HEADERS'] = 'Content-Type'
    # app.run(host='127.0.0.1',port=6060, threaded=True)
    # uncomment code below to run flask with debugger
    if os.environ.get('TESTING') == "1":
        app.run(host='0.0.0.0', port=8080, debug=True)  # Flask for debugging
    else:
        serve(app, port=8080)


if __name__ == "__main__":
    main()
