import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css"; 

const ImageCarousel = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("http://0.0.0.0:8000/products/product",{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
                const data = await response.json();
                const filtered = data.filter(item => item.image_url); 
                setImages(filtered);
            } catch (error) {
                console.error("Failed to load images:", error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="carousel-container">
            <Carousel infiniteLoop interval={60} showThumbs={false} dynamicHeight={true}>
                {images.map((product, index) => (
                    <div key={index} className="img-carousel">
                        <img src={product.image_url} alt={product.product_name || `Product ${index}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
