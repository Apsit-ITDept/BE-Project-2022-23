from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import numpy as np

import string
import re
import nltk
# Decision Tree Classifier
from nltk.util import pr
stemmer = nltk.SnowballStemmer("english")
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
stopword = set(stopwords.words("english"))
df = pd.read_csv("twitter_data.csv")

df['labels'] = df['class'].map({0:"Hate Speech Detected", 1:"Offensive language detected", 2:"No Hate and offensive speech"})
df = df[['tweet', 'labels']]

def clean(text):
    text = str(text).lower()
    text = re.sub('\[.*?\]', '', text)
    text = re.sub('https?://\S+|www\.\S+', '', text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation),'', text)
    text = re.sub('\n', '', text)
    text = re.sub('\w*\d\w*', '', text)
    text = [word for word in text.split(' ') if word not in stopword]
    text=" ".join(text)
    text = [stemmer.stem(word) for word in text.split(' ')]
    text= " ".join(text)
    return text
df["tweet"] = df["tweet"].apply(clean)

x= np.array(df["tweet"])
y= np.array(df["labels"])

cv= CountVectorizer()
x= cv.fit_transform(x)
X_train, X_test, y_train, y_test = train_test_split(x,y,test_size= 0.33, random_state= 42)
clf= DecisionTreeClassifier()
clf.fit(X_train, y_train)



def isBadWords_NLP(message):
    df = cv.transform([message]).toarray()
    result= clf.predict(df)
    if result == 'No Hate and offensive speech':
        return False
    else:
        return True


def isBadWords_BagofWords(statement):
    res= False
    with open("badwords.txt") as f:
        contents= f.read().lower()
        badwords= contents.split(" ")
        # print(badwords)
        string= statement.split(" ")
        sentence= []
        for word in string:
            for bw in badwords:
                if word == bw:
                    res= True
    return res


app = Flask(__name__)
cors = CORS(app)

@app.route('/message', methods=['POST'])
def message():
    message = request.json['message']
    res= False
    res= isBadWords_BagofWords(message)
    if res==False:
        res= isBadWords_NLP(message)
    # Do something with the message
    response = {'status': 'success', 'message': res}
    return jsonify(response)




if __name__ == '__main__':
    app.run(debug=True)