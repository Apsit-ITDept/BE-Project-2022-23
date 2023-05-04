from nltk.corpus import stopwords
import re
import string
from nltk.stem import WordNetLemmatizer
from nltk import word_tokenize
from nltk.corpus import stopwords
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
stop = stopwords.words('english')
stop_words_ = set(stopwords.words('english'))

wn = WordNetLemmatizer()


def black_txt(token):
    if token == 'c++':
        return False
    return token not in stop_words_ and token not in list(string.punctuation) and len(token) > 2 and token != 'c++'


def clean_txt(text):
    clean_text = []
    clean_text2 = []
    text = re.sub("'", "", text)
    text = re.sub("(\\d|\\W)+", " ", text)
    text = text.replace("nbsp", "")
    clean_text = [wn.lemmatize(word, pos="v") for word in word_tokenize(
        text.lower()) if black_txt(word)]
    clean_text2 = [word for word in clean_text if black_txt(word)]
    return " ".join(clean_text2)


def get_recommendation(top, df_R, scores):
    recommendation = pd.DataFrame(columns=['Job Id', 'Company Name', 'score'])
    count = 0
    for i in top:
        recommendation.at[count, 'Job Id'] = df_R['Job Id'][i]
        recommendation.at[count, 'Company Name'] = df_R['Company Name'][i]
        recommendation.at[count, 'score'] = scores[count]*100
        count += 1
    return recommendation


def job_recommend(data_recruiter, data_candidate):
    data_Recruiter = pd.DataFrame(data_recruiter)
    matched_jobs = pd.DataFrame()
    for index, row in data_Recruiter.iterrows():
        if data_candidate['Engineering'] >= row['Engineering'] and data_candidate['10th'] >= row['10th'] and data_candidate['12th'] >= row['12th']:
            matched_jobs = pd.concat(
                [matched_jobs, pd.DataFrame(row).T], ignore_index=True)
    # print(matched_jobs)
    matched_jobs['text'] = matched_jobs['Position'].map(
        str) + " " + matched_jobs['Skills']
    df_R = matched_jobs[['Job Id','Company Name', 'text']]
    df_R = df_R.fillna(" ")
    df_R['text'] = df_R['text'].apply(clean_txt)

    print(df_R) 

    tfidf_vectorizer = TfidfVectorizer()

    tfidf_jobid = tfidf_vectorizer.fit_transform((df_R['text']))
    print(tfidf_jobid)

    data_candidate = pd.DataFrame.from_dict(data_candidate)
    data_candidate["text"] = data_candidate['Position'].map(
        str) + " " + data_candidate['Skills']
    df_C = data_candidate[['Name', 'text']]
    df_C = df_C.fillna(" ")

    user_tfidf = tfidf_vectorizer.transform(df_C['text'])
    cos_similarity_tfidf = map(
        lambda x: cosine_similarity(user_tfidf, x), tfidf_jobid)

    output2 = list(cos_similarity_tfidf)

    top = sorted(range(len(output2)),
                 key=lambda i: output2[i], reverse=True)[:10]
    list_scores = [output2[i][0][0] for i in top]
    recommendation = get_recommendation(top, df_R, list_scores)
    print(recommendation)
    # return recommendation.to_dict('records')
    joblist = [i['Job Id'] for i in recommendation.to_dict('records')]
    return joblist


def ranked_candidates(top, df_C, scores):
    ranked_candidates = pd.DataFrame(columns=['Candidate Id', 'Name', 'score'])
    count = 0
    for i in top:
        ranked_candidates.at[count, 'Candidate Id'] = df_C['Candidate Id'][i]
        ranked_candidates.at[count, 'Name'] = df_C['Name'][i]
        edu = (df_C['10th'][i]+df_C['12th'][i]+df_C['Engineering'][i])/3*0.30
        score = (scores[count]*100*0.70)+edu
        ranked_candidates.at[count, 'score'] = score
        count += 1
    return ranked_candidates


def candidate_recommend(one_Recruiter, data_Candidate):
    pd.options.mode.chained_assignment = None  # default='warn'
    data_Candidate = pd.DataFrame(data_Candidate)
    one_Recruiter = pd.DataFrame(one_Recruiter)
    print(data_Candidate)
    print("**********************************************************")

    matched_candidates = pd.DataFrame()
    for index, row in data_Candidate.iterrows():
        for index2, row2 in one_Recruiter.iterrows():
            if row['Engineering'] >= row2['Engineering'] and row['10th'] >= row2['10th'] and row['12th'] >= row2['12th']:
                matched_candidates = pd.concat(
                    [matched_candidates, pd.DataFrame(row).T], ignore_index=True)

    matched_candidates['text'] = matched_candidates['Position'].map(
        str) + " " + matched_candidates['Skills']

    # print(matched_candidates)
    df_C = matched_candidates[['Candidate Id', 'Name', 'text', '10th', '12th', 'Engineering']]
    df_C['text'] = df_C['text'].apply(clean_txt)
    df_C = df_C.fillna(" ")

    tfidf_vectorizer = TfidfVectorizer()

    tfidf_candidates = tfidf_vectorizer.fit_transform((df_C['text']))

    one_Recruiter['text'] = one_Recruiter['Position'].map(
        str) + " " + one_Recruiter['Skills']

    df_R = one_Recruiter[['Company Name', 'text']]
    df_R = df_R.fillna(" ")
    df_R['text'] = df_R['text'].apply(clean_txt)
    tfidf_recruiter = tfidf_vectorizer.transform(df_R['text'])
    cos_similarity_tfidf = map(lambda x: cosine_similarity(
        tfidf_recruiter, x), tfidf_candidates)
    output2 = list(cos_similarity_tfidf)

    top = sorted(range(len(output2)),
                 key=lambda i: output2[i], reverse=True)[:10]
    list_scores = [output2[i][0][0] for i in top]
    ranked_Candidates = ranked_candidates(top, df_C, list_scores)
    print(ranked_Candidates)
    print("**********************************************************")
    
    candidateList = [i['Candidate Id'] for i in ranked_Candidates.to_dict('records')]
    return candidateList

    # one_recruiter =
