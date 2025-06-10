import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import './App.css'
import HomePage from './components/HomePage'
import ImageCarousel from "./components/Carousel/Carousel"
import { FixedBar } from "./components/FixedBar"
import Widget from "./components/Widget/Widget"
import { NavBar } from "./components/NavBar/NavBar"
import MainPage from "./components/MainPage/MainPage"
import Testimonials from "./components/Testimonials/Testimonials"
import { FixedFooter } from "./components/FixedFooter"
import { themeContext } from "./components/Contexts/contexts"
import { useState } from "react"
import ProductForm from "./components/Login/ProductForm"

function App() {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const role = params.get("role");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <div
      className='wrapper-container'
      style={{
        backgroundColor: theme === 'light' ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff"
      }}
    >
      <themeContext.Provider value={{ theme, setTheme }}>
        <NavBar />
        <hr />
        <FixedBar />
        <ImageCarousel />
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Widget blink={false} text1={"Branded Shoes, Watches and Clutches"} text2={"Lowest Price Guarantee"} />
          <Widget blink={true} text1={"Enter Details below and have a chance of winning up to 20% cashback"} />
        </div>
        <MainPage />
        {/* <Testimonials /> */}
        <hr />
        <FixedFooter />
      </themeContext.Provider>
    </div>
  );
}

export default App;
