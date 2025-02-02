import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the user slice

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Add the user slice to the store
  },
});

export default store;