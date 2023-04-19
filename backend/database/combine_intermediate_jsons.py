import json
import os
import pandas as pd


# combine all json files in mapped_intermediate_folder into one json file
def get_cosine_similarity_matrix(intermediate_folder_path ="./mapped_intermediate_folder", as_df=False):
    csm_dict = {}
    # print working directory
    print(f"Working directory: {os.getcwd()}")
    for filename in os.listdir(intermediate_folder_path):
        if filename.endswith(".json"):
            with open(f"{intermediate_folder_path}/{filename}", "r") as f:
                csm_dict.update(json.load(f))
    if as_df:
        records = []
        for i, j in csm_dict.items():
            records.append(
                {
                    "Paper_ID_1": int(float(i.split("--")[0])),
                    "Paper_ID_2": int(float(i.split("--")[1])),
                    "Cosine_Similarity": j
                }
            )
            records.append(
                {
                    "Paper_ID_1": int(float(i.split("--")[1])),
                    "Paper_ID_2": int(float(i.split("--")[0])),
                    "Cosine_Similarity": j
                }
            )
            # records.append(
            #     {
            #         "Paper_ID_1": int(float(i.split("--")[1])),
            #         "Paper_ID_2": int(float(i.split("--")[1])),
            #         "Cosine_Similarity": j
            #     }
            # )
        cs_df = pd.DataFrame.from_records(records)
        return cs_df
    return csm_dict
# with open("cosine_similarity_matrix.json", "w") as f:
#     json.dump(csm_dict, f)
