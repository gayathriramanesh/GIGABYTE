from fastapi import  Depends,APIRouter, HTTPException,Form
from auth import get_current_user
from database import SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated, Optional
import models
from pydantic import BaseModel
from utils import send_email

router = APIRouter(prefix="/enquiry", tags=["enquiry"],dependencies=[Depends(get_current_user)])



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
class Enquiry(BaseModel):
    name: str
    city: str
    email: str
    mobile: str
    pincode: int
        

@router.post("/", summary="Add a new enquiry")
def add_enquiry(payload: Enquiry,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[str,  Depends(get_current_user)]):
    try:
        is_email = db.query(models.Enquiry).filter(models.Enquiry.email == payload.email).first()
        if is_email:
            raise HTTPException(status_code=400, detail="Email already exists")
        new_enquiry = models.Enquiry(
            name=payload.name,
            city=payload.city,
            email=payload.email,
            mobile=payload.mobile,
            pincode=payload.pincode,
            user_id = current_user.id
        )
        db.add(new_enquiry)
        db.commit()
        db.refresh(new_enquiry)
        message = send_email(
            name = payload.name,
            to_email= payload.email)
        if message['status'] == 'error':
            raise HTTPException(status_code=500, detail=message['message'])
        else:
          return {"message": "Enquiry added successfully", "enquiry_id": new_enquiry.id}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
