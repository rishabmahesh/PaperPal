import pandas as pd
import numpy as np
import json
import threading
from sklearn.metrics.pairwise import cosine_similarity
embeddings_df = pd.read_csv("./BiblioVIS/Abstract_Embeddings.csv")

# iterate over all Paper_IDs and create a triangular matrix of embeddings
# for each Paper_ID, get the embedding and compare it to all other embeddings
# store the cosine similarity in a matrix
# make it efficient so that we don't have to compare the same pair twice
# for example, if we compare Paper_ID 1 to Paper_ID 2, we don't need to compare Paper_ID 2 to Paper_ID 1
# we can use a dictionary to store the values
# the key will be a tuple of the Paper_IDs where the first element is always smaller than the second element
# csm_dict = {}


def generate_csm_json(it, _embeddings_df):
    csm_dict = {}
    for j in range(it+1, len(embeddings_df)):
        # print(embeddings_df["Paper_ID"][i], embeddings_df["Paper_ID"][j])
        smaller = min(embeddings_df["Paper_ID"][it], embeddings_df["Paper_ID"][j])
        larger = max(embeddings_df["Paper_ID"][it], embeddings_df["Paper_ID"][j])
        csm_dict[f"{smaller}--{larger}"] = cosine_similarity(
            np.array([json.loads(embeddings_df["Abstract_Embeddings"][it])]),
            np.array([json.loads(embeddings_df["Abstract_Embeddings"][j])])
        )[0][0]
    with open(f'./mapped_intermediate_folder/csm_{it}.pkl', 'w') as f:
        json.dump(csm_dict, f)

thread_list = []
for i in range(len(embeddings_df)):
    # print status of loop as a percentage of total iterations
    # print(f"{i/len(embeddings_df)*100:.2f}%")
    thread_list.append(threading.Thread(target=generate_csm_json, args=(i, embeddings_df)))
for t in range(0, len(thread_list), 4):
    print(f"{t/len(thread_list)*100:.2f}%")
    thread_list[t].start()
    thread_list[t+1].start()
    thread_list[t+2].start()
    thread_list[t+3].start()
    thread_list[t].join()
    thread_list[t+1].join()
    thread_list[t+2].join()
    thread_list[t+3].join()
# for t in range(len(thread_list)):
#     print(f"{i/len(thread_list)*100:.2f}%")
#     t.join()

    # for j in range(i+1, len(embeddings_df)):
    #     # print(embeddings_df["Paper_ID"][i], embeddings_df["Paper_ID"][j])
    #     smaller = min(embeddings_df["Paper_ID"][i], embeddings_df["Paper_ID"][j])
    #     larger = max(embeddings_df["Paper_ID"][i], embeddings_df["Paper_ID"][j])
    #     csm_dict[(smaller, larger)] = cosine_similarity(
    #         np.array([json.loads(embeddings_df["Abstract_Embeddings"][i])]),
    #         np.array([json.loads(embeddings_df["Abstract_Embeddings"][j])])
    #     )[0][0]
# with open('csm.pkl', 'w') as f:
#     json.dump(csm_dict, f)

