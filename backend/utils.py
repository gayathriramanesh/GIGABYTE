import hashlib
import os
import base64
import smtplib
from email.message import EmailMessage
import smtplib
from email.message import EmailMessage

sender_email = "gayathriramanesh2001@gmail.com"
sender_password = "bhde rsqa pwkm ofve"  

def hash_password(password: str) -> tuple[str, str]:
    salt = os.urandom(16) 
    pwd_hash = hashlib.pbkdf2_hmac(
         'sha256',
          password.encode('utf-8'),  
          salt,
          100_000  
    )
    return base64.b64encode(salt).decode(), base64.b64encode(pwd_hash).decode()

def verify_password(password: str, salt_b64: str, stored_hash_b64: str) -> bool:
    salt = base64.b64decode(salt_b64.encode())
    pwd_hash = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        100_000
    )
    return base64.b64encode(pwd_hash).decode() == stored_hash_b64

def send_email(name:str,to_email: str):
    msg = EmailMessage()
    msg["Subject"] = "Enquiry about the discounts"
    msg["From"] = sender_email
    msg["To"] = to_email
    body = f"Thank you for your enquiry, {name}. Our team will contact you soon on your contact number." 
    msg.set_content(body)
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(sender_email, sender_password)
            smtp.send_message(msg)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
