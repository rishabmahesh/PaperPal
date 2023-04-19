# OPENAI_API_KEY = "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", "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"

# Import the OpenAI library
import openai
import os
from sklearn.metrics.pairwise import cosine_similarity

# Load your API key from an environment variable or a file
openai.api_key = os.getenv("OPENAI_API_KEY")


# Define a function to compute the similarity score between two papers
def similarity_score(paper1, paper2):
  # Extract the abstracts from the papers
  abstract1 = paper1["abstract"]
  abstract2 = paper2["abstract"]

  # Use the semantic similarity engine to compare the abstracts
  response = openai.Engine("text-embedding-ada-002").search(
    documents=[abstract1, abstract2],
    query=abstract1,
    return_metadata=False
  )

  # The similarity score is the score of the second document in the response
  score = response["data"][1]["score"]

  # Return the score
  return score


def get_embedding(text, model="text-embedding-ada-002"):
  text = text.replace("\n", " ")
  return openai.Embedding.create(input=[text], model=model)['data'][0]['embedding']


# df['ada_embedding'] = df.combined.apply(lambda x: get_embedding(x, model='text-embedding-ada-002'))


# Example papers
paper1 = {
  "title": "Attention Is All You Need",
  "abstract": "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data."
}

paper2 = {
  "title": "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
  "abstract": "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers. As a result, the pre-trained BERT model can be fine-tuned with just one additional output layer to create state-of-the-art models for a wide range of tasks, such as question answering and natural language inference, without substantial task-specific architecture modifications. BERT is conceptually simple and empirically powerful. It obtains new state-of-the-art results on eleven natural language processing tasks, including pushing the GLUE score to 80.5% (7.7% point absolute improvement), MultiNLI accuracy to 86.7% (4.6% absolute improvement), SQuAD v1.1 question answering Test F1 to 93.2 (1.5 point absolute improvement) and SQuAD v2.0 Test F1 to 83.1 (5.1 point absolute improvement)."
}

# Compute and print the similarity score
# score = similarity_score(paper1, paper2)
embed1 = get_embedding(paper1["abstract"])
embed2 = get_embedding(paper2["abstract"])

print(f"The similarity score between paper1 and paper2 is {score:.3f}")