import { apiSlice } from '../apiSlice';
import { PRODUCTS_URL } from '../constants';

// Inject endpoints into the parent apiSlice
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query: getProducts
    getProducts: builder.query({
      query: (keyword = '') => ({
        url: PRODUCTS_URL,
        params: { keyword }, // Send keyword as a query param
      }),
      keepUnusedDataFor: 5, // Keep data for 5 seconds after unmounting
      providesTags: ['Product'], // Provides the 'Product' tag for caching
    }),

    // Query: getProductDetails
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, // e.g., /api/products/123
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// Export the auto-generated hooks for these queries
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery, // <-- This is needed for ProductScreen
} = productsApiSlice;