import React, { useState, useEffect } from "react";
import { Bell, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [Rating, setRating] = useState(0);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, message: "New duel request from Alex", time: "2m ago" },
    { id: 2, message: "You won against Sarah!", time: "1h ago" },
    { id: 3, message: "New contest starting soon", time: "3h ago" },
  ];

  const userName = useSelector((state) => state.user.username);
  const handle = useSelector((state) => state.user.handle);
  const profilePic = useSelector((state) => state.user.profilePic);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDuelStats = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/duel/fetchDuelStats`, // URL
          {
            params: { handle }, // Query parameters
            headers: { "Content-Type": "application/json" },
          }
        );

        setRating(response.data.currentDuelRating);
      } catch (error) {
        console.error("Error fetching duel stats: ", error);
      }
    };

    fetchDuelStats();
  }, []);

  return (
    <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 px-6 flex items-center justify-between">
      {/* Search Section */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search problems, users, or contests..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          {/* <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-white/10 relative"
          > */}
          {/* <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> */}

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
              </div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <button
          onClick={() => navigate("/user/cf-profile")}
          className="flex items-center gap-3 pl-3 pr-3 pt-2 pb-2 rounded-full hover:bg-white/25"
        >
          <img
            src={profilePic}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-white/30"
          />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-white"> {userName}</span>
            <span className="text-xs text-blue-200 dark:text-gray-400">
              Rating: {Rating}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
