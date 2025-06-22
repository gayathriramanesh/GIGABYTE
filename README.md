# 🧺 GigaByte - Online Flea Market

A full-stack marketplace platform where sellers can upload products and buyers can browse, add to cart, and place orders.
Built with **FastAPI**, **React**, **PostgreSQL**, and **Redis**.

---

## 🚀 Features

- 🛒 Buyer-side cart and checkout
- 📦 Seller product uploads
- 🔒 JWT Authentication & Role-based access
- 🕵️ Recently viewed product tracking
- 📬 Email confirmation on enquiries

---

## 🔧 Getting Started Locally

### 1. Clone the Repository

1. git clone https://github.com/yourusername/gigabyte.git

2. Backend Setup (FastAPI + PostgreSQL + Redis)
--cd backend
--pip3 install -r requirements.txt
--ENV_MODE=staging uvicorn main:app --port 8000   
Ensure PostgreSQL is running and Redis is either local or on Upstash/Redis Cloud.
-- Create a .env file with the required environment variables.
   
3. Frontend Setup (React)
--cd frontend
--npm install
--npm run dev
--Set VITE_API_URL=http://localhost:8000 in a .env file inside frontend/.

##For full project demo,
🌐 Visit the Deployed App
▶️ https://gigabyte.onrender.com

OR (👀)

👽WATCH THIS DEMO VIDEO
https://drive.google.com/file/d/1hd88Xr0xsFOctkkg2uxy-q0D2CHhwTmv/view?usp=sharing
