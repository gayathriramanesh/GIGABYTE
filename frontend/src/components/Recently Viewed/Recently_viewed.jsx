import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useLocation,useNavigate } from "react-router-dom";
import "../Card/Card.css"; 




const RecentlyViewed = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchRecentlyViewed();
  }, []);

  const fetchRecentlyViewed = async () => {
    try {
      const res = await axios.get("http://localhost:9000/recently_viewed/", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
      }});

      const items = res.data;
      setRecentItems(items);

      const productDetailPromises = items.map(item =>
        axios.get(`http://localhost:9000/products/filter?pid=${item.pid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(res => res.data[0])
      );

      const results = await Promise.all(productDetailPromises);
      setProducts(results);
    } catch (error) {
      console.error("Error fetching recently viewed items:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
          const res = await axios.post(
      "http://localhost:9000/cart/add",
      {
        product_id: productId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    
          console.log("Product added to cart:", res.data);
          alert("Product added to cart!");
        } catch (error) {
          console.error("Failed to add to cart:", error);
          alert("Failed to add to cart.");
        }
  };

  return (
    <div className="card-wrapper">
      <h2>Recently Viewed Products</h2>
      {products.length === 0 ? (
        <Typography>No recently viewed products.</Typography>
      ) : (
        products.map(product => (
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
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleAddToCart(product.pid)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentlyViewed;
