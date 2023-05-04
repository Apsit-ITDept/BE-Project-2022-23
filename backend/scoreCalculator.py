def calculate_score(mark_10, mark_12, mark_degree, usr_skill):
    mark_score = (mark_10+mark_12+mark_degree)/3
    print(mark_score)

    if len(usr_skill) >= 10:
        skill_score = 40
    elif len(usr_skill) > 7 and len(usr_skill) <10:
        skill_score=30
    elif len(usr_skill) > 5 and len(usr_skill) <7:
        skill_score = 20
    elif len(usr_skill) > 2 and len(usr_skill) <5:
        skill_score = 10
    else:
        skill_score = 0
    print(skill_score)

    print(len(usr_skill))

    skill = (15/15)*60

    exp = (3/4)*10

    # total_edu = (mark_10+mark_12+mark_degree)/3
    edu = mark_score/100*30

    print(skill+exp+edu) # It should be returned