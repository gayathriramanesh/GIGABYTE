import { useState } from 'react';
import './ProductForm.css'; 

const ProductForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [filestatus, setfileStatus] = useState('');
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({
    pid:'',
    imageUrl: '',
    name: '',
    price: '',
    description: '',
  });
  const cloudName = 'ded2ivblf'; 
  const uploadPreset = 'product_image'; 
  const handleUpload = async () => {
    if (!file) {
      setfileStatus('Please select an image file first.');
      return;
    }
  const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
  try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.secure_url);
      setfileStatus('Image uploaded successfully!');
    } catch (err) {
      alert(err);
      setfileStatus('Upload failed.');
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('imageUrl', formState.imageUrl);
    formData.append('name', formState.name);
    formData.append('price', formState.price);
    formData.append('description', formState.description);
    formData.append('pid', formState.pid);
    formData.append('imageUrl', imageUrl);

    try {
      const response = await fetch(`${API_URL}/products/add_product`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.ok) {
        setStatus('Product added successfully!');
        setFormState({
          imageUrl: '',
          name: '',
          price: '',
          description: '',
          pid: ''
        });
        setImageUrl('');
      } else {
        setStatus('Failed to add product.');

      }
    } catch (error) {
      alert(error);
      setStatus('Error submitting form.');
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
         <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </label>
         <label>
          Product ID:
          <input
            type="text"
            name="pid"
            value={formState.pid}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          MRP:
          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: 10 }}
      />
      <br />
      <button type= "button" onClick={handleUpload} style={{ marginBottom: 10 }}>Upload</button>
      <p>{filestatus}</p>
      {imageUrl && (
        <div>
          <p>Image Preview:</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: '100%' }} />
        </div>)}
        </label>
        <button type="submit">Add Product</button>
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default ProductForm;
