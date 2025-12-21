import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetOrderDetailsQuery } from '../store/slices/ordersApiSlice';
import Loader from './loader';
import Message from './message';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <h1>Order {orderId}</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 18 }}>
          <div>
            <h2>Shipping</h2>
            <p>
              {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>

            <h2>Payment</h2>
            <p>{order.paymentMethod}</p>

            <h2>Items</h2>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item._id} style={{ marginBottom: 10 }}>
                  <Link to={`/product/${item._id}`}>{item.name}</Link> — {item.qty} x ${item.price}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ border: '1px solid rgba(229,231,235,0.9)', borderRadius: 12, padding: 14 }}>
            <h2>Summary</h2>
            <p>Items: ${Number(order.itemsPrice).toFixed(2)}</p>
            <p>Shipping: ${Number(order.shippingPrice).toFixed(2)}</p>
            <p>Tax: ${Number(order.taxPrice).toFixed(2)}</p>
            <p style={{ fontWeight: 900 }}>Total: ${Number(order.totalPrice).toFixed(2)}</p>

            <p style={{ marginTop: 12 }}>
              Status: {order.isPaid ? `Paid (${new Date(order.paidAt).toLocaleDateString()})` : 'Not paid'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderScreen;
