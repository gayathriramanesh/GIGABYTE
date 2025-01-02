import React from "react";
import "./IconList.css"

const IconList = (props)=>{
    return(
        <div className="iconlist-wrapper" onClick={props.OnClick}>
                <div className="icon-item">{props.Icon}</div>
                <div>{props.Value}</div>
    
        </div>
    );
}
export default IconList;