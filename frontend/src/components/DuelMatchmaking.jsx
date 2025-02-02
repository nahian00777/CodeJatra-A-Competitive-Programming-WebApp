import React, { useState } from "react";
import { X, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DuelMatchmaking = ({ onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("any");

  const handleChallenge = (opponent) => {
    navigate("/user/duel-room", {
      state: {
        opponent,
        problemUrl: "https://codeforces.com/problemset/problem/1/A",
      },
    });
  };

  const onlineUsers = [
    { id: 1, name: "Sarah Wilson", rating: 1850, status: "online" },
    { id: 2, name: "Alex Chen", rating: 2150, status: "in_game" },
    { id: 3, name: "Maria Garcia", rating: 2080, status: "online" },
    { id: 4, name: "John Smith", rating: 2045, status: "online" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Find an Opponent
        </h2>

        <div className="space-y-6">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred Rating Range
            </label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="any">Any Rating</option>
              <option value="similar">Similar Rating (±100)</option>
              <option value="higher">Higher Rating</option>
              <option value="lower">Lower Rating</option>
            </select>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Online Players
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {onlineUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                          user.status === "online"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Rating: {user.rating}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleChallenge(user)}
                    disabled={user.status !== "online"}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      user.status === "online"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700"
                    }`}
                  >
                    {user.status === "online" ? "Challenge" : "In Game"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuelMatchmaking;
