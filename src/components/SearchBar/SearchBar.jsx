import React from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = () =>
{   return(
   <div className="searchbar-wrapper">
     <div className="searchbar">
        <input className="searchbox" type="text" placeholder="Search products..."></input>
        <button className="search-button"><SearchIcon /></button>
       </div>
   </div>
    


);
}

export {SearchBar};