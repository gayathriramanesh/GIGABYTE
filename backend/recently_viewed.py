from fastapi import  Depends,APIRouter, HTTPException,Form
from auth import get_current_user
from database import SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import Annotated, Optional
from datetime import datetime
import models
router = APIRouter(prefix="/recently_viewed", tags=["Recently Viewed"],dependencies=[Depends(get_current_user)])
auth_depends = Depends(get_current_user)

from pydantic import BaseModel

class RecentlyViewedRequest(BaseModel):
    product_id: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

@router.get("/", summary="Get Recently Viewed Products")
def get_recently_viewed_products(db: Annotated[Session, Depends(get_db)], current_user: Annotated[models.Register, Depends(get_current_user)]):
    try:
        products = db.query(models.Recently_viewed).filter(models.Recently_viewed.user_id==current_user.id).order_by(models.Recently_viewed.created_at.desc()).limit(10).all()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.post("/add_recently_viewed_product", summary="Add a product to Recently Viewed Products")
def add_recently_viewed_products(
    payload: RecentlyViewedRequest,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[models.Register, Depends(get_current_user)]
):
    try:
        check_pid = db.query(models.Recently_viewed).filter(
            models.Recently_viewed.pid == payload.product_id,
            models.Recently_viewed.user_id == current_user.id
        ).first()
        
        if not check_pid:
            recently_viewed_product = models.Recently_viewed(
                pid=payload.product_id,
                user_id=current_user.id,
                created_at=datetime.now()
            )
            db.add(recently_viewed_product)
            db.commit()
            db.refresh(recently_viewed_product)
        
        products = db.query(models.Recently_viewed)\
                     .filter(models.Recently_viewed.user_id == current_user.id)\
                     .order_by(models.Recently_viewed.created_at.desc())\
                     .limit(10).all()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
        

