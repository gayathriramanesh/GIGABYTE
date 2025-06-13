import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode:"" ,
    payment_method: ""
  });

  useEffect(() => {
    fetchCart();
  }, []);
  const handleCheckout = async()=>
    {
      try {
      const response = await axios.post(
        "http://0.0.0.0:8000/order/checkout",
        {
           phone: formData.phone,
        address: formData.address,
        pincode: Number(formData.pincode), 
        payment_method: formData.payment_method
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/order-status", { state: { success: true, order: response.data } });
      } else {
        navigate("/order-status", { state: { success: false } });
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      navigate("/order-status", { state: { success: false } });
    }
  };

 const fetchCart = async () => {
    try {
      const cartRes = await axios.get("http://0.0.0.0:8000/cart/view", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const cart = cartRes.data;

      const productDetails = await Promise.all(
        cart.cart_items.map((item) =>
          axios
            .get(`http://0.0.0.0:8000/products/filter?pid=${item.product_id}`, {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Grid container spacing={4} padding={4}>
      {/* Order Summary */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              🧾 Your Order
            </Typography>
            <Divider style={{ marginBottom: "15px" }} />
            {cartItems.map((item) => {
              const product = productsMap[item.product_id];
              if (!product) return null;

              return (
                <div key={product.pid} style={{ marginBottom: "10px" }}>
                    <img src={product.image_url} alt={product.product_name} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                  <Typography variant="subtitle1">
                    {product.product_name} × {item.quantity}
                  </Typography>
                  <Typography variant="body2">₹{product.price * item.quantity}</Typography>
                </div>
              );
            })}
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="h6">Total: ₹{cartTotal}</Typography>

            <FormControl component="fieldset" style={{ marginTop: "20px" }}>
              <FormLabel component="legend">💳 Payment Method</FormLabel>
              <RadioGroup
                name="payment_method"
                value={formData.payment_method}
                onChange={handleInputChange}
              >
                <FormControlLabel value="gpay" control={<Radio />} label="Google Pay" />
                <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Customer Info */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              👤 Customer Information
            </Typography>
            <Divider style={{ marginBottom: "15px" }} />
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Phone"
              type="tel"
              fullWidth
              margin="normal"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Billing Address"
              fullWidth
              margin="normal"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              multiline
              rows={3}
              required
            />
            <TextField
              label="Pincode"
              fullWidth
              margin="normal"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              style={{ marginTop: "20px" }}
              onClick={handleCheckout}
            >
              Place Order
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Checkout;
