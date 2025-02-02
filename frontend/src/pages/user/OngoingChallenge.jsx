import React, { useState, useEffect } from "react";
import { X, Clock, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OngoingChallenge = ({ onClose, challengeDetails, onSubmit }) => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(
    challengeDetails?.timeRemaining || 3600
  ); // Default 1 hour in seconds
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCloseAndNavigate = () => {
    onClose && onClose();
    navigate("/user/duel", { replace: true });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "you", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 relative">
        <button
          onClick={handleCloseAndNavigate}
          aria-label="Close"
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Ongoing Challenge
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Problem Section */}
          <div className="col-span-2 flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Problem Details
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {challengeDetails?.problemTitle || "Unknown Problem"}
            </p>
            <a
              href={challengeDetails?.problemUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 mb-4"
            >
              View Problem
            </a>
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4"
            >
              Submit Solution
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
              <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              Time Remaining:
              <span className="font-medium text-gray-900 dark:text-white">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          {/* Participants Section */}
          <div className="flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Participants
            </h3>
            <div className="space-y-3">
              {challengeDetails?.participants?.map((participant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium text-gray-900 dark:text-white">
                      {participant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {participant.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Rating: {participant.rating}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {participant.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Chat
          </h3>
          <div className="h-48 overflow-y-auto p-2 space-y-2 border dark:border-gray-600 rounded-lg">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs ${
                  message.sender === "you"
                    ? "bg-gray-200 dark:bg-gray-600 self-end"
                    : "bg-blue-100 dark:bg-blue-800 self-start"
                }`}
              >
                <p className="text-sm font-medium">
                  {message.sender === "you" ? "You" : "Opponent"}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingChallenge;
