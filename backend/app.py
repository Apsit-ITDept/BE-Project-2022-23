from config import ApplicationConfig
from datetime import datetime
import emailOTP
import fitz
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from Recommendation import job_recommend, candidate_recommend
import MLModels
import MLJobRole
from models import db, User, Recruiter, Upload, Jobs, AppliedJobs, Survey
import os
import random
from TextPreProcessor import image_to_text
from werkzeug.utils import secure_filename

# *********************************************************************

# Flask app configuration and initialization

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
Up = 'static/upload'
app.config['uploadFolder'] = Up

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
# server_session = Session(app)

# *********************************************************************

# Database Connection and configuration
db.init_app(app)

with app.app_context():
    db.create_all()

# *********************************************************************

# Flask functions


@app.route("/", methods=["GET", "POST"])
def home():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email,
    })

# *********************************************************************

# User and Recruiter session handler


@app.route("/register", methods=["POST"])
def register_user():
    userType = request.json["user"]

    if userType == "candidate":
        fullName = request.json["fullName"]
        email = request.json["email"]
        mobNo = request.json["mobNo"]
        password = request.json["password"]
        mark_x = request.json["mark_x"]
        mark_xii = request.json["mark_xii"]
        mark_degree = request.json["mark_degree"]

        # print(mark_x, mark_xii, mark_degree)

        user_exists = User.query.filter_by(email=email).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User(fullName=fullName, email=email,
                        mobNo=mobNo, password=hashed_password, mark_x=mark_x, mark_xii=mark_xii, mark_degree=mark_degree)
        db.session.add(new_user)
        db.session.commit()

        # session["user_id"] = new_user.id

        # return jsonify({
        #     "id": new_user.id,
        #     "email": new_user.email
        # })
        return "200"

    elif userType == "recruiter":
        orgName = request.json["orgName"]
        email = request.json["email"]
        mobNo = request.json["mobNo"]
        password = request.json["password"]

        user_exists = Recruiter.query.filter_by(
            email=email).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = Recruiter(orgName=orgName, email=email,
                             mobNo=mobNo, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id

        return jsonify({
            "id": new_user.id,
            "email": new_user.email
        })


@app.route("/login", methods=["POST"])
def login_user():
    userType = request.json["userType"]
    email = request.json["email"]
    password = request.json["password"]
    if userType == "candidate":
        user = User.query.filter_by(email=email).first()
    elif userType == "recruiter":
        user = Recruiter.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if user.verification == False:
        return jsonify({"error": "Email Not Verified"}), 403

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id
    session["email"] = user.email

    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

# *********************************************************************

# Email Verification otp sending function


@app.route("/sendOtp", methods=["POST"])
def sendOtpMail():
    userType = request.json['userType']
    email = request.json["email"]

    if userType == 'candidate':
        user = User.query.filter_by(email=email).first()
    elif userType == 'recruiter':
        user = Recruiter.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if user.verification == False:
        otp = emailOTP.genOtp()
        session[f"{email}Otp"] = str(otp)
        emailOTP.sendOtp(email, otp, user.fullName if userType ==
                         'candidate' else user.orgName)
        return "200"
    else:
        return "200"


@app.route("/verifyOtp", methods=["POST"])
def verify():
    userType = request.json["userType"]
    email = request.json["email"]
    otp = request.json["otp"]
    print("emailFrom web", email)
    if session[f"{email}Otp"] == otp:
        if userType == 'candidate':
            user = User.query.filter_by(email=email).first()
        elif userType == 'recruiter':
            user = Recruiter.query.filter_by(email=email).first()
        user.verification = True
        db.session.commit()
        session["user_id"] = user.id
        session["email"] = user.email
        return "200"
    else:
        return jsonify({"error": "Invalid Otp"}), 401

# ********************************************************************* #\


# ********************************************************************* #
# User Data Handler
# ********************************************************************* #

# resume upload handling

@app.route("/upload", methods=["POST"])
def uploadFile():
    email = session["email"]
    userData = User.query.filter_by(email=email).first()
    XthMarks = float(userData.mark_x)
    XIIthMarks = float(userData.mark_xii)
    Degree = float(userData.mark_degree)

    file = request.files.get('file', '')
    fileName = file.filename
    data = file.read()
    file.stream.seek(0)
    file.save(os.path.join(
        app.config["uploadFolder"], secure_filename(file.filename)))

    filePath = f'static/upload/{file.filename}'

    usr_resume = image_to_text(filepath=filePath, filename=fileName)

    usr_resume_cleaned = MLModels.dataextractor(usr_resume=usr_resume)

    try:
        job_role = MLJobRole.jobRole(usr_resume=usr_resume_cleaned)
    except Exception as e:
        job_role = random.choice(['Data Science', 'Web Designing', 'Automation testing', 'Pyhon Developer',
                                 'DevOps Engineer', 'Network Engineer', 'Database', 'ETL Developer', 'DotNet Developer', 'Blockchain'])

    ner_analysis = MLModels.ner_analysis(usr_resume_cleaned=usr_resume_cleaned)

    score = MLModels.calculate_score(
        XthMarks, XIIthMarks, Degree, usr_skill=ner_analysis['skill'], usr_experience=ner_analysis['years_of_experience'])
    date = datetime.now().strftime('%d/%m/%Y')
    time = datetime.now().strftime('%H:%M:%S')
    upload = Upload(email=email, data=data, filename=fileName,
                    score=score['Score'], date=date, time=time)
    db.session.add(upload)
    db.session.commit()
    file.close()
    os.remove(os.path.join(
        app.config["uploadFolder"], secure_filename(file.filename)))

    jobs = Jobs.query.all()
    jobList = [{"Job Id": i.id, "Company Name": i.orgName, "Position": i.jobTitle, "Skills": i.skills,
                "10th": i.mark_x, "12th": i.mark_xii, "Engineering": i.mark_degree} for i in jobs]

    candidate = {"Name": ner_analysis["name"], "Position": job_role, "Skills": ', '.join(
        [skill for skill in ner_analysis['skill']]), "10th": XthMarks, "12th": XIIthMarks, "Engineering": Degree}
    try:
        recommend_id = job_recommend(
            data_recruiter=jobList, data_candidate=candidate)
    except Exception as e:
        recommend_id = [job.id for job in jobs]
    recommendations = []
    for i in recommend_id:
        jobx = {"orgName": jobs[i].orgName, "jobTitle": jobs[i].jobTitle, "jobDescription": jobs[i].jobDescription, "mark_x": jobs[i].mark_x,
                "mark_xii": jobs[i].mark_xii, "mark_degree": jobs[i].mark_degree, "skills": jobs[i].skills, "dueDate": jobs[i].endDate, "jobId": jobs[i].id}
        recommendations.append(jobx)
    [print(i) for i in recommendations]
    return jsonify({"score": score, "skills": ner_analysis['skill'], "user_data": ner_analysis, "recommendations": recommendations, 'jobTitle': job_role}), 200


@app.route("/job_recommend", methods=["GET"])
def Job_recommend():
    jobs = Jobs.query.all()
    jobsList = [{"Company Name": i.orgName, "Position": i.jobTitle, "Skills": i.skills,
                 "10th": i.mark_x, "12th": i.mark_xii, "Engineering": i.mark_degree} for i in jobs]
    # print(jobsList)
    job_recommend(data_recruiter=jobsList, mark_x=81, mark_xii=61,
                  degree=72, usr_skills=["python", "machine learning"])
    return "200"


@app.route("/scoreHistory", methods=["GET"])
def History():
    email = session.get("email")
    history = Upload.query.filter_by(email=email).all()
    HistoryLst = []
    for i in history:
        HistoryLst.append(
            {"score": i.score, "filename": i.filename, "date": i.date, "time": i.time})

    return jsonify({"Historys": HistoryLst[::-1]}), 200


@app.route("/jobapply", methods=["GET", "POST"])
def jobApply():
    if request.method == "POST":
        email = session.get("email")
        jobId = request.form.get("jobId", '')
        checkApplied = AppliedJobs.query.filter_by(
            email=email, jobId=jobId).first() is not None
        if checkApplied:
            return jsonify({"error": "Job already applied"}), 409
        user = User.query.filter_by(email=email).first()
        fullName = user.fullName
        XthMarks = float(user.mark_x)
        XIIthMarks = float(user.mark_xii)
        Degree = float(user.mark_degree)
        file = request.files.get('file', '')
        filename = file.filename

        data = file.read()
        file.stream.seek(0)
        file.save(os.path.join(
            app.config["uploadFolder"], secure_filename(file.filename)))

        filePath = f'static/upload/{file.filename}'

        usr_resume = " "

        with fitz.open(filePath) as doc:
            for page in doc:
                usr_resume += str(page.get_text())

        position = MLJobRole.jobRole(usr_resume=usr_resume)

        # job_role = MLJobRole.jobRole(usr_resume=usr_resume)

        usr_resume_cleaned = MLModels.dataextractor(usr_resume=usr_resume)
        usr_skills = MLModels.skillIdentificator(
            usr_resume_cleaned=usr_resume_cleaned)

        score = MLModels.calculate_score(
            XthMarks, XIIthMarks, Degree, usr_skill=usr_skills)

        skills = usr_skills
        JobDetails = Jobs.query.filter_by(id=jobId).first()
        apply = AppliedJobs(email=email, jobId=jobId, fullName=fullName,
                            skills=", ".join(skills), filename=filename, data=data, status="Pending", score=score, position=position)
        db.session.add(apply)
        db.session.commit()
        print(fullName, filename, skills)
        print(JobDetails.jobTitle)
        return "200"

    if request.method == "GET":
        email = session.get("email")
        applied = AppliedJobs.query.filter_by(email=email).all()
        jobList = []
        for i in applied:
            job = Jobs.query.filter_by(id=i.jobId).first()
            resp = {"orgName": job.orgName, "jobTitle": job.jobTitle,
                    "jobDescription": job.jobDescription, "status": i.status, "filename": i.filename, 'jobId': i.jobId}
            jobList.append(resp)

        x = jsonify({"jobs": jobList[::-1]})
        return x


@app.route("/download/<jobId>", methods=["GET"])
def download(jobId):
    email = session['email']
    Id = int(jobId)
    job = AppliedJobs.query.filter_by(id=5).first()
    filename = job.filename
    file = job.data
    with open(rf"./static/{filename}", "wb") as binary_files:
        binary_files.write(file)
    print("email:", email)
    print("jobId:", type(file))
    pdf = f"./static/{filename}"
    # print("fullName", fullName)
    return {"file": file}, 200

# *********************************************************************


# *********************************************************************
# Recruiter Data Handler
# *********************************************************************

@app.route("/jobs", methods=["POST", "GET"])
def jobPost():
    if request.method == "POST":
        email = session.get("email")
        jobTitle = request.json["jobTitle"]
        jobDescription = request.json["jobDescription"]
        mark_x = request.json["mark_x"]
        mark_XII = request.json["mark_XII"]
        mark_degree = request.json["mark_degree"]
        skills = request.json["skills"]
        dueDate = request.json["dueDate"]

        orgName = (Recruiter.query.filter_by(email=email).first()).orgName
        skill_lst = skills.split(",")

        jobs = Jobs(email=email, jobTitle=jobTitle, jobDescription=jobDescription, mark_x=mark_x,
                    mark_xii=mark_XII, mark_degree=mark_degree, skills=skills, orgName=orgName, endDate=dueDate)
        db.session.add(jobs)
        db.session.commit()

        print(email, jobTitle, jobDescription,
              mark_x, mark_XII, mark_degree, skills, dueDate)
        print(skill_lst)
        print(orgName)
        return "200"

    if request.method == "GET":
        email = session['email']
        jobs = Jobs.query.all()
        jobList = []
        for i in jobs:
            jobx = {"orgName": i.orgName, "jobTitle": i.jobTitle, "jobDescription": i.jobDescription, "mark_x": i.mark_x,
                    "mark_xii": i.mark_xii, "mark_degree": i.mark_degree, "skills": i.skills, "dueDate": i.endDate, "jobId": i.id}
            jobList.append(jobx)

        print(jobs)
        x = jsonify({"jobs": jobList})
        return x


@app.route('/postedJobs', methods=['GET'])
def postedJobs():
    email = session['email']
    jobs = Jobs.query.filter_by(email=email).all()
    jobList = []
    for i in jobs:
        jobx = {"orgName": i.orgName, "jobTitle": i.jobTitle, "jobDescription": i.jobDescription, "mark_x": i.mark_x,
                "mark_xii": i.mark_xii, "mark_degree": i.mark_degree, "skills": i.skills, "dueDate": i.endDate, "jobId": i.id}
        jobList.append(jobx)
    print(jobs)
    return jsonify({"jobs": jobList})


@app.route('/candidatesApplied/<jobId>', methods=['GET'])
def candidatesApplied(jobId):
    email = session["email"]
    recruiterData = Jobs.query.filter_by(id=jobId).first()
    print(recruiterData.jobTitle, recruiterData.id)
    one_recruiter = [{"Company Name": "ABC", "Position": 'Data Science', "Skills": 'Python, Machine Learning, Pandas, Numpy',
                     "10th": 60, "12th": 60, "Engineering": 72}]
    jobs = AppliedJobs.query.filter_by(jobId=jobId).all()
    print(jobs)
    candidates = []
    for job in jobs:
        userData = job.query.filter_by(email=job.email).first()
        user = User.query.filter_by(email=job.email).first()
        jobx = {"Candidate Id": job.id, "Name": userData.fullName,
                "Skills": userData.skills, "10th": user.mark_x, "12th": user.mark_xii, "Engineering": user.mark_degree, "Position": job.position, "Status": job.status, "email": user.email}
        candidates.append(jobx)
    rankedIds = []
    if candidates != []:
        rankedIds = candidate_recommend(one_Recruiter=one_recruiter,
                                        data_Candidate=candidates)
    recommendCandidates = []
    # for job in jobs:
    #     c = {"Name": job.fullName, "email": job.email, "skill": job.skills, "position": job.position}
    #     recommendCandidates.append(c)
    for i in rankedIds:
        jobx = AppliedJobs.query.filter_by(id=i).first()
        c = {"Name": jobx.fullName, "email": jobx.email, "skill": jobx.skills,
             "position": jobx.position, "Status": jobx.status, "jobId": jobx.jobId}
        recommendCandidates.append(c)

    print(recommendCandidates)
    return jsonify({"candidates": candidates, "recommend": recommendCandidates})

# *********************************************************************


@app.route('/updateStatus', methods=['POST'])
def updateStatus():
    status = request.json['status']
    print(status)
    return "200"


@app.route('/applicationHandler', methods=["GET", "POST"])
def applicationHandler():
    status = request.json['status']
    email = request.json['email']
    jobId = request.json['jobId']

    appliedJob = AppliedJobs.query.filter_by(email=email, jobId=jobId).first()
    print(appliedJob)
    print(jobId, email, status)
    print(appliedJob.status)
    if appliedJob.status == 'Accepted':
        return jsonify({"error": "Application already accepted!"}), 404
    elif appliedJob.status == 'Rejected':
        return jsonify({"error": "Application already rejected"}), 404

    appliedJob.status = 'Accepted' if status == True else 'Rejected'
    db.session.commit()
    return jsonify({"Success": "Application update successful!"}), "200"


@app.route('/test', methods=['GET'])
def test():
    one_recruiter = [{"Company Name": "ABC", "Position": 'Data Science', "Skills": 'Python, Machine Learning, Pandas, Numpy',
                     "10th": 60, "12th": 60, "Engineering": 72}]
    test = Test.query.all()
    candidateList = [{"Name": i.fullName, "Position": i.jobTitle, "Skills": i.skills,
                      "10th": i.mark_x, "12th": i.mark_xii, "Engineering": i.mark_degree} for i in test]
    candidate_recommend(one_Recruiter=one_recruiter,
                        data_Candidate=candidateList)
    return "200"

# *********************************************************************
# Forget Password Handler
# *********************************************************************


@app.route('/checkEmail', methods=['POST'])
def checkEmail():
    email = request.json['email']
    userType = request.json['userType']
    print(email, userType)
    if userType == 'candidate':
        user = User.query.filter_by(email=email).first()
    elif userType == 'recruiter':
        user = Recruiter.query.filter_by(email=email).first()
    if user == None:
        return jsonify({"error": "No user found!"}), 404

    otp = emailOTP.genOtp()
    session[f"{email}Otp"] = str(otp)
    emailOTP.sendOtp(email, otp, user.fullName if userType ==
                     'candidate' else user.orgName)
    return "200"


@app.route("/verifyFpOtp", methods=["POST"])
def verifyFPOTP():
    email = request.json["email"]
    otp = request.json["otp"]
    print("emailFrom web", email)
    if session[f"{email}Otp"] == otp:
        return "200"
    else:
        return jsonify({"error": "Invalid Otp"}), 401


@app.route('/forgetPassword', methods=['POST'])
def forgetPassword():
    print(request.json)
    userType = request.json['userType']
    email = request.json["email"]
    password = request.json["password"]
    # print(userType,  email,  password)

    if userType == 'candidate':
        user = User.query.filter_by(email=email).first()
    elif userType == 'recruiter':
        user = Recruiter.query.filter_by(email=email).first()

    if user == None:
        return jsonify({"error": "No user found!"}), 404

    hashed_password = bcrypt.generate_password_hash(password)

    user.password = hashed_password
    db.session.commit()
    # print(user.password)

    return jsonify({"Success": "Password Change successful"})

@app.route('/submitSurvey', methods=["POST"])
def submitSurvey():
    email = session["email"]
    feedback1 = request.json["feedback1"]
    feedback2 = request.json["feedback2"]
    feedback3 = request.json["feedback3"]

    newEntry = Survey(email=email, feedback1=feedback1, feedback2=feedback2, feedback3=feedback3)
    db.session.add(newEntry)
    db.session.commit()
    return "200"


if __name__ == "__main__":
    app.run()
