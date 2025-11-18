import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../store/slices/usersApiSlice'; // <-- Use new hook
import { setCredentials } from '../store/slices/authSlice';
import Loader from '../components/loader';
import Message from '../components/message';
import FormContainer from '../components/FormContainer';
import styles from './login.module.css'; // We can reuse the login styles

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // For client-side errors

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use the register mutation hook
  const [register, { isLoading, error }] = useRegisterMutation();

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
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(''); // Clear any previous error
      try {
        // Call the register mutation
        const res = await register({ name, email, password }).unwrap();
        // Dispatch setCredentials to update state and log user in
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        // API error is handled by the 'error' variable from the hook
      }
    }
  };

  return (
    <FormContainer>
      <h1 className={styles.title}>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error?.data?.message || error.error}</Message>}
      
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            className={styles.input}
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className={styles.input}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {isLoading && <Loader />}
      </form>

      <div className={styles.redirectLink}>
        Already have an account?{' '}
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className={styles.link}>
          Login
        </Link>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;