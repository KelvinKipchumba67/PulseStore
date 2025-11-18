import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import styles from './navbar.module.css';

const Navbar = () => {
  // Get data from Redux state
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for UI
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  // Handler for logging out
  const logoutHandler = async () => {
    try {
      // We will add the API call for logout later
      dispatch(logout());
      navigate('/login');
      setDropdownOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Handler for submitting search
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword(''); // Clear the search bar
    } else {
      navigate('/');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Brand/Logo */}
        <Link to="/" className={styles.brand}>
          E-Store
        </Link>

        {/* Search Bar Form */}
        <form onSubmit={searchHandler} className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link to="/products" className={styles.navLink}>
            Products
          </Link>
          
          {/* Cart Link with Badge */}
          <Link to="/cart" className={styles.navLink}>
            Cart
            {cartItems.length > 0 && (
              <span className={styles.cartBadge}>
                {cartItems.reduce((acc, current) => acc + current.qty, 0)}
              </span>
            )}
          </Link>

          {/* Dynamic Auth Links */}
          {userInfo ? (
            <div className={styles.dropdown}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={styles.dropdownToggle}
              >
                {userInfo.name}
                <span className={styles.arrow}>{dropdownOpen ? '▲' : '▼'}</span>
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link
                    to="/profile"
                    className={styles.dropdownItem}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className={styles.dropdownItem}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={styles.navLinkLogin}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;