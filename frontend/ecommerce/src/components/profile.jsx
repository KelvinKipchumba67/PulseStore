import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMyOrdersQuery } from '../store/slices/ordersApiSlice';
import Loader from './loader';
import Message from './message';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery(undefined, {
    skip: !userInfo,
  });

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/profile');
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <h1>Profile</h1>

      {userInfo ? (
        <div style={{ marginBottom: 18 }}>
          <p style={{ margin: 0 }}>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Email:</strong> {userInfo.email}
          </p>
        </div>
      ) : null}

      <h2>My Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : !orders?.length ? (
        <Message>You have no orders yet.</Message>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>ID</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Date</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Total</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Paid</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{order._id}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                  </td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>${Number(order.totalPrice).toFixed(2)}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{order.isPaid ? 'Yes' : 'No'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
