import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/usersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import Loader from '../components/loader';
import Message from '../components/message';
import FormContainer from '../components/FormContainer';
import styles from './login.module.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use the login mutation hook
  const [login, { isLoading, error }] = useLoginMutation();

  // Get user info from auth state
  const { userInfo } = useSelector((state) => state.auth);

  // Check for redirect in URL
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // If user is already logged in, redirect them
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Call the login mutation
      const res = await login({ email, password }).unwrap();
      // Dispatch setCredentials to update state
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      // Error is handled by the 'error' variable from the hook
    }
  };

  return (
    <FormContainer>
      <h1 className={styles.title}>Sign In</h1>
      {error && <Message variant="danger">{error?.data?.message || error.error}</Message>}
      
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        {isLoading && <Loader />}
      </form>

      <div className={styles.redirectLink}>
        New Customer?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className={styles.link}>
          Register
        </Link>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;