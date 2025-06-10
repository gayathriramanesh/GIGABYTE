from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import models
from datetime import timedelta
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import utils
import auth
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from users import router as user_router
from product import router as product_router
from cart import router as cart_router
from recently_viewed import router as recently_viewed_router
from checkout import router as checkout
from enquiry import router as enquiry
from auth import router as google_auth_router 
from starlette.middleware.sessions import SessionMiddleware
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
load_dotenv(dotenv_path="secrets.env")


app = FastAPI()

app.mount("/static", StaticFiles(directory="static", html=True), name="static")

SECRET_KEY = os.getenv("SECRET_KEY")

app.include_router(user_router)
app.include_router(product_router)
app.include_router(cart_router)
app.include_router(recently_viewed_router)
app.include_router(checkout)
app.include_router(enquiry)
app.include_router(google_auth_router)  
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.add_middleware(
    SessionMiddleware,
    secret_key=SECRET_KEY
)
models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role : str
    
class UserResponse(BaseModel):
    message: str
    name: str

class LoginResponse(BaseModel):
    message: str
    name: str
    access_Token: str
    
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str

@app.post("/register",response_model=UserResponse)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        existing_user = db.query(models.Register).filter(models.Register.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists in the database")
        salt, hashed = utils.hash_password(user.password)
        new_user = models.Register(name=user.name,email=user.email, password=hashed, password_salt=salt, role=user.role)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return UserResponse(message="User created successfully",name=user.name)

    except Exception as e:
            db.rollback()
            print(f"Database error: {e}")  
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
        
@app.get("/")
def read_root():
    return FileResponse("static/index.html")
        
@app.post("/login",response_model=TokenResponse)
async def login(form_data:Annotated[OAuth2PasswordRequestForm,Depends()],db: Session = Depends(get_db)):
        user = auth.authenticate_user(form_data.username, form_data.password,db)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        token = auth.create_access_token(user.name,user.id,expires_delta=timedelta(minutes=1440))
        return{
        "access_token": token,
        "token_type": "bearer",
        "role": user.role
    }
       
