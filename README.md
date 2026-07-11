# ShopBindas
#### ShopBindas is a comprehensive, full-stack e-commerce platform built using the MERN stack. The project features a customer-facing storefront, a robust RESTful backend API, and a dedicated administrative dashboard for seamless inventory and order management.
#### Designed with a clean MVC (Model-View-Controller) architectural pattern, the application ensures high scalability and maintainability across its distinct services.

## Project Structure
The repository is organized into a monorepo containing three primary directories:

*   **`frontend/`**: The customer-facing web application built with React and Vite.
*   **`admin/`**: A secure dashboard for store administrators to manage the platform.
*   **`backend/`**: The Node.js and Express server handling business logic, database interactions, and API requests.

## Key Features

### Backend API
*   **Secure Authentication**: JWT-based authentication via custom middleware (`adminAuth.js`, `auth.js`).
*   **Modular Database Models**: Structured MongoDB schemas for Users, Products, and Orders (`userModel.js`, `productModel.js`, `orderModel.js`).
*   **Media Management**: Integration with Cloudinary and Multer for efficient image uploading and storage.
*   **Dedicated Controllers**: Segregated logic for cart management, order processing, product handling, and user accounts.

  ### Admin Dashboard
*   **Product Management**: Interface to easily add new merchandise and view the current product list (`Add.jsx`, `List.jsx`).
*   **Order Fulfillment**: Dedicated orders page to track and update customer purchases (`Orders.jsx`).

  ### Frontend (Customer Store)
*   **Shopping Cart**: Intuitive cart management powered by backend integration.
*   **Responsive UI**: Fast and dynamic user interfaces bundled with Vite.

---

##  Tech Stack

*   **Frontend & Admin**: React.js, Vite
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB, Mongoose
*   **File Storage**: Cloudinary, Multer
*   **Authentication**: JSON Web Tokens (JWT)

  ## 🚀 Getting Started

To run this project locally, you will need Node.js and MongoDB installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Ayush94Kumar/ShopBindas.git
cd ShopBindas

# ⚙️ Environment Setup

Create a `.env` file inside the `backend/` directory and add the following environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
```

---

# 🚀 Installation & Running the Project

Since this project is organized as a monorepo, you'll need to run the **backend**, **frontend**, and **admin** applications separately.

## 1️⃣ Backend

```bash
cd backend
npm install
npm start
```

---

## 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 3️⃣ Admin Dashboard

```bash
cd admin
npm install
npm run dev
```

---

# 📌 Notes

- Ensure MongoDB is running or use a MongoDB Atlas connection string.
- Configure all required environment variables before starting the backend.
- Open the frontend and admin URLs shown in the terminal after running `npm run dev`.
  
