import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics.pairwise import cosine_similarity
import psycopg2
import sys
import json

data = json.loads(sys.argv[1])
print(data['id'])

conn = psycopg2.connect(
    host="localhost",
    database="major_project_db",
    user="postgres",
    password="root"
)

cur1 = conn.cursor()
cur2 = conn.cursor()
cur1.execute("SELECT * FROM user_ratings")
cur2.execute("SELECT * from courses_data order by course_id asc")
rows1 = cur1.fetchall()
rows2 = cur2.fetchall()
cur1.close()
cur2.close()
conn.close()

ratings_df = pd.DataFrame(rows1, columns=['user_id', 'course_id', 'ratings'])
courses_df = pd.DataFrame(rows2, columns=['course_id', 'course_name', 'course_description', 'course_category', 'course_instructor',
                          'course_price', 'course_start_date', 'course_end_date', 'course_duration'])  # replace with column names
merged_df = pd.merge(courses_df, ratings_df, on='course_id')

user_item_matrix = merged_df.pivot_table(
    index='user_id', columns='course_id', values='ratings')


user_item_matrix.fillna(0, inplace=True)


cosine_sim_matrix = cosine_similarity(user_item_matrix)
cosine_sim_df = pd.DataFrame(
    cosine_sim_matrix, index=user_item_matrix.index, columns=user_item_matrix.index)
model_knn = NearestNeighbors(metric='cosine', algorithm='brute')
model_knn.fit(user_item_matrix)


def recommend_courses(user_id, num_recommendations, k):

    distances, indices = model_knn.kneighbors(
        user_item_matrix.loc[user_id].values.reshape(1, -1), n_neighbors=k+1)
    knn_indices = indices.flatten()[1:]
    knn_ratings = user_item_matrix.loc[knn_indices]
    knn_ratings = knn_ratings[knn_ratings > 3].dropna(how='all')
    course_avg_ratings = knn_ratings.mean(axis=0)
    top_courses = course_avg_ratings.sort_values(
        ascending=False)[:num_recommendations]
    recommended_course_ids = top_courses.index.tolist()
    recommended_courses = courses_df[courses_df['course_id'].isin(
        recommended_course_ids)]
    return recommended_courses


recommended_courses = recommend_courses(data['id'], 8, 2)

outputData = json.loads(recommended_courses.course_id.to_json())
values = list(outputData.values())
print(values)
