import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Swords,
  Trophy,
  Calendar,
  Info,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  User,
  Home,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const NavItem = ({ icon, text, collapsed, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 group relative"
  >
    <div className="min-w-[24px] flex items-center justify-center">{icon}</div>
    {!collapsed && <span>{text}</span>}
    {collapsed && (
      <div className="absolute left-14 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {text}
      </div>
    )}
  </button>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h2 className="text-xl font-bold dark:text-white">CodeJatra</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder={collapsed ? "" : "Search users..."}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500 ${
              collapsed ? "hidden" : "block"
            }`}
          />
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem
            icon={<Home size={20} />}
            text="Dashboard"
            collapsed={collapsed}
            onClick={() => {
              /* Handle navigation */
              navigate("/user/dashboard");
            }}
          />
          <NavItem
            icon={<User size={20} />}
            text="CF Profile"
            collapsed={collapsed}
            onClick={() => {
              /* Handle navigation */
              navigate("/user/cf-profile");
            }}
          />
          <NavItem
            icon={<Swords size={20} />}
            text="DUEL"
            collapsed={collapsed}
            onClick={() => {
              /* Handle navigation */
              navigate("/user/duel");
            }}
          />
          <NavItem
            icon={<Trophy size={20} />}
            text="Leaderboard"
            collapsed={collapsed}
            onClick={() => {
              /* Handle navigation */
              navigate("/user/leaderboard");
            }}
          />
          <NavItem
            icon={<Info size={20} />}
            text="IUPC Details"
            collapsed={collapsed}
            onClick={() => {
              /* Handle navigation */
              navigate("/user/iupc-details");
            }}
          />
          <NavItem
            icon={<Calendar size={20} />}
            text="Contest Details"
            collapsed={collapsed}
            onClick={() => {
              /* Handle navigation */
              navigate("/user/contest-details");
            }}
          />
        </nav>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-4 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <div className="min-w-[24px] flex items-center justify-center">
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </div>
          {!collapsed && <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
