import React from "react";
import { X, Clock, Trophy, User } from "lucide-react";

const DuelDetails = ({ duel, currentUserId, onClose }) => {
  const problemName = duel.problem?.name || "Unknown Problem";
  const problemLink = duel
    ? `https://codeforces.com/problemset/problem/${duel.problem.contestId}/${duel.problem.index}`
    : "#";

  // Determine opponent
  const opponent =
    duel.user1[0]._id === currentUserId ? duel.user2[0] : duel.user1[0];
  const opponentName = opponent?.username || "Unknown Opponent";

  // Calculate time spent
  const startTime = new Date(duel.startTime);
  const endTime = new Date(duel.endTime);
  const timeSpent = new Date(endTime - startTime).toISOString().substr(11, 8);

  // Determine result and rating change
  // console.log(currentUserId, duel.winner);
  const result = duel.winner === currentUserId ? "Won" : "Lost";
  const ratingChange = (result === "Won") ? "+25" : "-25";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Duel Details
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            {problemName}
          </p>
          <a
            href={problemLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors w-full text-center"
          >
            View Problem
          </a>
        </div>

        <div className="dark:bg-gray-700 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-xl font-medium text-gray-900 dark:text-white">
                vs {opponentName}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Rating: {duel.problem?.rating || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-lg text-gray-600 dark:text-gray-400">
                {timeSpent}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span
                className={`text-lg font-medium ${
                  result === "Won" ? "text-green-500" : "text-red-500"
                }`}
              >
                {result}
              </span>
            </div>
            <span
              className={`text-lg font-medium ${
                ratingChange.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {ratingChange} rating
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuelDetails;
