import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import styles from './navbar.module.css';

const Navbar = ({ cartCount }) => {
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

  const derivedCartCount =
    typeof cartCount === 'number'
      ? cartCount
      : cartItems?.length
        ? cartItems.reduce((acc, current) => acc + current.qty, 0)
        : 0;

  const SearchIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const UserIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 21a8 8 0 1 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  const CartIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 6h15l-2 8H7L6 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Brand/Logo */}
        <Link to="/" className={styles.brand}>
          E-Store
        </Link>

        {/* Search Bar Form */}
        <form onSubmit={searchHandler} className={styles.searchForm} role="search">
          <div className={styles.searchField}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              className={styles.searchInput}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <button type="submit" className={styles.searchSubmit} aria-label="Search">
            <SearchIcon className={styles.searchSubmitIcon} />
          </button>
        </form>

        {/* Navigation Icons */}
        <div className={styles.navLinks}>
          {/* Cart Link with Badge */}
          <Link to="/cart" className={styles.iconButton} title="Cart" aria-label="Cart">
            <CartIcon className={styles.icon} />
            {derivedCartCount > 0 && (
              <span className={styles.badge} aria-label={`Cart items: ${derivedCartCount}`}>
                {derivedCartCount}
              </span>
            )}
          </Link>

          {/* Dynamic Auth Links */}
          {userInfo ? (
            <div className={styles.dropdown}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={styles.iconButton}
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                title={userInfo.name}
              >
                <UserIcon className={styles.icon} />
              </button>

              {dropdownOpen && (
                <div className={styles.dropdownMenu} role="menu">
                  <Link
                    to="/profile"
                    className={styles.dropdownItem}
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button onClick={logoutHandler} className={styles.dropdownItem} role="menuitem">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={styles.iconButton} title="Sign in" aria-label="Sign in">
              <UserIcon className={styles.icon} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;