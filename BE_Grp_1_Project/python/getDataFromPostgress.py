import psycopg2
import pandas as pd

# establish connection to the database
conn = psycopg2.connect(
    host="localhost",
    database="major_project_db",
    user="postgres",
    password="root"
)

# create a cursor object
cur = conn.cursor()

# execute the SQL query
cur.execute("SELECT * FROM user_ratings")

# fetch all the rows as a list of tuples
rows = cur.fetchall()

# close the cursor and database connection
cur.close()
conn.close()

# convert the list of tuples to a Pandas DataFrame
df = pd.DataFrame(rows, columns=['user_id', 'course_id', 'ratings']) # replace with column names

# display the DataFrame
print(df)
