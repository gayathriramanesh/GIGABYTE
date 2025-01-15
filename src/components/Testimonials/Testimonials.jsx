import React from "react";
import "./Testimonials.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Testimonials = () => {
   const testimonials = [
    {
      "id":1,
      "name": "abc",
      "rating": 5,
      "date" : "01/01/2024",
      "img": "https://picsum.photos/id/26/4209/2769",
      "feedback" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis ante eu nisi tempor pretium. Morbi finibus aliquet risus ut rhoncus."
    },
    {
        "id":2,
        "name": "def",
        "rating": 4,
        "date" : "02/01/2024",
        "img": "https://picsum.photos/id/29/4000/2670",
        "feedback" : "Donec quis ex sit amet quam posuere lacinia et at nulla."
      },
      {
        "id":3,
        "name": "ghi",
        "rating": 3,
        "date" : "03/01/2024",
        "img": "https://picsum.photos/id/28/4928/3264",
        "feedback" : "Curabitur justo ex, dapibus sit amet sapien ac, lacinia dapibus eros. Duis odio massa, eleifend ut sem tincidunt, ullas"
      },
      {
        "id":4,
        "name": "jkl",
        "rating": 2,
        "date" : "04/01/2024",
        "img": "https://picsum.photos/id/27/3264/1836",
        "feedback" : "Pellentesque diam augue, blandit nec mollis non, vulputate et neque. Sed ornare tincidunt felis, et tempor lorem efc."
      },
      {
        "id":5,
        "name": "mno",
        "rating": 5,
        "date" : "05/01/2024",
        "img": "https://picsum.photos/id/26/4209/2769",
        "feedback" : "Vestibulum vel pharetra libero, sit amet euismod urna. Proin in elit lobortis, aliquam ex eu, sollicitudi leo."
      },
      {
        "id":6,
        "name": "abc",
        "rating": 5,
        "date" : "01/01/2024",
        "img": "https://picsum.photos/id/27/3264/1836",
        "feedback" : "Suspendisse id semper orci. Donec posuere ac sapien vel hendrerit. Curabitur at nisi ex. Mauris luctus, duift."
      },
   ]
   return(
 <div className="carousel-wrapper-testi">
    <h2 style={{textAlign:"center"}}>Customer Testimonials</h2>
   <Carousel showThumbs={true} 
        showStatus={true} 
        infiniteLoop={true} 
        centerMode={true} // Center the cards
         centerSlidePercentage={20} // Show 3 cards (33% width each)
         emulateTouch={true} >
    {testimonials.map((value, index) => (
    <div className="card-wrapper-testi">
     <div className="card-container-testi">
        <div className="single-card-testi" key={index}>
            <Card variant="outlined">
              <CardContent>
               <div className="top-content">
                <CardMedia
                component="img"
                image={value.img}
                alt="Alt img"
                className="img-display"
              />
                <div className="text-content">
                    {value.name}
                    <div style={{display:'flex'}}>
                    {
                         Array.from({ length: value.rating }).map((_, starIndex) => (
                          <span className="">
                             <StarIcon key={starIndex} />
                          </span>
                          
                    ))
                     }
                    </div>
                     
                    {value.date}
                </div>
                </div>
                <hr/>
              <div className="feedback-content">
                 {value.feedback}
              </div>
              </CardContent>
          </Card> 
        </div>
    </div>
   </div>
  
))}
 </Carousel>
  </div>
   )
}

export default Testimonials;
