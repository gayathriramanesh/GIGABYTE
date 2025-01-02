import { Routes, Route } from "react-router-dom"
import './App.css'
import HomePage from './components/HomePage'
import { NavBar } from './components/NavBar/NavBar'
import ImageCarousel from "./components/Carousel/Carousel"
import { SearchBar } from "./components/SearchBar"
import Widget from "./components/Widget/Widget"
import CardComponent from "./components/Card/Card"
function App() {

  return (
    <div className='wrapper-container'>
      <NavBar/>
        <hr></hr>
      <Routes>
       <Route path="/abc" element={ <HomePage/> } />
      </Routes>
      <SearchBar/>
      <ImageCarousel/>
      <Widget/>
      <CardComponent/>
    </div>
  )
}

export default App
