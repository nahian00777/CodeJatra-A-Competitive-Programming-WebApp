import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DuelRoom = ({ onClose, problemUrl, opponent }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Handle closing the duel room
  const handleCloseAndNavigate = () => {
    if (onClose) onClose();
    navigate("/user/duel", { replace: true });
  };

  // Handle solution submission
  const handleSubmitSolution = async () => {
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/check-winner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerHandle: "your_handle",
          problemId: "1234A",
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error submitting solution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 relative">
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

        {/* Problem Section */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Duel Problem
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Solve the problem and submit your solution. The first to solve wins!
          </p>

          <a
            href={problemUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 mb-4"
          >
            Go to Problem
          </a>

          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
            Opponent
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {opponent?.name || "Unknown"} ({opponent?.rating || "N/A"})
          </p>
        </div>

        {/* Submit Solution Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmitSolution}
            className="px-6 py-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 disabled:bg-gray-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Solution"}
          </button>

          {/* Submission Status */}
          {message && <p className="mt-4 text-sm text-gray-200">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default DuelRoom;
