import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  username: localStorage.getItem("username") || "", // Load username from localStorage if it exists
  handle: localStorage.getItem("handle") || "", // Load handle from localStorage if it exists
  profilePic: localStorage.getItem("profilePic") || "", // Load profilePic from localStorage if it exists
  darkMode: localStorage.getItem("darkMode") === "true" || false, // Load darkMode preference from localStorage
  duelData: null,
  isLoggedIn: false,
};

// Create a slice for user data
const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState, // Initial state
  reducers: {
    clearUserData: (state) => {
      state.username = "";
      state.handle = "";
      state.profilePic = "";
      localStorage.removeItem("username");
      localStorage.removeItem("handle");
      localStorage.removeItem("profilePic");
      localStorage.removeItem("darkMode");
    },
    setDuelData: (state, action) => {
      state.duelData = action.payload;
      localStorage.setItem("duelData", JSON.stringify(action.payload));
    },
    // Reducer to set the username
    setUsername1: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    // Reducer to set the handle
    setHandle1: (state, action) => {
      state.handle = action.payload;
      localStorage.setItem("handle", action.payload);
    },
    // Reducer to set the profile picture
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
      localStorage.setItem("profilePic", action.payload);
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", action.payload);
    },
    // Reducer to clear the username (logout)
    logout: (state) => {
      state.username = "";
      state.handle = "";
      state.profilePic = "";
      state.darkMode = false;
      state.isLoggedIn = false;
      localStorage.removeItem("username");
      localStorage.removeItem("handle");
      localStorage.removeItem("profilePic");
      localStorage.removeItem("darkMode");
    },
    // Reducer to toggle dark mode
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

// Export the actions
export const {
  setUsername1,
  setHandle1,
  setProfilePic,
  logout,
  toggleDarkMode,
  setDuelData,
  clearUserData,
  setIsLoggedIn
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;