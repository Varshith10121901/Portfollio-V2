import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv()

app = FastAPI(title="Varshith Portfolio Backend")

# Configure CORS so frontend React app can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

SENDER_EMAIL = os.getenv("SENDER_EMAIL", "varshithkumar597@gmail.com")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD", "")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", "Varshithkumar815@gmail.com")


@app.post("/api/contact")
async def send_contact_message(msg: ContactMessage):
    try:
        # Create email container
        email_msg = MIMEMultipart()
        email_msg["From"] = SENDER_EMAIL
        email_msg["To"] = RECEIVER_EMAIL
        email_msg["Subject"] = f"New Portfolio Message from {msg.name}"

        body = f"""You have received a new contact message from your portfolio site.

Name: {msg.name}
Email: {msg.email}

Message:
{msg.message}
"""
        email_msg.attach(MIMEText(body, "plain"))

        # Connect to Gmail SMTP server using TLS on port 587
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, email_msg.as_string())
        server.quit()

        return {"status": "success", "message": "Email sent successfully"}
    except Exception as e:
        print(f"SMTP Error encountered: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to send notification email: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
