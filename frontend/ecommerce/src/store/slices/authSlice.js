import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for existing user info
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer for setting user credentials
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Save user info to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // Reducer for logging out
    logout: (state) => {
      state.userInfo = null;
      // Remove user info from localStorage
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;