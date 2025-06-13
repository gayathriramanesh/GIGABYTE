import { useState } from "react";
import axios from "axios";
import "./Form.css";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: "",
    mobile: "",
    email: ""
  });

  const handleInputChange = (index, value) => {
    const fieldNames = ["name", "city", "pincode", "mobile", "email"];
    const fieldName = fieldNames[index];
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleEnquiry = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://0.0.0.0:8000enquiry/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data.message); // "Enquiry added successfully"
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.detail || "Something went wrong while submitting the enquiry.";
      alert(JSON.stringify(msg));
    }
  };

  const textDets = [
    "Name",
    "City",
    "Enter Area name or Pincode",
    "Mobile",
    "Email",
  ];

  return (
    <div className="form-wrapper">
      <div className="text-container">
        {textDets.map((placeholder, index) => (
          <input
            key={index}
            className="text-box"
            type="text"
            placeholder={placeholder}
            value={Object.values(formData)[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <input
        type="button"
        value="Enquire"
        className="button-content"
        onClick={handleEnquiry}
      />
    </div>
  );
};

export default FormComponent;
