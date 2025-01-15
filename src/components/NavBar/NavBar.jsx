import React from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconList from "../IconList";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
const NavBar = () =>
 {   const navigate = useNavigate()
     const handleOnClick=() => {
       navigate("/abc")
}
    const navbar_values=[
    
        { "icon":<LocalPhoneIcon/>,"value":"9844057472",},
        { "icon":<MailIcon/>,"value":"sales@apcindia.co.in"},
        {"icon":<ShoppingCartIcon/>,"value":"Recently viewed products","onClick":handleOnClick},
        { "icon":<ShoppingCartIcon/>,"value":"View cart"}

    ]
    const navbar_values_one=[
        { "icon":<HomeIcon/>,"value":"HOME",},
        { "icon":<BusinessIcon/>,"value":"OFFICE"},
    ]
    return(
        <div className="navbar-wrapper">
             <div className="button-wrapper-main">
             {
                    navbar_values_one.map((value,index)=>(
                        <div className="home-button" key={index}>
                          <span>{value.icon}</span>
                          <span>{value.value}</span>
                        </div>
                    ))
                } 
             </div>
            <div className="navbar">
               { navbar_values.map(item=>(
                 <IconList Icon={item.icon} Value={item.value} OnClick={item.onClick?item.onClick:()=>{}}/>
               )
             )}
            </div>
        </div>
   
    
);
   
}
export {NavBar};