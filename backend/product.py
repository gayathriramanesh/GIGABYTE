from fastapi import  Depends,APIRouter, HTTPException,Form
from auth import get_current_user
from database import SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import Annotated, Optional
import models
router = APIRouter(prefix="/products", tags=["product"],dependencies=[Depends(get_current_user)])
auth_depends = Depends(get_current_user)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

@router.post("/add_product", summary="Add a new product")
def add_product(name: Annotated[str, Form()],
    pid: Annotated[str, Form()],
    price: Annotated[float, Form()],
    description: Annotated[str, Form()],
    imageUrl: Annotated[str, Form()],
    db: Annotated[Session, Depends(get_db)]):
    try:
        check_pid = db.query(models.Product).filter(models.Product.pid == pid).first()
        if check_pid:
            raise HTTPException(status_code=400, detail="Product already exists")
        new_product = models.Product(
            product_name=name,
            price=price,
            description=description,
            image_url=imageUrl,
            pid=pid
        )
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return new_product
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/product", summary="Get all products")
def get_all_items(db:Session=Depends(get_db)):
    try:
        products = db.query(models.Product)
        return products.all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    

  
@router.get("", summary="Get items with pagination")
def read_items(skip:int = 0,limit:int=4,db:Session=Depends(get_db)):
    try:
        products = db.query(models.Product).offset(skip).limit(limit).all()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
        
@router.get("/filter",summary="Search product details by name or pid")
def filter_product(name: Optional[str]=None,pid:Optional[str]=None, db: Session = Depends(get_db)):
    try:
      products= db.query(models.Product)
      if name:
          products = products.filter(models.Product.product_name.ilike(f"%{name}%"))
      if pid:
            products = products.filter(models.Product.pid.ilike(f"%{pid}%"))
      return products.all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/{pid}", summary="Get a single product by name")
def get_product_by_name(pid: str, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.pid == pid).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product



