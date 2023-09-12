# PaperPal

PaperPal is a research paper recommendation tool which recommends you research papers based on saved papers. 

## Frontend

We built a chrome extension which can add research papers to folders, delete papers, view some limited details about the paper (like Author name, title, and publication year). If we click on the PaperPal icon from the extension, it opens a new window to the website. The website is an expanded view which has a similar look as the extension but with many more features like: -

1. Generating recommendations based on saved papers
2. Expand each paper to view things like Title, Authors, Keywords, Abstract, No. of references, and No. of citations
3. Multiple filtering capabilities like Search, hide / show certain columns, change column width, and shift columns
4. Sorting papers based on ascending order, and descending order
5. Insights button which gives us more information on why a particular paper was recommended

## Backend

The backend was built in Python. We used BERT and OpenAI embeddings to generate recommendations

## Youtube Video

This project was made as part of CS 625: Advance HCI. You can checkout the YouTube video with a demo here: https://www.youtube.com/watch?v=o-lv_oNOpko
