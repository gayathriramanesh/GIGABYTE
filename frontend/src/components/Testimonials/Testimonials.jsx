import React,{useEffect, useState} from "react";
import "./Testimonials.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { Carousel } from 'react-responsive-carousel';
import AddIcon from '@mui/icons-material/Add';
import {AddCard} from "../AddCard"
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Testimonials = () => {
   const [testimonials,setTestimonials] = useState([
    {
      "id":1,
      "name": "abc",
      "rating": 5,
      "date" : "01/01/2024",
      "img": "https://picsum.photos/id/26/4209/2769",
      "feedback" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis ante eu nisi tempor pretium. Morbi finibus aliquet risus ut rhoncus."
    }
   ])
   const [addcard,setAddCard] = useState(false)
   //loads from the localstorage whenever page re-renders or the components mount
   useEffect( () =>{
    const testi = localStorage.getItem("testimonials");
    if(testi)
    {
      setTestimonials(JSON.parse(testi));
    }
   },[]);

  // saves this in the localstorage whenever the state changes
   useEffect (() =>{
     localStorage.setItem("testimonials", JSON.stringify(testimonials));
   },[testimonials]);
   return(
 <div className="carousel-wrapper-testi">
   <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
  <h2 style={{ flex: 1, textAlign: "center" }}>Customer Testimonials</h2>
  <AddIcon style={{ position: "absolute", right: 0 }} onClick={ () => setAddCard(!addcard)} />
</div>
{addcard && <div className="addcard-wrapper">
       { <AddCard testimonials={testimonials} setTestimonials={setTestimonials}/>} 
   </div>}

   <Carousel showThumbs={true} 
        showStatus={true} 
        infiniteLoop={true}  
         emulateTouch={true} >
     
    { 
    testimonials.map((value, index) => (
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
  
))}
 </Carousel>
  </div>
   )
}

export default Testimonials;
