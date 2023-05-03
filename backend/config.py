from dotenv import load_dotenv
import os
# import redis

load_dotenv()


class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]


    #  mysql configuration
    MYSQL_HOST = os.environ["MYSQL_HOST"]
    MYSQL_USER = os.environ["MYSQL_USER"]
    MYSQL_PASSWORD = os.environ["MYSQL_PASSWORD"]
    MYSQL_DB = os.environ["MYSQL_DB"]

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    # SQLALCHEMY_DATABASE_URI = fr"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"