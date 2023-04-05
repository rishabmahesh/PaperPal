import logging, sys


def get_logger():
    _logger = logging.getLogger(__name__)
    # create file handler that logs debug and higher level messages
    if not getattr(_logger, 'handler_set', None):
        fh = logging.FileHandler('paperpal.log')
        fh.setLevel(logging.DEBUG)
        f_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        fh.setFormatter(f_formatter)
        # _logger.addHandler(fh)
        # create console handler with a higher log level
        ch = logging.StreamHandler(sys.stdout)
        ch.setLevel(logging.DEBUG)
        # create formatter and add it to the handlers
        c_formatter = logging.Formatter(
            '[%(filename)20s] [%(funcName)20s()] [%(lineno)3d] [%(levelname)5s]: %(message)s')

        ch.setFormatter(c_formatter)

        # add the handlers to logger
        # _logger.addHandler(ch)
        _logger.handlers = [ch, fh]

        _logger.setLevel(logging.DEBUG)
        _logger.handler_set = True
        _logger.propagate = False
    return _logger


logger = get_logger()
DEFAULT_VALUE1 = "DV1"

FAIL_TITLE = "DEFAULT TITLE"


def title_maker(x, y=2023):
    return {
        "title": f"INFO - DEFAULT TITLE {x}",
        "authors": ["Author 1", "Author 2", "Author 3"],
        "year": y,
        "more_metadata": "TBA"
}


def reco_maker(x, y=2023):
    return {
        "title": f"RECO - DEFAULT TITLE {x}",
        "authors": ["Author 1", "Author 2", "Author 3"],
        "year": y,
        "more_metadata": "TBA"
}


FAIL_INFO = [title_maker(i, 2023-i) for i in range(10)]

FAIL_RECOS = [reco_maker(i, 2023-i) for i in range(10)]

