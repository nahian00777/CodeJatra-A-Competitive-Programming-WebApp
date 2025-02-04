import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DuelRoom = ({ onClose }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isWinner, setIsWinner] = useState(false); // Track if the user won
  const [showToast, setShowToast] = useState(false); // Control toast visibility

  // Retrieve duel data from Redux store
  const duelData = useSelector((state) => state.user.duelData);

  // Extract necessary information from duelData
  const problemUrl = duelData
    ? `https://codeforces.com/problemset/problem/${duelData.problem.contestId}/${duelData.problem.index}`
    : "#";
  const opponent = duelData
    ? {name : duelData.user2[0].handle, rating: "N/A"}
    : { name: "Unknown", rating: "N/A" };

  // Handle closing the duel room
  const handleCloseAndNavigate = () => {
    if (onClose) onClose();
    navigate("/user/duel", { replace: true });
  };

  // Handle solution submission
  const handleSubmitSolution = async () => {
    setIsSubmitting(true);
    setMessage("");
    setShowToast(false);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/duel/completeDuel/${duelData._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setShowToast(true); // Show toast notification

        // Check if the current user is the winner
        if (data.message.includes("You win")) {
          setIsWinner(true);
        }

        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error completing duel.");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (error) {
      setMessage("Error submitting solution. Please try again.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
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
            href={problemUrl}
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
            {opponent.name} ({opponent.rating})
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

          {/* Winner GIF */}
          {isWinner && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-green-600">
                Congratulations, You Won!
              </h3>
              <img
                src="https://media.giphy.com/media/3o6Zt0LC2X7Do4nDBK/giphy.gif" // Example GIF
                alt="Winner GIF"
                className="mx-auto mt-4 w-36"
              />
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg max-w-xs w-full z-50 opacity-100 transition-opacity duration-300 ease-in-out">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default DuelRoom;
