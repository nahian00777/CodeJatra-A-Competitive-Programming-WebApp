import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Users } from "lucide-react";
import axios from "axios";

const LeaderboardCard = ({ children }) => (
  <div className="dark:bg-gray-800 rounded-xl p-6 shadow-sm">
    <div>
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

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/fetchLeaderboard`
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
    .filter((player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <LeaderboardCard>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <div className="relative">
            <input
              type="text"
              id="searchPlayer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter player name"
              className="mt-3 p-2 pl-10 block w-64 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
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
          {sortedData.map((player) => (
            <div
              key={player.originalIndex}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                  #{player.originalIndex + 1}
                </span>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {player.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {player.rating}
                </span>
                <button
                  onClick={() => console.log(`View profile for ${player.name}`)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                ></button>
              </div>
            </div>
          ))}
        </div>

        {sortedData.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400 text-center mt-4">
            No players found.
          </p>
        )}
      </LeaderboardCard>
    </div>
  );
};

export default Leaderboard;
