from cart_redis import add_to_cart, get_cart, clear_cart,delete_from_cart,update_cart
from fastapi import  Depends,APIRouter, HTTPException
from auth import get_current_user
from sqlalchemy.orm import Session
from models import Register
from database import SessionLocal
from pydantic import BaseModel

class AddToCartRequest(BaseModel):
    product_id: str
    quantity: int = 1

router = APIRouter(prefix="/cart", tags=["Cart"],dependencies=[Depends(get_current_user)])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/add", summary="Add product to cart")
def add_product_to_cart(
    payload: AddToCartRequest,
    db: Session = Depends(get_db),
    current_user: Register = Depends(get_current_user)
):
    user_id = current_user.id
    return add_to_cart(user_id, payload.product_id, payload.quantity)

@router.get("/view", summary="View cart")
def view_cart(
    db: Session = Depends(get_db),
    current_user: Register = Depends(get_current_user)
):
    user_id = current_user.id
    cart_items = get_cart(user_id)
    return {"name": current_user.name, "cart_items": cart_items}

@router.post("/update", summary="Update product quantity in cart")
def update_product_in_cart(
    product_id: str,
    quantity: int,
    current_user: Register = Depends(get_current_user)
):
    user_id = current_user.id
    result = update_cart(user_id, product_id, quantity)
    if 'status' in result and result["status"] == "not found":
        raise HTTPException(status_code=404, detail="Product not found in cart")
    return result


@router.delete("/delete_pdt_from_cart", summary="Delete product from cart")
def delete_pdt_from_cart(
    product_id: str,
    current_user: Register = Depends(get_current_user)
):
    user_id = current_user.id
    result = delete_from_cart(user_id, product_id)
    if result["status"] == "not found":
        raise HTTPException(status_code=404, detail="Product not found in cart")
    return result
    