import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconList from "../IconList";
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
const NavBar = () =>
 {   const navigate = useNavigate()

    const navbar_values=[
    
        { "icon":<LocalPhoneIcon/>,"value":"9876543219"},
        { "icon":<MailIcon/>,"value":"gayathriramanesh2001@gmail.com"},
        {"icon":<ShoppingCartIcon/>,"value":"Recently viewed products","onClick":()=>{navigate("/recently_viewed/")}},
        { "icon":<ShoppingCartIcon/>,"value":"View cart","onClick":()=>{navigate("/cart")}},

    ]
    const navbar_values_one=[
        { "icon":<HomeIcon/>,"value":"HOME"}
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