from fastapi import  Depends,APIRouter
from auth import get_current_user
from database import SessionLocal
from typing import Annotated
import models
router = APIRouter(prefix="/users", tags=["users"],dependencies=[Depends(get_current_user)])

auth_depends = Depends(get_current_user)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/me", summary="Get current user profile")
def get_my_profile(user: Annotated[models.Register, Depends(get_current_user)]):
    return {
        "user_id": user.id,
        "name": user.name,
        "email": user.email
    }
    
@router.get("/all", summary="Get all users")
def get_all_users(db: Annotated[SessionLocal, Depends(get_db)]):
    users = db.query(models.Register).all()
    return [{"id": user.id, "name": user.name, "email": user.email} for user in users]

@router.get("/{user_id}", summary="Get user by ID")
def get_user_by_id(user_id: int, db: Annotated[SessionLocal, Depends(get_db)]):
    user = db.query(models.Register).filter(models.Register.id == user_id).first()
    if not user:
        return {"error": "User not found"}
    return {"id": user.id, "name": user.name, "email": user.email}