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

// Import actions from your Redux slice
import {
  setUsername1,
  setProfilePic,
  clearUserData,
} from "../redux/userSlice.jsx";

// --- Data for Navigation Links ---
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

// --- Reusable NavItem Component ---
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

// --- User Profile Block ---
const UserProfile = ({ user, collapsed, onNavigate, isLoading }) => {
  // Shows a skeleton loader while user data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center w-full p-2">
        <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse flex-shrink-0"></div>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            collapsed ? "w-0" : "w-full ml-3"
          }`}
        >
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onNavigate}
      className="flex items-center w-full p-2 rounded-full transition-colors duration-200 hover:bg-white/5 cursor-pointer"
    >
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div
        className={`overflow-hidden transition-all duration-200 ${
          collapsed ? "w-0" : "w-full ml-3"
        }`}
      >
        <p className="font-medium text-gray-200 text-sm whitespace-nowrap">
          {user.name}
        </p>
      </div>
    </div>
  );
};

// --- Main Sidebar Component ---
const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const { username1, profilePic } = useSelector((state) => state.user);

  useEffect(() => {
    if (username1) {
      setIsLoadingUser(false);
      return;
    }
    const fetchCurrentUser = async () => {
      setIsLoadingUser(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/users/current-user`,
          { withCredentials: true }
        );
        if (response.data.success) {
          const user = response.data.data;
          dispatch(setUsername1(user.username));
          dispatch(setProfilePic(user.avatar));
        }
      } catch (error) {
        console.error("No active session found for sidebar.");
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchCurrentUser();
  }, [dispatch, username1, apiUrl]);

  const user = {
    name: username1,
    avatar:
      profilePic ||
      `https://ui-avatars.com/api/?name=${
        username1 || "G"
      }&background=1E1F22&color=fff`,
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(clearUserData());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const secondaryLinks = [
    {
      id: "activity",
      text: "Activity",
      icon: <Activity size={20} />,
      path: "/user/activity",
    },
    {
      id: "settings",
      text: "Settings",
      icon: <Settings size={20} />,
      path: "/user/settings",
    },
    {
      id: "logout",
      text: "Logout",
      icon: <LogOut size={20} />,
      path: "/",
      onClick: handleLogout,
    },
  ];

  return (
    <aside
      className={`h-screen flex flex-col bg-[#1E1F22] flex-shrink-0 transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <header className="flex items-center p-3 h-16 flex-shrink-0">
        <button
          onClick={onToggle}
          className="p-3 rounded-full hover:bg-white/5 transition-colors"
        >
          <Menu size={20} className="text-gray-300" />
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            collapsed ? "w-0" : "w-full ml-2"
          }`}
        >
          <span className="font-bold text-xl whitespace-nowrap text-white">
            CodeJatra
          </span>
        </div>
      </header>

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

      <footer className="p-3 mt-auto space-y-1 flex-shrink-0">
        <UserProfile
          user={user}
          collapsed={collapsed}
          onNavigate={() => navigate("/user/profile")}
          isLoading={isLoadingUser}
        />
        <div className="border-t border-white/10 my-2"></div>
        {secondaryLinks.map((link) => (
          <NavItem
            key={link.id}
            link={link}
            collapsed={collapsed}
            isActive={false}
            onClick={(e) => {
              if (link.onClick) {
                e.preventDefault();
                link.onClick();
              }
            }}
          />
        ))}
      </footer>
    </aside>
  );
};

export default Sidebar;
