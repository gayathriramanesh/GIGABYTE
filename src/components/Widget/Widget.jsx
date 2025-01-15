import React from "react";
import "./Widget.css";

const Widget = (props) =>{
return(
    <div className="widget-container">
          <div className={props?.blink ? "widget-child-animate" : "widget-child-container" } >
          <h3>{props?.text1}</h3>
          <h3>{props?.text2}</h3>
        </div>
        </div>
);
}
export default Widget;