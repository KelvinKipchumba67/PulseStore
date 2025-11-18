import { apiSlice } from '../apiSlice';
import { USERS_URL } from '../constants';

// Inject endpoints into the parent apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the 'login' mutation
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`, // Corresponds to backend route
        method: 'POST',
        body: data,
      }),
    }),

    // --- ADD THIS NEW MUTATION ---
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`, // Corresponds to backend route
        method: 'POST',
        body: data,
      }),
    }),
    // --- END OF NEW MUTATION ---
  }),
});

// Export the auto-generated hook for this mutation
export const {
  useLoginMutation,
  useRegisterMutation, // <-- EXPORT THE NEW HOOK
} = usersApiSlice;