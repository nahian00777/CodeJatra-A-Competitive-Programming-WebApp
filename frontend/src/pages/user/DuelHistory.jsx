import React, { useState, useEffect } from "react";
import { Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DuelDetails from "../../components/DuelDetails";
import axios from "axios";

const DuelHistory = () => {
  const [filter, setFilter] = useState("all");
  const [selectedDuel, setSelectedDuel] = useState(null);
  const [duels, setDuels] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:3000/api/v1/users/getCurrentUser",
          {
            withCredentials: true,
          }
        );
        setCurrentUserId(userResponse.data.data._id);

        const duelResponse = await axios.get(
          "http://localhost:3000/api/v1/duel/recentDuels",
          {
            withCredentials: true,
          }
        );
        setDuels(duelResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const filteredDuels = duels.filter((duel) => {
    if (filter === "all") return true;
    const isWinner = duel.winner === currentUserId;
    return filter === "Won" ? isWinner : !isWinner;
  });

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
        {filteredDuels.map((duel) => {
          const opponent =
            duel.user1[0]._id === currentUserId ? duel.user2[0] : duel.user1[0];
          const result = duel.winner === currentUserId ? "Won" : "Lost";

          return (
            <div
              key={duel._id}
              onClick={() => setSelectedDuel(duel)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    vs {opponent?.username || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {duel.problem.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`font-medium ${
                    result === "Won" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {result}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(duel.startTime).toLocaleString()}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          );
        })}

        {filteredDuels.length === 0 && (
          <div className="text-center py-10 text-gray-600 dark:text-gray-400">
            No duels found for the selected filter.
          </div>
        )}

        <div
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-3 mt-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
        >
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Back to Duel Arena
          </span>
        </div>
      </div>

      {selectedDuel && (
        <DuelDetails
          duel={selectedDuel}
          
          onClose={() => setSelectedDuel(null)}
        />
      )}
    </div>
  );
};

export default DuelHistory;
