import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css"; 

const ImageCarousel = () => {
    const images = [
        {
            "id": "0",
            "author": "Alejandro Escamilla",
            "width": 5000,
            "height": 3333,
            "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
            "download_url": "https://picsum.photos/id/0/5000/3333"
          },
          {
            "id": "1",
            "author": "Alejandro Escamilla",
            "width": 5000,
            "height": 3333,
            "url": "https://unsplash.com/photos/LNRyGwIJr5c",
            "download_url": "https://picsum.photos/id/1/5000/3333"
          },
          {
            "id": "2",
            "author": "Alejandro Escamilla",
            "width": 5000,
            "height": 3333,
            "url": "https://unsplash.com/photos/N7XodRrbzS0",
            "download_url": "https://picsum.photos/id/2/5000/3333"
          }
    ];
  
    return (
    <div className="carousel-container">
       <Carousel infiniteLoop interval={60} showThumbs={false} >
        {images.map((src, index) => (
          <div key={index}>
            <img src={src.download_url} alt={src.author}/>
          </div>
        ))}
      </Carousel>
    </div>
     
    );
  };
  
  export default ImageCarousel;


