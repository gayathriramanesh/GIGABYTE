import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../Card/Card.css";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cartRes = await axios.get("https://gigabyte.onrender.com//cart/view", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const cart = cartRes.data;

      const productDetails = await Promise.all(
        cart.cart_items.map((item) =>
          axios
            .get(`https://gigabyte.onrender.com//products/filter?pid=${item.product_id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => res.data[0])
        )
      );

      const productMap = {};
      productDetails.forEach((product) => {
        if (product) productMap[product.pid] = product;
      });

      setCartItems(cart.cart_items);
      setProductsMap(productMap);
      calculateTotal(cart.cart_items, productMap);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const calculateTotal = (items, map) => {
    const total = items.reduce((acc, item) => {
      const product = map[item.product_id];
      if (product) {
        return acc + product.price * item.quantity;
      }
      return acc;
    }, 0);
    setCartTotal(total);
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`https://gigabyte.onrender.com//cart/delete_pdt_from_cart`, {
        params: { product_id: productId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.post(
        `https://gigabyte.onrender.com//cart/update`,
        null,
        {
          params: { product_id: productId, quantity: newQuantity },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="card-wrapper">
      {cartItems.length === 0 ? (
        <h3>Your cart is empty 🛒</h3>
      ) : (
        <>
          {cartItems.map((item) => {
            const product = productsMap[item.product_id];
            if (!product) return null;

            return (
              <div className="single-card" key={product.pid}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image_url}
                    alt={product.product_name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.product_name}</Typography>
                    <Typography variant="body2">Price: ₹{product.price}</Typography>
                    <Typography variant="body2">Total: ₹{product.price * item.quantity}</Typography>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                      <IconButton
                        onClick={() => updateQuantity(product.pid, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        color="primary"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1">{item.quantity}</Typography>
                      <IconButton
                        onClick={() => updateQuantity(product.pid, item.quantity + 1)}
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>

                      <IconButton color="error" onClick={() => handleRemove(product.pid)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}

          <div style={{ marginTop: "30px", textAlign: "center", width: "100%" }}>
            <Typography variant="h6">Total Items: {cartItems.length}</Typography>
            <Typography variant="h5" style={{ marginTop: "10px" }}>
              Cart Total: ₹{cartTotal}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              style={{ marginTop: "20px" }}
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
