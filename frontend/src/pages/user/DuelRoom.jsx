import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DuelRoom = ({ onClose, problemUrl, opponent }) => {
  const navigate = useNavigate();

  // Handle the close button functionality
  const handleCloseAndNavigate = () => {
    if (onClose) {
      onClose(); // Call the onClose function passed as a prop
    }
    navigate("/user/duel", { replace: true }); // Navigate to the Duel page
  };

  const [messages, setMessages] = useState([
    { sender: "opponent", text: "Hey, ready for the duel?" },
    { sender: "you", text: "Yes, let's go!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "you", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={handleCloseAndNavigate}
          aria-label="Close"
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Duel Room
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="col-span-1 md:col-span-2 flex flex-col h-96 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.sender === "you"
                      ? "self-end bg-gray-200 dark:bg-gray-600"
                      : "self-start bg-blue-100 dark:bg-blue-800"
                  } px-4 py-2 rounded-lg max-w-xs`}
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

            {/* Chat Input */}
            <div className="p-4 flex items-center gap-3 border-t dark:border-gray-600">
              <input
                type="text"
                placeholder="Type your message..."
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

          {/* Problem Section */}
          <div className="flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Duel Problem
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Solve the problem and submit your solution. May the best coder
              win!
            </p>
            <a
              href={problemUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700"
            >
              Go to Problem
            </a>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                Opponent
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {opponent?.name || "Unknown"} ({opponent?.rating || "N/A"})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuelRoom;
