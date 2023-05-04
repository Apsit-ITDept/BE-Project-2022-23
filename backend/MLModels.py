from nltk.corpus import stopwords
import spacy
import re

stop_word = set(stopwords.words("english"))

#  Loading the model
nlp = spacy.load("./For_Testing/ML_3/model/output/model-best/")
skill_pattern_path = "./For_Testing/ML_2/jz_skill_patterns.jsonl"
ruler = nlp.add_pipe("entity_ruler")
ruler.from_disk(skill_pattern_path)
print(nlp.pipe_names)


# function to be kept in this file only

def clean(txt):
    txt = " ".join([word for word in txt.split() if word not in stop_word])
    text_encode = txt.encode(encoding="ascii", errors="ignore")
    text_decode = text_encode.decode()
    clean_text = " ".join([word for word in text_decode.split()])
    return clean_text


def dataextractor(usr_resume):
    usr_resume_cleaned = clean(usr_resume)
    return usr_resume_cleaned


def skillIdentificator(usr_resume_cleaned):
    sent2 = nlp(usr_resume_cleaned)
    usr_skill = []
    doc = nlp(usr_resume_cleaned)
    for ent in doc.ents:
        # print(ent.label_, "→",ent.text,"\n")
        if ent.label_ == "SKILL":
            if ent.text not in usr_skill:
                usr_skill.append(ent.text.lower())

    return usr_skill


def checkMatchPercentage(usr_skill):
    input_skills = '''C,Java,Python'''
    req_skills = input_skills.lower().split(",")
    resume_skills = usr_skill
    score = 0
    for x in req_skills:
        if x in resume_skills:
            score += 1
    req_skills_len = len(req_skills)
    match = round(score / req_skills_len * 100, 1)
    print(f"The current Resume is {match}% matched to your requirements")


def ner_analysis(usr_resume_cleaned):
    usr_skill = set()
    usr_companies_worked_at = set()
    usr_designation = set()
    usr_years_of_experience = set()
    usr_location = set()
    usr_name = set()
    usr_graduation_year = set()
    usr_college_name = set()
    usr_degree = set()
    usr_education = set()
    usr_project = set()
    usr_certificate = set()
    usr_hobby = set()
    usr_achievement = set()

    ner_analysis = {}

    doc = nlp(usr_resume_cleaned)
    for ent in doc.ents:
        # print(ent.label_, "→", ent.text, "\n")
        if ent.label_ == "SKILL":
            usr_skill.add(ent.text.lower())
        elif ent.label_ == "Companies worked at":
            usr_companies_worked_at.add(ent.text.lower())
        elif ent.label_ == "Designation":
            usr_designation.add(ent.text.lower())
        elif ent.label_ == "Years of Experience":
            usr_years_of_experience.add(ent.text.lower())
        elif ent.label_ == "Location":
            usr_location.add(ent.text.lower())
        elif ent.label_ == "Name":
            usr_name.add(ent.text.lower())
        elif ent.label_ == "Graduation Year":
            usr_graduation_year.add(ent.text.lower())
        elif ent.label_ == "College Name":
            usr_college_name.add(ent.text.lower())
        elif ent.label_ == "Degree":
            usr_degree.add(ent.text.lower())
        elif ent.label_ == "Education":
            usr_education.add(ent.text.lower())
        elif ent.label_ == "Project":
            usr_project.add(ent.text.lower())
        elif ent.label_ == "Education":
            usr_education.add(ent.text.lower())
        elif ent.label_ == "Certificate":
            usr_certificate.add(ent.text.lower())
        elif ent.label_ == "Hobby":
            usr_hobby.add(ent.text.lower())
        elif ent.label_ == "Achievement":
            usr_achievement.add(ent.text.lower())

    ner_analysis['skill'] = list(usr_skill)
    ner_analysis['companies_worked_at'] = list(usr_companies_worked_at)
    ner_analysis['designation'] = list(usr_designation)
    ner_analysis['years_of_experience'] = list(usr_years_of_experience)
    ner_analysis['location'] = list(usr_location)
    ner_analysis['name'] = list(usr_name)
    ner_analysis['graduation_year'] = list(usr_graduation_year)
    ner_analysis['college_name'] = list(usr_college_name)
    ner_analysis['degree'] = list(usr_degree)
    ner_analysis['education'] = list(usr_education)
    ner_analysis['project'] = list(usr_project)
    ner_analysis['certificate'] = list(usr_certificate)
    ner_analysis['hobby'] = list(usr_hobby)
    ner_analysis['achievement'] = list(usr_achievement)

    # for k, v in ner_analysis.items():
    #     if v == []:
    #         pass
    #     else:
    #         print(v)

    return ner_analysis


def calculate_score(mark_10, mark_12, mark_degree, usr_skill, usr_experience):
    mark_score = (mark_10+mark_12+mark_degree)/3
    edu = mark_score/100*30

    print("length:", len(usr_skill))
    exp = sum(map(int, re.findall('\d+', ', '.join(usr_experience))))
    print("Years Of Experience: ", exp)

    if len(usr_skill) >= 20:
        skill_score = 60
    elif len(usr_skill) >= 15:
        skill_score = 55
    elif len(usr_skill) >= 12:
        skill_score = 50
    elif len(usr_skill) >= 10:
        skill_score = 40
    elif len(usr_skill) > 7 and len(usr_skill) < 10:
        skill_score = 30
    elif len(usr_skill) > 5 and len(usr_skill) < 7:
        skill_score = 20
    elif len(usr_skill) > 2 and len(usr_skill) < 5:
        skill_score = 10
    else:
        skill_score = 0

    if exp >= 10:
        exp_score = 10
    else:
        exp_score = exp
    return {"Score": int(skill_score+edu+exp_score), "skill_score": int(skill_score), "edu_score": int(edu), "exp_score": int(exp_score)}
