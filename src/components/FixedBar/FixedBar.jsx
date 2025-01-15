import React from "react";
import { SearchBar } from "../SearchBar";
import "./FixedBar.css";
const FixedBar = () =>
{   return(
   <div className="fixedbar-wrapper-main">
    <div className="moving-text-wrapper">
      <p className="moving-text">Save Rs. 23,900/- up to 39% and more. Whatsapp or SMS your Name, Tel No, and Full Address to 9844057472 for free home-office delivery. Promotional Website by WISE, Bangalore. India.</p>
    </div>
    <div className="fixedbar-wrapper">
     <SearchBar/>
   </div>
   </div>
);
}

export {FixedBar};