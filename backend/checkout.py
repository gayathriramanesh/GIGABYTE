from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Annotated

from models import Order, OrderItem, Product, Register
from database import SessionLocal
from auth import get_current_user
from cart_redis import get_cart, clear_cart
from pydantic import BaseModel

router = APIRouter(prefix="/order", tags=["Order"], dependencies=[Depends(get_current_user)])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
class CheckoutRequest(BaseModel):
    address: str
    pincode: int
    phone: str
    payment_method: str

@router.post("/checkout", summary="Checkout and place order")
def place_order(
    payload: CheckoutRequest,
    current_user: Annotated[Register, Depends(get_current_user)],db: Session = Depends(get_db)):
    try:
        print("Payload:", payload)
        print("User ID:", current_user.id)
        user_id = current_user.id
        cart_items = get_cart(user_id)
        if not cart_items:
            raise HTTPException(status_code=400, detail="Cart is empty")

        total_price = 0
        order_items = []

        for item in cart_items:
            product = db.query(Product).filter(Product.pid==item["product_id"]).first()
            if not product:
                print(product)
                raise HTTPException(status_code=404, detail=f"Product {item['product_id']} not found")

            item_total = float(product.price) * item["quantity"]
            total_price += item_total

            order_items.append(OrderItem(
                product_id=product.pid,
                quantity=item["quantity"],
                price=product.price
            ))

        order = Order(
            user_id=user_id,
            address=payload.address,
            pincode=payload.pincode,
            phone=payload.phone,
            payment_method=payload.payment_method,
            total_price=total_price,
            payment_status=True,  
            order_date=datetime.now(),
            items=order_items
        )

        db.add(order)
        db.commit()
        db.refresh(order)

        clear_cart(user_id)

        return {
            "message": "Order placed successfully",
            "order_id": order.order_id,
            "total": total_price,
            "items": [{"product_id": i.product_id, "qty": i.quantity} for i in order.items]
        }
    except Exception as e:
        print("Checkout Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
