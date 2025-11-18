import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './constants';

// Define the base query function
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create the main API slice
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'], // Define tags for caching
  endpoints: (builder) => ({}), // Endpoints will be injected
});