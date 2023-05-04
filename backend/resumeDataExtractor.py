import fitz
from nltk.corpus import stopwords
from skillIdentification import skillIdentifier

stop_word = set(stopwords.words("english"))

def dataExtractor(fileName):
    doc = fitz.open(fileName)

    usr_resume = " "

    for page in doc:
        usr_resume += str(page.get_text())

    usr_resume_cleaned = clean(usr_resume)
    return usr_resume_cleaned

    

def clean(txt):
    txt = " ".join([word for word in txt.split() if word not in stop_word])
    text_encode = txt.encode(encoding="ascii", errors="ignore")
    text_decode = text_encode.decode()
    clean_text = " ".join([word for word in text_decode.split()])
    return clean_text

fileName = './PDF/Omkar.pdf'
usr_resume_cleaned = dataExtractor(fileName=fileName)
skillIdentifier(usr_resume_cleaned=usr_resume_cleaned)

# dataExtractor(fileName)