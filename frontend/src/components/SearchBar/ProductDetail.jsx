import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);

  
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/${pid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      setProduct(res.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [pid]);

  if (!product) return <h3>Loading...</h3>;

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.image_url}
          alt={product.product_name}
        />
        <CardContent>
          <Typography variant="h5">{product.product_name}</Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            ₹{product.price}
          </Typography>
          <Typography variant="body2" style={{ marginTop: "10px" }}>
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
