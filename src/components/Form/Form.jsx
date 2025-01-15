import React from "react";
import "./Form.css";

const FormComponent = () => {
    const textDets = ["Name","City","Enter Area name or Pincode","Mobile","Email"]
    const radioDets = [
        {"id":1,
         "value":"1-2 hrs a day",
         "checked":true
        },
        {
         "id":2,
         "value":"2-3 hrs a day",
         "checked":false
        },
        {
         "id":3,
         "value":"3-4 hrs a day & more",
         "checked":false
        },
        {
          "id":4,
         "value":"Power cuts many times in a day",
         "checked":false
        }
    ]
    return(
      <div className="form-wrapper">
        <div className="text-container">
            {
              textDets.map((value,index) =>
                <input className="text-box" type = "text" placeholder = { value } key = {index}></input>
            )
            }
        </div>
        <p>How frequent do power cuts interrupt your daily life</p>
        <div className="radio-wrapper">
            {
                radioDets.map((src,index) =>
                 <div className="radio-content">
                 <input type="radio" name="radio-button" id={index} className="radio-button" checked={src.checked} ></input>
                 <label for={index}>{src.value}</label><br />
                 </div>
                 
                )
            }
        </div>
        <p>How soon are you planning your purchase?</p>
        <div className="dropdown-wrapper">
             <select name="time" id="cars" className="dropdown-content">
               <option value="Immediate">Immediate</option>
               <option value="3 months">3 months</option>
               <option value="6 months">6 months</option>
             </select>
        </div>
        <input type="button" value="Submit-Get your discount" className="button-content"></input>
      </div>
      
    );
}

export default FormComponent;
