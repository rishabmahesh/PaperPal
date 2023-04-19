import json
import os


# combine all json files in mapped_intermediate_folder into one json file
def get_cosine_similarity_matrix():
    csm_dict = {}
    for filename in os.listdir("./mapped_intermediate_folder"):
        if filename.endswith(".json"):
            with open(f"./mapped_intermediate_folder/{filename}", "r") as f:
                csm_dict.update(json.load(f))
    return csm_dict
# with open("cosine_similarity_matrix.json", "w") as f:
#     json.dump(csm_dict, f)
