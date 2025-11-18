import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 1. Import useSelector
import styles from './navbar.module.css';

const Navbar = () => {
  // 2. Get cart from state
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Brand/Logo */}
        <Link to="/" className={styles.brand}>
          E-Store
        </Link>

        {/* Search Bar (Placeholder) */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>Search</button>
        </div>

        {/* Nav Links (UPDATED) */}
        <div className={styles.navLinks}>
          <Link to="/products" className={styles.navLink}>
            Products
          </Link>
          {/* 3. Updated Cart Link */}
          <Link to="/cart" className={styles.navLink}>
            Cart
            {cartItems.length > 0 && (
              <span className={styles.cartBadge}>
                {cartItems.reduce((acc, current) => acc + current.qty, 0)}
              </span>
            )}
          </Link>
          <Link to="/login" className={styles.navLinkLogin}>
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;