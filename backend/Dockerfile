# syntax=docker/dockerfile:1
FROM python:3.9-slim-buster
COPY ./ /
ENV PYTHONPATH /
WORKDIR /
RUN pip3 install -r requirements.txt
CMD ["python3", "-u", "./app.py"]
