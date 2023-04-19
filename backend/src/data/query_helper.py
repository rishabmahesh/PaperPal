import pandas as pd
import numpy as np
import json


author = pd.read_csv("./database/BiblioVIS/CSV_Author.csv")
paper = pd.read_csv("./database/BiblioVIS/CSV_Paper.csv")
author_paper = pd.read_csv("./database/BiblioVIS/CSV_Author_Paper.csv")
author_paper_affiliation = pd.read_csv("./database/BiblioVIS/CSV_Paper_Author_Affiliation.csv")


def get_info_from_id(paper_id):
    authors = paper[paper["Paper_ID"] == int(paper_id)].merge(author_paper, on="Paper_ID").merge(author, on="Author_ID")['Name'].values
    response_payload = json.loads(paper[paper['Paper_ID'] == int(paper_id)].to_json(orient='records'))[0]
    response_payload['Authors'] = authors.tolist()
    return response_payload


def get_title_from_id(paper_id):
    return paper[paper["Paper_ID"] == int(paper_id)]['Title']



def get_all_abstracts():
    return paper[['Paper_ID', 'Abstract']]

if __name__ == "__main__":
    resp = get_info_from_id(146361)
    print(resp)
