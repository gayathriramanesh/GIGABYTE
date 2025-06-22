import React,{useState} from "react";
import "./Addcard.css"
import Testimonials from "../Testimonials/Testimonials";

const AddCard = ({testimonials,setTestimonials}) =>{
  // const [fileupload,setFileUpload] = useState(null)
  
  // const [date,setDate] = useState(null)
  const [namechange,setNameChange] = useState('')
  const [stars,setStars] = useState('')
  const [file,setFile] = useState('')
  const nameChange = () =>{
    const name = Math.random().toString(36).substring(7)
    setNameChange(name)
    
  }
  const starsChange = (e) =>{
    setStars(e.target.value)
  }
  const addnewtestimonials = () =>{
    const id = testimonials.length ? (testimonials.length+1):1;
    setTestimonials((newtestimonial)=>[...newtestimonial,{
      "id" : id,
      "name":namechange,
      "rating": stars,
      "img": file
    }])

  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    addnewtestimonials();
    setNameChange('');
    setStars('');
    setFile('');
  }
  const uploadfile = (e) =>{
    setFile(URL.createObjectURL(e.target.files[0]));
  }
    return(
      <form>
        <div className="addcard">
         <input type = "file" onChange={uploadfile} accept="image/*" required/>
          <input type = "button" value="Change your name" onClick={nameChange} required ></input>
          {namechange}
          <input type = "text"  placeholder= "Enter the no of stars"  value = {stars} onChange = {starsChange} required>
          </input>
          {/* <input type = "date" value = "Choose the date" required >
          </input> */}
          <button type = "submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
        
    )
}
export default AddCard;