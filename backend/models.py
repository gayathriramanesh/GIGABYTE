from sqlalchemy import Column,Integer, String, Numeric,ForeignKey,DateTime,Boolean
from sqlalchemy.orm import relationship
from database import Base
import uuid

class Register(Base):
    __tablename__ = 'Register'
    id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    uid = Column(String,unique=True,default=lambda:str(uuid.uuid4()),index=True)
    name = Column(String,index=True)
    email = Column(String,index=True)
    password = Column(String)
    password_salt = Column(String)
    role = Column(String,default='user',index=True)
    recently_viewed_products = relationship("Recently_viewed", back_populates="user")
    orders = relationship("Order", back_populates="user")
    enquiry = relationship("Enquiry", back_populates="user", uselist=False)



class Product(Base):
    __tablename__ = 'Product'
    id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    pid = Column(String,index=True,unique=True)
    product_name = Column(String,index=True)
    description = Column(String,index=True)
    price = Column(Numeric(10, 2),index=True)
    image_url = Column(String,index=True)
    recently_viewed = relationship(
        "Recently_viewed",
        back_populates="product",
        uselist=False,  
        cascade="all, delete"
        
    )
    
class Recently_viewed(Base):
    __tablename__ = 'Recently_viewed'
    id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    pid = Column(String,ForeignKey('Product.pid'),index=True)
    created_at = Column(DateTime)
    user_id = Column(Integer, ForeignKey('Register.id'), index=True) 
    product = relationship("Product", back_populates="recently_viewed")
    user = relationship("Register", back_populates="recently_viewed_products")
    
class Enquiry(Base):
    __tablename__ = 'Enquiry'
    id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    name = Column(String,index=True)
    city = Column(String,index=True)
    email = Column(String,index=True)
    mobile = Column(String,index=True)
    pincode = Column(Integer,index=True)
    user_id = Column(Integer, ForeignKey('Register.id'), unique=True, index=True)
    user = relationship("Register", back_populates="enquiry")

    
class Order(Base):
    __tablename__ = 'Order'
    id = Column(Integer, primary_key=True, autoincrement=True) 
    order_id = Column(String, index=True, unique=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(Integer, ForeignKey('Register.id'), index=True)
    address = Column(String)
    pincode = Column(Integer)
    phone = Column(String)
    total_price = Column(Numeric(10, 2))
    order_date = Column(DateTime, index=True)
    payment_method = Column(String, index=True)
    payment_status = Column(Boolean, index=True, default=True)

    user = relationship("Register", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")  

class OrderItem(Base):
    __tablename__ = 'OrderItem'
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey('Order.id'))
    product_id = Column(String, ForeignKey('Product.pid'))
    quantity = Column(Integer, default=1)
    price = Column(Numeric(10, 2))  
    total_price = Column(Numeric(10, 2))

    order = relationship("Order", back_populates="items")
    product = relationship("Product")

    
