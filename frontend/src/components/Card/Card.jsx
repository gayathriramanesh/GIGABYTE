import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import axios from "axios";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const CardComponent = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const limit = 4;
  const handleViewPDP = async(productId) => {
    try{
      const res = await axios.post(
  "http://localhost:9000/recently_viewed/add_recently_viewed_product",
  {
    product_id: productId,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

      
    }
    catch (error) {
      console.error("Failed to add to recently viewed:", error);
      alert("Failed to add to recently viewed.");
    }
    navigate('/product/' + productId);
  };
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/products?skip=${page * limit}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
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

  useEffect(() => {
    setProducts([]); 
    fetchProducts();
  }, [page]);

  return (
    <>
      <div className="card-wrapper">
        {products.map((product) => (
          <div className="single-card" key={product.pid}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image_url}
                  alt={product.product_name}
                />
              </CardActionArea>
              <CardActions>
                <div className="card-button-wrapper">
                  <Button className="card-button" onClick={() => handleViewPDP(product.pid)}>View Details</Button>
                  <Button
                    className="card-button-second"
                    onClick={() => handleAddToCart(product.pid)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>

      <div className="pagination-controls" style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span style={{ margin: "0 15px" }}>Page {page + 1}</span>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={products.length < limit}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default CardComponent;
