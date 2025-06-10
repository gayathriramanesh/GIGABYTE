import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Registration/Register.jsx';
import ProductForm from './components/Login/ProductForm.jsx';
import ProductDetail from './components/SearchBar/ProductDetail.jsx';
import CartComponent from './components/Cart/cart.jsx';
import RecentlyViewed from './components/Recently Viewed/Recently_viewed.jsx';
import Checkout from './components/Checkout/Checkout.jsx';
import OrderStatus from "./components/OrderStatus/OrderStatus.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="302216800847-4173oh18t130nrloodi7bcoftsqpo70k.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProductForm />} />
        <Route path="/product/:pid" element={<ProductDetail />} />
        <Route path="/cart" element={<CartComponent />} />
        <Route path="/recently_viewed" element={<RecentlyViewed />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
