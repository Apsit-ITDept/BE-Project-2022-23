import psycopg2

# Establish a connection to the database
conn = psycopg2.connect(
    host="localhost",
    database="major_project_db",
    user="postgres",
    password="root"
)

# Create a cursor object to interact with the database
cur = conn.cursor()

# Define the data to be inserted into the row
data = {
   "fname": "Test1",
    "lname": "Test1",
    "email": "test1@test1.com",
    "password": "TestPassword",
}

# Define the SQL query to insert the data into the table
query = "insert into users(email,fname,lname,password) values(%(email)s, %(fname)s, %(lname)s, %(password)s )"

# Execute the query and pass in the data dictionary as a parameter
cur.execute(query, data)

# Commit the changes to the database
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()
