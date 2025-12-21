import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../store/slices/CartSlice';
import Message from './message';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  const [method, setMethod] = useState(paymentMethod || 'PayPal');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/shipping');
      return;
    }

    if (!shippingAddress?.address) {
      navigate('/shipping');
    }
  }, [userInfo, navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(method));
    navigate('/placeorder');
  };

  return (
    <div>
      <h1>Payment Method</h1>
      <Message>Select a payment method to continue.</Message>

      <form onSubmit={submitHandler}>
        <div style={{ marginTop: 12, marginBottom: 12 }}>
          <label style={{ fontWeight: 700 }}>
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked={method === 'PayPal'}
              onChange={(e) => setMethod(e.target.value)}
            />{' '}
            PayPal
          </label>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 700 }}>
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              checked={method === 'Card'}
              onChange={(e) => setMethod(e.target.value)}
            />{' '}
            Credit / Debit Card
          </label>
        </div>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default PaymentScreen;
