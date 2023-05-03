# -*- coding: utf-8 -*-

from sklearn.neighbors import NearestNeighbors
import numpy as np
import pandas as pd
import psycopg2


# establish connection to the database
conn = psycopg2.connect(
    host="localhost",
    database="major_project_db",
    user="postgres",
    password="root"
)

# create a cursor object
cur1 = conn.cursor()
# create a cursor object
cur2 = conn.cursor()

# execute the SQL query
cur1.execute("SELECT * FROM user_categories")

# execute the SQL query
cur2.execute("select * from courses_data order by course_id asc")

# fetch all the rows as a list of tuples
rows1 = cur1.fetchall()
# fetch all the rows as a list of tuples
rows2 = cur2.fetchall()

# close the cursor and database connection
cur1.close()
cur2.close()
conn.close()

# convert the list of tuples to a Pandas DataFrame
course_categories = pd.DataFrame(rows1, columns=['user_id', '2D Animation', '3D Animation', 'Character Animation', '3d Modelling', 'Concept Art', 'Digital Painting', 'Drawing', 'Illustration', 'Rendering', 'Comic Book Illustration', 'Brand Design', 'Product Design', 'Creativity', 'Digital Publishing', 'Fashion Design', 'Logo Design', 'Banner Design', 'Poster Design', 'Typography', 'Visual Effects', '3D', 'Composing', 'Keying', 'Motion Graphics', 'Oil Painting', 'Acrylic Painting', 'Procreate Art', 'Sketching', 'Pencil Art', 'Photography', 'Digital Photography',
                                 'Photography Mobile', 'Potrait Photography', 'Macro Photography', 'Commercial Photography', 'Architectural Photography', 'Landscape Photography', 'Photoshop', 'Blender', 'Level Design', 'Unreal Engine', 'Unity', 'Digital Game Art', 'Pixel Art', 'Game Development', 'Premier Pro', 'Illustrator', 'After Effects', 'AutoCad', 'Sketch', 'Lightroom', 'Autodesk', 'Procreate', 'Maya', 'Film-Making', 'Cinematography', 'Video Editing', 'Mobile Video Editing', 'Video/ film Production', 'Video Audio', 'Video Gears'])  # replace with column names


# convert the list of tuples to a Pandas DataFrame
courses_df = pd.DataFrame(rows2, columns=['course_id', 'course_name', 'course_description', 'course_category', 'course_instructor',
                          'course_price', 'course_start_date', 'course_end_date', 'course_duration'])  # replace with column names


# print(updated_course_ratings.values)


class CourseRecommender:
    def __init__(self, k=5, sim_metric='cosine', algo='user'):
        """
        k: number of neighbors to consider
        sim_metric: similarity metric to use ('cosine' or 'pearson')
        algo: collaborative filtering algorithm to use ('user' or 'item')
        """
        self.k = k
        self.sim_metric = sim_metric
        self.algo = algo

    def fit(self, X):
        """
        X: user-course rating matrix
        """
        self.X = X

        if self.algo == 'user':
            self.model = NearestNeighbors(
                metric=self.sim_metric, algorithm='brute')
            self.model.fit(self.X)
        elif self.algo == 'item':
            self.model = NearestNeighbors(
                metric=self.sim_metric, algorithm='brute')
            self.model.fit(self.X.T)

    def predict(self, user_idx):
        """
        user_idx: index of the user for whom to generate recommendations
        """
        if self.algo == 'user':
            # Find the k most similar users to the current user
            distances, indices = self.model.kneighbors(
                self.X[user_idx].reshape(1, -1), n_neighbors=self.k+1)
            similar_users = indices.squeeze()[1:]

            # Generate recommendations based on courses taken by similar users
            course_ratings = self.X[similar_users].mean(axis=0)
            course_ratings[np.isnan(course_ratings)] = 0
            course_indices = np.argsort(course_ratings)[::-1]
            recommended_courses = course_indices[:self.k]
        elif self.algo == 'item':
            # Find the courses most similar to the courses taken by the current user
            user_courses = np.where(self.X[user_idx] > 0)[0]
            distances, indices = self.model.kneighbors(
                self.X.T[user_courses], n_neighbors=self.k+1)
            similar_courses = indices.squeeze()[1:]

            # Generate recommendations based on similar courses
            course_ratings = np.zeros(self.X.shape[1])
            for course in similar_courses:
                course_ratings[course] = np.sum(
                    self.X[:, course] * distances[:, course])
            course_ratings[np.isnan(course_ratings)] = 0
            course_indices = np.argsort(course_ratings)[::-1]
            recommended_courses = course_indices[:self.k]

        return recommended_courses


X = np.array(course_categories.values)

recommender = CourseRecommender(k=6, sim_metric='cosine', algo='user')
recommender.fit(X)
recommended_courses = recommender.predict(0)

print(recommended_courses)
