import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user slice
const initialState = {
  username: localStorage.getItem('username') || '', // Load username from localStorage if it exists
  darkMode: localStorage.getItem('darkMode') === 'true' || false, // Load darkMode preference from localStorage
};

// Create a slice for user data
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer to set the username
    setUsername: (state, action) => {
      state.username = action.payload; // Update the username in state
      localStorage.setItem('username', action.payload); // Save username to localStorage
    },
    // Reducer to clear the username (logout)
    logout: (state) => {
      state.username = ''; // Clear the username in state
      state.darkMode = false; // Reset dark mode preference on logout
      localStorage.removeItem('username'); // Remove username from localStorage
      localStorage.removeItem('darkMode'); // Remove darkMode preference from localStorage
    },
    // Reducer to toggle dark mode
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode; // Toggle dark mode
      localStorage.setItem('darkMode', state.darkMode); // Save dark mode preference to localStorage
    },
  },
});

// Export the actions (setUsername, logout, and toggleDarkMode)
export const { setUsername, logout, toggleDarkMode } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;