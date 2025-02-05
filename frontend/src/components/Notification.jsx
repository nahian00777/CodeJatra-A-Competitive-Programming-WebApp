import React from "react";
import { X, Check } from "lucide-react";

function Notification({ id, message, sender, onAccept, onReject }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-2 animate-slideIn">
      <div className="flex-1">
        <p className="font-medium text-gray-800">{sender}</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onAccept(id)}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          aria-label="Accept"
        >
          <Check size={16} />
        </button>
        <button
          onClick={() => onReject(id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          aria-label="Reject"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default Notification;
