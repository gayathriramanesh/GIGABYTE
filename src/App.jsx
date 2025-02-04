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
function App() {
  const [theme,setTheme] = useState('light')
  return (
    <div className='wrapper-container' style={{backgroundColor: theme==='light'?"#fff" : "#333", color: theme === "light" ? "#000" : "#fff" }}>
      <themeContext.Provider value={{theme,setTheme}}>
      <NavBar/>
      <Routes>
       <Route path="/abc" element={ <HomePage/> } />
      </Routes>
      <hr></hr>
      <FixedBar/>
      <ImageCarousel/>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
      <Widget blink = {false} text1={"Home/Villas/Soho/SME"} text2={"1.5 kVa - 1200 Watts Combo Pack"}/>
      <Widget blink = {true} text1 ={"Enter Details below and get Rs. 4,000/- upto Rs. 9,000/- OFF"}/>
      </div>
      <MainPage/>
      <Testimonials/>
      <hr></hr>
      <FixedFooter/>
      </themeContext.Provider>
    </div>
  )
}

export default App
