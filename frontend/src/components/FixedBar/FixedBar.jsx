import React from "react";
import { SearchBar } from "../SearchBar";
import "./FixedBar.css";
import { useContext } from "react";
import { themeContext } from "../Contexts/contexts";
const FixedBar = () =>
{  const {theme, setTheme} = useContext(themeContext);
  return(
   <div className="fixedbar-wrapper-main">
    <div class="sliding-text-container">
        <div class="sliding-text">Get upto 20% cashback and more. Whatsapp or SMS your Name, Tel No, and Full Address to 9876543219 for free home-office delivery.
        </div>
    </div>
    <div className="fixedbar-wrapper">
     <SearchBar/>
   </div>
   <button onClick={()=>setTheme(theme==='light'?'dark':'light')}> Toggle theme</button>
   </div>
);
}

export {FixedBar};