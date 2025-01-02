import React from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconList from "../IconList";
import { Link } from "react-router-dom";
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
    return(
    <div className="navbar">
       { navbar_values.map(item=>(
            <IconList Icon={item.icon} Value={item.value} OnClick={item.onClick?item.onClick:()=>{}}/>
        )
    )}
    </div>
);
   
}
export {NavBar};