import { createSlice } from '@reduxjs/toolkit';

// Helper function to get cart from localStorage
const cartFromStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : null;

const initialState = {
  cartItems: cartFromStorage?.cartItems || [],
  shippingAddress: cartFromStorage?.shippingAddress || {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  paymentMethod: cartFromStorage?.paymentMethod || 'PayPal',
};

// Helper function to save cart to localStorage
const updateCart = (state) => {
  // Calculate cart subtotal, tax, etc. (We'll do this later)
  
  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer to add an item to the cart
    addToCart: (state, action) => {
      const item = action.payload;
      
      // Check if the item is already in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If it exists, update the quantity
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If it's a new item, add it to the array
        state.cartItems = [...state.cartItems, item];
      }
      
      updateCart(state);
    },
    // Reducer to remove an item from the cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      updateCart(state);
    },
  },
});

// Export the actions
export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;