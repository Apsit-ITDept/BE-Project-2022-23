from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()


def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    fullName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(345), unique=True)
    mobNo = db.Column(db.String(100), nullable=False)
    password = db.Column(db.Text, nullable=False)
    mark_x = db.Column(db.Integer, nullable=False)
    mark_xii = db.Column(db.Integer, nullable=False)
    mark_degree = db.Column(db.Integer, nullable=False)
    verification = db.Column(db.Boolean, default=False, nullable=False)


class Recruiter(db.Model):
    __tablename__ = "recruiter"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    orgName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(345), unique=True)
    mobNo = db.Column(db.String(100), nullable=False)
    password = db.Column(db.Text, nullable=False)
    verification = db.Column(db.Boolean, default=False, nullable=False)

class Jobs(db.Model):
    __tablename__ = "jobs"
    id = db.Column(db.Integer , primary_key=True)
    orgName = db.Column(db.String(100), nullable=False)
    jobTitle = db.Column(db.String(100), nullable=False)
    jobDescription = db.Column(db.String(400), nullable=False)
    mark_x = db.Column(db.Integer, nullable=False)
    mark_xii = db.Column(db.Integer, nullable=False)
    mark_degree = db.Column(db.Integer, nullable=False)
    skills = db.Column(db.String(400), nullable=False)
    endDate = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(345), unique=True)


class Upload(db.Model):
    __tablename__ = "uploadedFiles"
    id = db.Column(db.Integer , primary_key=True)
    email = db.Column(db.String(345), unique=False)
    filename = db.Column(db.String(100))
    data = db.Column(db.LargeBinary)
    score = db.Column(db.Float(5), nullable=False)
    date = db.Column(db.String(32), nullable=False)
    time = db.Column(db.String(32), nullable=False)

class AppliedJobs(db.Model):
    __tablename__ = "appliedJobs"
    id = db.Column(db.Integer , primary_key=True)
    email = db.Column(db.String(345), unique=False)
    fullName = db.Column(db.String(100), nullable=False)
    jobId = db.Column(db.Integer, nullable=False)
    skills = db.Column(db.String(400), nullable=False)
    filename = db.Column(db.String(100))
    data = db.Column(db.LargeBinary)
    status = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Float(5), nullable=False)
    position = db.Column(db.String(100), nullable=False)


class Test(db.Model):
    __tablename__ = "test"
    id = db.Column(db.Integer , primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
    jobTitle = db.Column(db.String(100), nullable=False)
    skills = db.Column(db.String(400), nullable=False)
    mark_x = db.Column(db.Integer, nullable=False)
    mark_xii = db.Column(db.Integer, nullable=False)
    mark_degree = db.Column(db.Integer, nullable=False)


class Survey(db.Model):
    __tablename__ = "Survey"
    id = db.Column(db.Integer , primary_key=True)
    email = db.Column(db.String(345), unique=False)
    feedback1 = db.Column(db.String(100), nullable=True)
    feedback2 = db.Column(db.String(100), nullable=True)
    feedback3 = db.Column(db.String(200), nullable=True)