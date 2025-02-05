import React from "react";

function Notification({ id, message, sender, onAccept, onReject }) {
  return (
    <div className="flex items-center justify-between  bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-3 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border dark:border-gray-600">
      <div className="flex-1">
        <p className="font-semibold text-gray-900 dark:text-white">{sender}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {message}
        </p>
      </div>
      <div className="flex gap-2 ml-4">
        <div>
          <button
            onClick={() => onAccept(id)}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
            aria-label="Accept"
          >
            Accept
          </button>
        </div>
        <div>
          <button
            onClick={() => onReject(id)}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            aria-label="Reject"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
