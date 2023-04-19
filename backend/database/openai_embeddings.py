import openai
import pandas as pd
import pickle

# load cache dict from pickle if file exists
try:
    with open('cache.pkl', 'rb') as f:
        cache = pickle.load(f)
except FileNotFoundError:
    cache = {}


def get_embedding(text, model="text-embedding-ada-002"):
    text = text.replace("\n", " ")
    return openai.Embedding.create(input=[text], model=model)['data'][0]['embedding']


# write a function that takes in a list of papers and returns a list of embeddings
def get_embeddings(abstracts):
    embeddings = []
    for abstract in abstracts:
        embeddings.append(get_embedding(abstract))
        # print(abstract)
        # print(type)
        # embeddings.append("sample")
    return embeddings


# write a function that takes in a csv file path as input and accesses the abstract column and maps it to a list of embeddings
def get_embeddings_from_csv(csv_path):
    # read in the csv file
    df = pd.read_csv(csv_path)
    df.dropna(subset=['Abstract'], inplace=True)

    # get the abstract column
    abstracts = df["Abstract"]

    # get the embeddings
    embeddings = get_embeddings(abstracts)
    df['Abstract_Embeddings'] = embeddings

    return df

# write a funciton that calls get_embeddings_from_csv creates a new csv file with the embeddings and uses paperID as the index
def create_embeddings_csv(csv_path):
    # get the embeddings
    embeddings_df = get_embeddings_from_csv(csv_path)

    # create a new column with the embeddings
    df = embeddings_df[["Paper_ID", "Abstract_Embeddings"]]

    # write the dataframe to a csv file
    df.to_csv("./Abstract_Embeddings.csv")


if __name__ == "__main__":
    create_embeddings_csv("./BiblioVIS/CSV_Paper.csv")