import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  username: localStorage.getItem("username") || "", // Load username from localStorage if it exists
  handle: localStorage.getItem("handle") || "", // Load handle from localStorage if it exists
  darkMode: localStorage.getItem("darkMode") === "true" || false,
  duelData: null, // Load darkMode preference from localStorage
};

// Create a slice for user data
const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState, // Initial state
  reducers: {
    setDuelData: (state, action) => {
      state.duelData = action.payload;
      localStorage.setItem("duelData", JSON.stringify(action.payload));
      // Update the duel data in state
    },
    // Reducer to set the username
    setUsername: (state, action) => {
      state.username = action.payload; // Update the username in state
      localStorage.setItem("username", action.payload); // Save username to localStorage
    },
    setHandle: (state, action) => {
      state.handle = action.payload; // Update the handle in state
      localStorage.setItem("handle", action.payload); // Save handle to localStorage
    },
    // Reducer to clear the username (logout)
    logout: (state) => {
      state.username = ""; // Clear the username in state
      state.darkMode = false; // Reset dark mode preference on logout
      localStorage.removeItem("username"); // Remove username from localStorage
      localStorage.removeItem("handle"); // Remove handle from localStorage
      localStorage.removeItem("darkMode"); // Remove darkMode preference from localStorage
    },
    // Reducer to toggle dark mode
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode; // Toggle dark mode
      localStorage.setItem("darkMode", state.darkMode); // Save dark mode preference to localStorage
    },
  },
});

// Export the actions (setUsername, logout, and toggleDarkMode)
export const { setUsername, setHandle, logout, toggleDarkMode, setDuelData } =
  userSlice.actions;

// Export the reducer
export default userSlice.reducer;
