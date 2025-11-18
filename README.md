# MERN E-Commerce Store

## A fully functional, full-stack e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js).

### Description

E-Store is a modern e-commerce application designed to provide a seamless shopping experience. It features a comprehensive product catalog, a fully functional shopping cart, user authentication, and a dynamic search system. The application demonstrates a robust full-stack architecture, handling data flow from a MongoDB database through a Node.js/Express backend to a responsive React frontend utilizing Redux Toolkit for state management.

This project serves as a capstone demonstration of full-stack web development skills, including RESTful API design, database modeling, authentication flows, and modern frontend practices.

Key Features

Product Catalog: Browse diverse products with dynamic pagination.

Search Functionality: Find products instantly using the search bar.

Product Details: View high-quality images, descriptions, prices, and stock status.

Shopping Cart: Add items, adjust quantities, and see real-time subtotal calculations.

User Authentication: Secure Sign Up and Login system using JWT (JSON Web Tokens).

Responsive Design: Fully optimized for desktop, tablet, and mobile devices using CSS Modules.

Admin Seeding: Scripts to automatically populate the database with sample data.

Tech Stack

Frontend:

React: UI library for building the interface.

Redux Toolkit (RTK Query): For efficient global state management and data fetching.

React Router: For seamless client-side navigation.

Vite: Next-generation frontend tooling.

CSS Modules: For scoped, maintainable styling.

Backend:

Node.js: JavaScript runtime environment.

Express.js: Web application framework for the API.

MongoDB: NoSQL database for flexible data storage.

Mongoose: ODM library for MongoDB schema validation.

JWT: For secure user authentication via HTTP-only cookies.

Setup Instructions

Follow these steps to run the project locally on your machine.

Prerequisites

Node.js (v14 or higher)

MongoDB (Local or Atlas URI)

1. Clone the Repository

git clone
cd mern-ecommerce-store

2. Install Dependencies

Install dependencies for both backend and frontend.

# Install backend dependencies

cd backend
npm install

# Install frontend dependencies

cd ../frontend
npm install

3. Configure Environment Variables

Create a .env file in the backend folder and add the following config:

NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

4. Seed the Database

Populate your database with initial sample data (Users and Products).

# Run this from the 'backend' directory

npm run data:import

Note: This creates a default admin user: admin@example.com / 123456

5. Run the Application

You need to run both the backend and frontend servers.

Option A: Run separately (Two Terminals)

# Terminal 1 (Backend)

cd backend
npm run dev

# Terminal 2 (Frontend)

cd frontend
npm run dev

Open your browser to http://localhost:5173.

API Documentation

The backend exposes the following RESTful endpoints:

Method

Endpoint

Description

Access

POST

/api/users/login

Authenticate user & get token

Public

POST

/api/users/register

Register a new user

Public

POST

/api/users/logout

Logout user & clear cookie

Private

GET

/api/users/profile

Get user profile

Private

GET

/api/products

Fetch all products (supports search)

Public

GET

/api/products/:id

Fetch single product details

Public

Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

License

This project is MIT licensed.
