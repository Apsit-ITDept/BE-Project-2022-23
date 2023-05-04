import spacy
from spacy.pipeline import EntityRuler
from spacy.lang.en import English
from spacy.tokens import Doc
from spacy import displacy
from nltk.stem import WordNetLemmatizer
from scoreCalculator import calculate_score

def skillIdentifier(usr_resume_cleaned):

    # first cell

    nlp = spacy.load("./For_Testing/ML_3/model/output/model-best/")
    skill_pattern_path = "./For_Testing/ML_2/jz_skill_patterns.jsonl"
    ruler = nlp.add_pipe("entity_ruler")
    ruler.from_disk(skill_pattern_path)
    print(nlp.pipe_names)
    print("***********************************")


    # // Second cell
    colors = {
        "Skill": "linear-gradient(90deg, #9BE15D, #00E3AE)",
        "Companies worked at": "linear-gradient(90deg,#2E3192, #1BFFFF)",
        "Designation" : "linear-gradient(90deg, #D4145A, #FBB03B)",
        "Years of Experience": "linear-gradient(90deg, #662D8C, #ED1E79)",
        "Location": "linear-gradient(90deg, #EE9CA7, #FFDDE1)",
        "Name": "linear-gradient(90deg, #FF5F6D, #FFC371)",
        "Graduation Year": "linear-gradient(90deg, #C6EA8D, #FE90AF)",
        "College Name":"linear-gradient(90deg, #EA8D8D, #A890FE)",
        "Degree":"linear-gradient(90deg, #D8B5FF, #1EAE98)",
        "UNKNOWN": "linear-gradient(90deg, #614385, #516395)",
        "Education": "linear-gradient(90deg, #BFF098, #6FD6FF)",
        "Project": "linear-gradient(90deg, #A9F1DF, #FFBBBB)",
        "Certificate": "linear-gradient(90deg, #93A5CF, #E4EfE9)",
        "Hobby": "linear-gradient(90deg, #868F96, #596164)",
        "Achievement": "linear-gradient(90deg,#FDFCFB, #E2D1C3)"
    }
    options = {
        "ents": [
            "Skill",
            "Companies worked at",
            "Designation",
            "Years of Experience",
            "Location",
            "Name",
            "Graduation Year",
            "College Name",
            "Degree",
            "UNKNOWN",
            "Education",
            "Project",
            "Certificate",
            "Hobby",
            "Achievement"
        ],
        "colors": colors,
    }
    sent2 = nlp(usr_resume_cleaned)
    displacy.render(sent2, style="ent", jupyter=True, options=options)
    print("******************************************")

    # Cell 3
    usr_skill = []
    doc = nlp(usr_resume_cleaned)
    for ent in doc.ents:
        print(ent.label_, "→",ent.text,"\n")
        if ent.label_ == "SKILL":
            if ent.text not in usr_skill:
                usr_skill.append(ent.text.lower())

    print("******************************************")

    # cell 4
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

    print("******************************************")

    # Cell 5
    print(resume_skills)

    print("******************************************")
    
    # Cell 6
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
        print(ent.label_, "→",ent.text,"\n")
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

    print("******************************************")

    # cell 7
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


    for k,v in ner_analysis.items():
        if v == []:
            pass
        else:
            print(v)

    print("******************************************")


    calculate_score(86.5, 69, 80.15, usr_skill=usr_skill)