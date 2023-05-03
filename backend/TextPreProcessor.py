import os
from pdf2image import convert_from_path
from PIL import Image
import pytesseract
import re

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def pdf_to_image(pdf, filename):  
    images = convert_from_path(pdf, poppler_path = r'C:\Users\Victor\Documents\poppler-0.68.0_x86\poppler-0.68.0\bin')
    
    for i in range(len(images)):
        images[i].save(f'./PdfToImg/{filename}{str(i)}.jpeg', 'JPEG')

def image_to_text(filepath, filename):
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
    return text

# def image_to_text(filepath):
#     filename=re.split('[. /]', filepath)[-2]
#     pdf_to_image(filepath, filename=filename)
#     path = []
#     with os.scandir('./PdfToImg/') as entries:
#         [path.append(entry.path) for entry in entries]
#     text = ''
#     for image_path in path:
#         img = Image.open(image_path)
#         text += pytesseract.image_to_string(img)

#     for image_path in path:
#         os.remove(image_path)
#     return text

def main():
    print('Welcome to TextPreProcessing')

if __name__ == '__main__':
    # main()
    path = './my_files.pdf'
    print(image_to_text(path, 'my_files'))