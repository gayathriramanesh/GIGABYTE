import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import "./Card.css";

const CardComponent = () => {
  const images = [
    {
      id: "106",
      author: "Arvee Marie",
      download_url: "https://picsum.photos/id/106/2592/1728",
    },
    {
      id: "107",
      author: "Lukas Schweizer",
      download_url: "https://picsum.photos/id/107/5000/3333",
    },
    {
      id: "108",
      author: "Florian Klauer",
      download_url: "https://picsum.photos/id/108/2000/1333",
    },
    {
      id: "109",
      author: "Zwaddi",
      download_url: "https://picsum.photos/id/109/4287/2392",
    },
  ];

  return (
    <div className="card-wrapper">
        {images.map((value, index) => (
          <div className="single-card" key={index}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={value.download_url}
                  alt="Alt img"
                />
              </CardActionArea>
              <CardActions>
                <div className="card-button-wrapper">
                <Button className="card-button">View Details</Button>
                <Button className="card-button-second">Buy Now</Button>
                </div>
              </CardActions>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default CardComponent;
