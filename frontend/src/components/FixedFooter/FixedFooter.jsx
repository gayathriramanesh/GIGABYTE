import React from "react";
import "./FixedFooter.css";
const FixedFooter = () => {
    return(
      <div className="footer-wrapper">
         <div className="footer-text-wrapper">
          <p style={{ color:'#81B430'}}>Copyright © 2016 apcindia.co.in All Rights Reserved.</p>
          <p><a href="" style={{ color: ' #4b4b51'}}>Refer Disclaimer</a></p>
          <p><a href="" style={{ color: ' #4b4b51'}}>Report Abuse</a></p>
         </div>
         <div className="footer-img-wrapper">
           <img src = "https://cdn-icons-png.flaticon.com/512/6124/6124998.png"></img>
           <img src = "https://cdn-icons-png.flaticon.com/512/14082/14082959.png"></img>
           <img src= "https://cdn-icons-png.flaticon.com/512/349/349221.png"></img>
         </div>
        </div>
    );
}

export {FixedFooter};