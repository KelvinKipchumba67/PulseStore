import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
// This import needs the "export default" from cartSlice.js
import cartSliceReducer from './slices/CartSlice';
import authSliceReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    // 1. This adds the reducer for RTK Query (data fetching)
    [apiSlice.reducerPath]: apiSlice.reducer,
    // 2. This adds the reducer for your local cart state
    cart: cartSliceReducer,
    // 3. This adds the reducer for auth state
    auth: authSliceReducer,
  },
  // 4. This adds the middleware for RTK Query (caching, etc.)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});