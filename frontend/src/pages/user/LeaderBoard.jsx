import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Users, Search, ExternalLink } from "lucide-react";
import axios from "axios";

const LeaderboardCard = ({ children }) => (
  <div className="dark:bg-gray-800 rounded-xl p-6 shadow-sm ">
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Leaderboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        Explore the top players based on their ratings.
      </p>
    </div>
    {children}
  </div>
);

const Leaderboard = () => {
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/users/fetchLeaderboard`
        );
        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
      }
    };

    fetchLeaderboard();
  }, []);

  const filteredData = leaderboardData
    .map((player, index) => ({ ...player, originalIndex: index }))
    .filter(
      (player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (player.handle &&
          player.handle.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <LeaderboardCard>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="searchPlayer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or CF handle"
              className="pl-10 py-2 w-full sm:w-80 rounded-lg  dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            {sortOrder === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
            <span className="ml-2">Sort by Rating</span>
          </button>
        </div>

        <div className="space-y-4">
          {sortedData.map((player, index) => (
            <div
              key={player.originalIndex}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold text-gray-600 dark:text-gray-400 w-8">
                  #{index + 1}
                </span>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 dark:bg-gray-600 rounded-full p-2">
                    <Users className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {player.name}
                    </span>
                    {player.handle && (
                      <a
                        href={`https://codeforces.com/profile/${player.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                      >
                        {player.handle}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {player.rating}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Rating
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No players found matching your search.
            </p>
          </div>
        )}
      </LeaderboardCard>
    </div>
  );
};

export default Leaderboard;
