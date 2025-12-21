import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/slices/CartSlice';

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div>
      <h1>Shipping</h1>
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', fontWeight: 700 }}>Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', fontWeight: 700 }}>City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', fontWeight: 700 }}>Postal Code</label>
          <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 700 }}>Country</label>
          <input value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default ShippingScreen;
