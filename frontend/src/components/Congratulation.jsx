import React from "react";

function Congratulation({ winnerName }) {
  return (
    <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-900 dark:bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-3 transform transition-all duration-300 hover:shadow-xl border dark:border-gray-600">
      <div className="flex-1 text-center">
        <p className="font-semibold text-gray-900 dark:text-white">
        {winnerName}!
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          has won the duel.
        </p>
      </div>
    </div>
  );
}

export default Congratulation;