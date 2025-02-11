import React from "react";
import { X, Clock, Trophy, User } from "lucide-react";

const DuelDetails = ({ duel, onClose }) => {
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
            {duel.problem}
          </p>
          <a
            href={duel.problemLink} // Assuming duel.problemLink contains the URL to the problem
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
                vs {duel.opponent}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Rating: {duel.rating}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-lg text-gray-600 dark:text-gray-400">
                {duel.timeSpent}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span
                className={`text-lg font-medium ${
                  duel.result === "Won" ? "text-green-500" : "text-red-500"
                }`}
              >
                {duel.result}
              </span>
            </div>
            <span
              className={`text-lg font-medium ${
                duel.ratingChange.startsWith("+")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {duel.ratingChange} rating
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuelDetails;
