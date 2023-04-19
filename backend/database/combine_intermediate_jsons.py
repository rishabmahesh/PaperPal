import json
import os
import tempfile
import zipfile

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

def get_csm_matrix_from_zip(zip_file_path):
    # unzip the zip file into a temp folder - it contains only one csv file
    with tempfile.TemporaryDirectory() as temp_dir:
        with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        # read the csv file into a dataframe
        _csm_df = pd.read_csv(os.path.join(temp_dir, os.listdir(temp_dir)[0]))
        _csm_df = _csm_df.set_index(['Paper_ID_1'])
    return _csm_df


if __name__ == "__main__":
    csm_df = get_cosine_similarity_matrix(as_df=True)
    csm_df.to_csv("./cosine_similarity_matrix.csv", index=False)
    csm_df2 = pd.read_csv("./cosine_similarity_matrix.csv")
    print("DONE")
    # with open("cosine_similarity_matrix.csv", "w") as f:
    #     json.dump(csm_dict, f)
