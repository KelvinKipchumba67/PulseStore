import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/CartSlice';
import Message from '../components/message';
import styles from './cart.module.css';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the cart state from Redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Handler for changing quantity
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  // Handler for removing item
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handler for proceeding to checkout
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping'); // We'll build this next
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div className={styles.cartLayout}>
        {/* Column 1: Cart Items */}
        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty. <Link to="/" className={styles.goBackLink}>Go Back</Link>
            </Message>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item._id} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <Link
                      to={`/product/${item._id}`}
                      className={styles.itemName}
                    >
                      {item.name}
                    </Link>
                    <span className={styles.itemPrice}>${item.price}</span>
                  </div>
                  <div className={styles.itemActions}>
                    <select
                      className={styles.qtySelect}
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className={styles.deleteButton}
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Column 2: Cart Summary */}
        {cartItems.length > 0 && (
          <div className={styles.cartSummary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </span>
              <strong>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </strong>
            </div>
            <button
              className={styles.checkoutButton}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;