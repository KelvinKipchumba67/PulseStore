import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux'; // <-- 1. IMPORT THE PROVIDER
import { store } from './store/store.js'; // <-- 2. IMPORT YOUR STORE
import App from './App.jsx';
import './index.css';

// Import all your screen components
import HomeScreen from './components/home.jsx';
import ProductScreen from './components/products.jsx';
import CartScreen from './components/cartScreen.jsx';
import LoginScreen from './components/login.jsx';
import ProductsScreen from './components/products.jsx';
import RegisterScreen from './components/register.jsx';

// --- Define Routes ---
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Route>
  )
);

// --- Render the App ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 3. WRApAPP IN THE PROVIDER */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);