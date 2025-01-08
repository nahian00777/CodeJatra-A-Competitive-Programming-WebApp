import React from "react";
import { X, Clock, Trophy, Code, User } from "lucide-react";

const DuelDetails = ({ duel, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className=" dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Duel Details
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {duel.problem}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  vs {duel.opponent}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rating: {duel.rating}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {duel.timeSpent}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span
                  className={`text-sm font-medium ${
                    duel.result === "Won" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {duel.result}
                </span>
              </div>
              <span
                className={`text-sm font-medium ${
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Solution
              </h3>
            </div>
            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                {duel.code}
              </code>
            </pre>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Opponent's Solution
              </h3>
            </div>
            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                {duel.opponentCode}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuelDetails;
