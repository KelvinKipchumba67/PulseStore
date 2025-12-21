import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../store/slices/ordersApiSlice';
import { clearCart } from '../store/slices/CartSlice';
import Loader from './loader';
import Message from './message';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const { cartItems, shippingAddress, paymentMethod } = cart;

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/shipping');
      return;
    }
    if (!shippingAddress?.address) navigate('/shipping');
    if (!paymentMethod) navigate('/payment');
    if (!cartItems?.length) navigate('/cart');
  }, [userInfo, navigate, shippingAddress, paymentMethod, cartItems]);

  const placeOrderHandler = async () => {
    try {
      const order = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }).unwrap();

      dispatch(clearCart());
      navigate(`/order/${order._id}`);
    } catch (e) {
      // handled by error
    }
  };

  return (
    <div>
      <h1>Place Order</h1>

      {error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 18 }}>
        <div>
          <h2>Shipping</h2>
          <p>
            {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
          </p>

          <h2>Payment</h2>
          <p>{paymentMethod}</p>

          <h2>Items</h2>
          {cartItems.length === 0 ? (
            <Message>Your cart is empty.</Message>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item._id} style={{ marginBottom: 10 }}>
                  <Link to={`/product/${item._id}`}>{item.name}</Link> — {item.qty} x ${item.price}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ border: '1px solid rgba(229,231,235,0.9)', borderRadius: 12, padding: 14 }}>
          <h2>Summary</h2>
          <p>Items: ${itemsPrice.toFixed(2)}</p>
          <p>Shipping: ${shippingPrice.toFixed(2)}</p>
          <p>Tax: ${taxPrice.toFixed(2)}</p>
          <p style={{ fontWeight: 900 }}>Total: ${totalPrice.toFixed(2)}</p>

          <button type="button" onClick={placeOrderHandler} disabled={isLoading || cartItems.length === 0}>
            Place Order
          </button>

          {isLoading ? <Loader /> : null}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
