import smtplib
import random


def genOtp():
    return random.randint(1000, 9999)


def sendOtp(receiver, otp, username="User"):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('thomas761223@gmail.com', 'faewhbyfgjlrofqp')
    msg = f"Hello {username},\n\n\t Please verify your email.\n\t Your otp is: {str(otp)}"
    sender = "thomas761223@gmail.com"
    server.sendmail(sender, receiver, msg)
    server.quit()


# otp = genOtp()
# receiver = "maxmillar1212@gmail.com"
# sendOtp(receiver, otp)


# def sendOtp(receiver, otp):
#     server = smtplib.SMTP('smtp.gmail.com', 587)
#     server.starttls()
#     server.login('thomas761223@gmail.com', 'asywxecqrualojkf')
#     msg='Hello, Your OTP is '+str(otp)
#     sender = "thomas761223@gmail.com"
#     server.sendmail(sender, receiver, msg)
#     server.quit()

# otp = genOtp()
# receiver = "maxmillar1212@gmail.com"
# sendOtp(receiver, otp)
