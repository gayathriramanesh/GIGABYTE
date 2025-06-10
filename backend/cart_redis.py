from redis_client import r

def add_to_cart(user_id: int, product_id: str, quantity: int):
    key = f"cart:user:{user_id}"
    current_qty = r.hget(key, product_id)
    new_qty = quantity + int(current_qty or 0)
    r.hset(key, product_id, new_qty)
    return {"product_id": product_id, "quantity": new_qty}

def get_cart(user_id: int):
    key = f"cart:user:{user_id}"
    cart = r.hgetall(key)
    return [{"product_id": pid, "quantity": int(qty)} for pid, qty in cart.items()]

def update_cart(user_id: int, product_id: str, quantity: int):
    key = f"cart:user:{user_id}"
    if r.hexists(key, product_id):
        r.hset(key, product_id, quantity)
        return {"product_id": product_id, "quantity": quantity}
    else:
        return {"product_id": product_id, "status": "not found"}

def delete_from_cart(user_id: int, product_id: str):
    key = f"cart:user:{user_id}"
    if r.hexists(key, product_id):
        r.hdel(key, product_id)
        return {"product_id": product_id, "status": "deleted"}
    else:
        return {"product_id": product_id, "status": "not found"}

def clear_cart(user_id: int):
    r.delete(f"cart:user:{user_id}")
    
