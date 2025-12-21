import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import styles from './App.module.css'; // Import CSS Module

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  const incrementCartCount = useCallback(() => {
    setCartCount((current) => current + 1);
  }, []);

  return (
    <div className={styles.appContainer}>
      <Navbar cartCount={cartCount} />

      {/* Main content area */}
      <main className={styles.mainContent}>
        {/* Renders the active route (e.g., HomeScreen) */}
        <Outlet context={{ cartCount, incrementCartCount }} />
      </main>

      <Footer />
    </div>
  );
};

export default App;