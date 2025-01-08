import React, { useState } from "react";
import { Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DuelHistory = () => {
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const allDuels = [
    {
      id: 1,
      opponent: "Sarah Wilson",
      problem: "Binary Tree Traversal",
      result: "Won",
      time: "2h ago",
      timeSpent: "25:30",
      rating: 1850,
      ratingChange: "+15",
    },
    {
      id: 2,
      opponent: "Mike Johnson",
      problem: "Dynamic Programming",
      result: "Lost",
      time: "5h ago",
      timeSpent: "45:00",
      rating: 2100,
      ratingChange: "-12",
    },
    {
      id: 3,
      opponent: "Emma Davis",
      problem: "Graph Algorithms",
      result: "Won",
      time: "1d ago",
      timeSpent: "35:15",
      rating: 1920,
      ratingChange: "+18",
    },
    // Add more duel entries as needed
  ];

  const filteredDuels =
    filter === "all"
      ? allDuels
      : allDuels.filter((duel) => duel.result === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Duel History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Explore your past coding battles and achievements.
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredDuels.map((duel) => (
          <div
            key={duel.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  vs {duel.opponent}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {duel.problem}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`font-medium ${
                  {
                    Won: "text-green-500",
                    Lost: "text-red-500",
                  }[duel.result]
                }`}
              >
                {duel.result}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {duel.time}
              </span>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}

        {filteredDuels.length === 0 && (
          <div className="text-center py-10 text-gray-600 dark:text-gray-400">
            No duels found for the selected filter.
          </div>
        )}

        <div
          onClick={() => navigate(-1)} // Go back to the previous page
          className="flex items-center justify-center p-3 mt-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
        >
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Back to Duel Arena
          </span>
        </div>
      </div>
    </div>
  );
};

export default DuelHistory;
