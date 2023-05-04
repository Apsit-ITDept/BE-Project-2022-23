import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import os
import re
# import cv2

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def pdf_to_image(pdf, filename):  
    # Store Pdf with convert_from_path function
    images = convert_from_path(pdf, poppler_path = r'C:\Users\Victor\Documents\poppler-0.68.0_x86\poppler-0.68.0\bin')
    
    for i in range(len(images)):
        # images[i].save(filename + str(i) +'.jpg', 'JPEG')
        images[i].save(f'./PdfToImg/{filename}{str(i)}.jpeg', 'JPEG')

def image_to_text(filepath):
    filename=re.split('[. /]', filepath)[-2]
    # paths = list(os.scandir('./PdfToImg'))
    pdf_to_image(filepath, filename=filename)
    path = []
    with os.scandir('./PdfToImg/') as entries:
        [path.append(entry.path) for entry in entries]
    text = ''
    for image_path in path:
        img = Image.open(image_path)
        text += pytesseract.image_to_string(img)

    for image_path in path:
        os.remove(image_path)

    # for file in paths:
    return text


path = './Omkar.pdf'
# print(re.split('[. /]', path)[-2])
print(image_to_text(path))