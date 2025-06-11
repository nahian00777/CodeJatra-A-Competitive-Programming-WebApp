// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Swords,
  Trophy,
  Info,
  Menu,
  Settings,
  Activity,
  LogOut,
} from "lucide-react";

// CORRECTED: Import the exact action names from your userSlice and alias them
import {
  setUsername1 as setUsernameAction,
  setHandle1 as setHandleAction,
  setProfilePic as setProfilePicAction,
  clearUserData,
} from "../redux/userSlice.jsx"; // Adjust the path as necessary

// --- Main nav links ---
const mainLinks = [
  { id: "duel", text: "Duel", icon: <Swords size={20} />, path: "/user/duel" },
  {
    id: "leaderboard",
    text: "Leaderboard",
    icon: <Trophy size={20} />,
    path: "/user/leaderboard",
  },
  {
    id: "iupc-details",
    text: "IUPC Details",
    icon: <Info size={20} />,
    path: "/user/iupc-details",
  },
];

// --- NavItem component ---
const NavItem = ({ link, collapsed, isActive, onClick = () => {} }) => (
  <Link
    to={link.path}
    onClick={onClick}
    title={collapsed ? link.text : ""}
    className={`group flex items-center h-10 w-full px-3 rounded-full cursor-pointer transition-colors duration-200 ${
      isActive
        ? "bg-blue-500/20 text-blue-300 font-medium"
        : "text-gray-400 hover:bg-white/5"
    }`}
  >
    <div className="flex-shrink-0">{link.icon}</div>
    <span
      className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
        collapsed ? "w-0 ml-0" : "w-full ml-4"
      }`}
    >
      {link.text}
    </span>
  </Link>
);

// --- UserProfile block ---
const UserProfile = ({ user, collapsed, onNavigate, isLoading, rating }) => {
  // Shows a pulsing skeleton loader while user data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center w-full p-2">
        <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse flex-shrink-0"></div>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            collapsed ? "w-0" : "w-full ml-3"
          }`}
        >
          <div className="h-4 mb-2 w-24 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onNavigate}
      className="flex items-center w-full p-2 rounded-lg transition-colors duration-200 hover:bg-white/10 cursor-pointer"
    >
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white/30"
      />
      <div
        className={`flex flex-col items-start overflow-hidden transition-all duration-200 ${
          collapsed ? "w-0" : "w-full ml-3"
        }`}
      >
        <p className="font-medium text-white text-sm whitespace-nowrap">
          {user.name}
        </p>
        <p className="text-xs text-blue-200 dark:text-gray-400 whitespace-nowrap">
          Rating: {rating}
        </p>
      </div>
    </div>
  );
};

// --- Sidebar component ---
const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Pull user data from Redux store. These names come from your userSlice initial state.
  const { username, handle, profilePic } = useSelector((state) => state.user);

  // Local state for loading status and duel rating
  const [isLoadingUser, setIsLoadingUser] = useState(!username);
  const [rating, setRating] = useState(0);

  // Effect 1: Fetch the current user's core data (if not already in Redux)
  useEffect(() => {
    // If we already have a username from localStorage/redux, no need to fetch.
    if (username) {
      setIsLoadingUser(false);
      return;
    }

    const fetchCurrentUser = async () => {
      setIsLoadingUser(true);
      try {
        const res = await axios.get(`${apiUrl}/api/v1/users/current-user`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const u = res.data.data;
          // CORRECTED: Dispatch actions to save all relevant user data in Redux store
          // These actions are the ones you defined in userSlice.jsx
          dispatch(setUsernameAction(u.username));
          dispatch(setProfilePicAction(u.avatar));
          dispatch(setHandleAction(u.handle)); // This sets the handle needed for the next API call
        }
      } catch (err) {
        console.error(
          "No active session, could not fetch user for sidebar:",
          err
        );
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, [username, apiUrl, dispatch]); // This effect runs once if username is initially empty

  // Effect 2: Fetch the user's duel stats (rating) once we have a handle
  useEffect(() => {
    // Do not fetch if the handle is missing
    if (!handle) return;

    const fetchDuelStats = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/duel/fetchDuelStats`,
          {
            params: { handle }, // Use the handle from Redux
            headers: { "Content-Type": "application/json" },
          }
        );
        setRating(response.data.currentDuelRating || 0);
      } catch (error) {
        console.error("Error fetching duel stats for sidebar:", error);
        setRating(0); // Reset rating on error
      }
    };

    fetchDuelStats();
  }, [handle, apiUrl]); // This effect re-runs if the user's handle changes

  // Construct a user object for the profile component
  const user = {
    name: username || "Guest",
    avatar:
      profilePic ||
      `https://ui-avatars.com/api/?name=${
        username || "G"
      }&background=2A2B2E&color=fff&bold=true`,
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(clearUserData()); // Use the clearUserData action from your slice
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const secondaryLinks = [
    {
      id: "logout",
      text: "Logout",
      icon: <LogOut size={20} />,
      path: "/", // Navigate to root on click
      onClick: handleLogout, // Execute the logout logic
    },
  ];

  return (
    <aside
      className={`h-screen flex flex-col bg-[#1F2937] text-white flex-shrink-0 transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <header className="flex items-center p-3 h-16 flex-shrink-0">
        <button
          onClick={onToggle}
          className="p-3 rounded-full hover:bg-white/10 transition-colors"
        >
          <Menu size={20} className="text-gray-300" />
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            collapsed ? "w-0" : "w-full ml-2"
          }`}
        >
          <span className="font-bold text-xl whitespace-nowrap">CodeJatra</span>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1">
        {mainLinks.map((link) => (
          <NavItem
            key={link.id}
            link={link}
            collapsed={collapsed}
            isActive={location.pathname.startsWith(link.path)}
          />
        ))}
      </nav>

      {/* Footer & User Profile Section */}
      <footer className="p-3 mt-auto flex-shrink-0">
        <div className="border-t border-white/10 mb-2"></div>
        {/* The User Profile component displays the data */}
        <UserProfile
          user={user}
          collapsed={collapsed}
          onNavigate={() => navigate("/user/cf-profile")}
          isLoading={isLoadingUser}
          rating={rating}
        />
        <div className="mt-2 space-y-1">
          {secondaryLinks.map((link) => (
            <NavItem
              key={link.id}
              link={link}
              collapsed={collapsed}
              isActive={false} // Secondary links are not marked as active
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault(); // Prevent navigation for click-only items
                  link.onClick();
                }
              }}
            />
          ))}
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
