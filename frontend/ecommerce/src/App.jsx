import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import styles from './App.module.css'; // Import CSS Module

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Navbar />

      {/* Main content area */}
      <main className={styles.mainContent}>
        {/* Renders the active route (e.g., HomeScreen) */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;