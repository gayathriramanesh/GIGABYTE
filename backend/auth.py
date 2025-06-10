from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
from starlette.config import Config
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from typing import Any
import utils
import models
from models import Register
from database import SessionLocal
from fastapi import Depends, HTTPException, status
from typing_extensions import Annotated
import os
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter, Request

from dotenv import load_dotenv
load_dotenv(dotenv_path="secrets.env")


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM =  os.getenv("ALGORITHM")

config_data = {
    "GOOGLE_CLIENT_ID": os.getenv("GOOGLE_CLIENT_ID"),
    "GOOGLE_CLIENT_SECRET": os.getenv("GOOGLE_CLIENT_SECRET"),
    "SECRET_KEY": SECRET_KEY
}
config = Config(environ=config_data)

router = APIRouter()

oauth = OAuth(config)
oauth.register(
    name='google',
    client_id=config_data["GOOGLE_CLIENT_ID"],
    client_secret=config_data["GOOGLE_CLIENT_SECRET"],
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def authenticate_user(email: str, password: str, db:Session):
    user: Register = db.query(models.Register).filter(models.Register.email == email).first()
    if not user:
        return False   
    if not utils.verify_password(password, user.password_salt, user.password):
        return False
    return user

def create_access_token(username: str,user_id:int, expires_delta: timedelta):
    expire = datetime.now(timezone.utc) + expires_delta
    payload: dict[str, Any] = {
        'sub': username,
        'user_id': user_id,
        'exp': expire
    }
    token = jwt.encode(payload,SECRET_KEY, algorithm=ALGORITHM)
    return token

def verify_access_token(token:str,db:Annotated[Session, Depends(get_db)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_name: str = payload.get("sub")
        user_id = payload.get("user_id")
        if user_name is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Couldn't validate user"
            )
        user = db.query(models.Register).filter(models.Register.name == user_name).first()
        if not user:
            raise ValueError("User not found")
        return user
    
    except (ValueError, JWTError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"}
        )

def get_current_user(token: str = Depends(oauth2_bearer),db: Session = Depends(get_db)):
    return verify_access_token(token,db)

def create_jwt_token(user_id: str):
    expire = datetime.utcnow() + timedelta(days=1)
    return jwt.encode({
        "sub": user_id,
        "exp": expire
    }, config_data["SECRET_KEY"], algorithm="HS256")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/auth/google/login")
async def login_via_google(request: Request):
    redirect_uri = request.url_for('google_callback')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/auth/google/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info = await oauth.google.userinfo(token=token)  # ✅ this works even if no id_token

    if not user_info:
        raise HTTPException(status_code=400, detail="Google login failed")

    # check or create user in DB
    user = db.query(models.Register).filter_by(email=user_info["email"]).first()
    if not user:
        user = models.Register(
            name=user_info.get("name", ""),
            email=user_info["email"],
            password="",  # leave blank if not using password auth
            password_salt="",
            role="user"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    jwt_token = create_access_token(
        username=user.name,
        user_id=user.id,
        expires_delta=timedelta(days=1)
    )
    return RedirectResponse(
        url=f"http://localhost:5173/home?token={jwt_token}&role={user.role}"
    )
