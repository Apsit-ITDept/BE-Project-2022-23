from sklearn.preprocessing import LabelEncoder
import pandas as pd
import pickle
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import sys,fitz


def cleaned_resume(clean, file_name):
    for i in range(file_name.shape[0]):
        review = re.sub(
            '(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?"',
            " ",
            file_name["Resume"].iloc[i],
        )
        review = review.lower()
        review = review.split()
        lm = WordNetLemmatizer()
        review = [
            lm.lemmatize(word)
            for word in review
            if not word in set(stopwords.words("english"))
        ]
        review = " ".join(review)
        clean.append(review)


def jobRole(usr_resume):
    resumeDataSet_Filtered = pd.read_csv("./For_Testing/ML_1/FilteredResumeDataSet.csv" ,encoding="utf-8")
    var_mod = ["Category"]
    le = LabelEncoder()
    for i in var_mod:
        resumeDataSet_Filtered[i] = le.fit_transform(resumeDataSet_Filtered[i])

        #Loading Model
    with open("./For_Testing/ML_1/knn.pkl","rb") as f:
        clf2 = pickle.load(f)
    with open("./For_Testing/ML_1/word_vectorizer.pkl","rb") as f:
        word_vectorizer = pickle.load(f)

    data = [['General',usr_resume]]
    usr_df = pd.DataFrame(data,columns=['Category','Resume'])

    clean = []

    cleaned_resume(clean, usr_df)
    usr_df['cleaned_resume'] = ''
    usr_df["cleaned_resume"] = clean

    test_text = usr_df['cleaned_resume'].values
    WordFeatures = word_vectorizer.transform(test_text)
    X_test2=WordFeatures
    y_pred2 = clf2.predict(X_test2)
    prediction= le.inverse_transform(y_pred2)
    # print(prediction[0])
    return prediction[0]


# fname = './PDF/Omkar.pdf'
# doc = fitz.open(fname)

# usr_resume = " "
# for page in doc:
#     usr_resume = usr_resume + str(page.get_text())

# jobRole(usr_resume)
