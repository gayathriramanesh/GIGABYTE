import React from "react";
import FormComponent from "../Form/Form";
import CardComponent from "../Card/Card";
import "./MainPage.css";

const MainPage = () => {
    return(
       <div className="Mainpage-wrapper">
           <CardComponent/>
           <FormComponent/>
       </div>
    );
}

export default MainPage;