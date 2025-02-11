import React, { useState } from "react";
import { X, Swords, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const OngoingChallenge = ({ onClose, challengeDetails }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Extract duelDataFromOp from navigation state
  const { duelDataFromOp, accepted } = location.state || {};

  // Get duelData from Redux store
  const storedDuelData = useSelector((state) => state.user.duelData);

  // Determine which duel data to use
  const duelData = accepted ? duelDataFromOp : storedDuelData;
  // const duelData = location.state?.duelData;
  // const duelDataFromOp = location.state?.duelDataFromOp;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [duelOngoing, setDuelOngoing] = useState(true);

  // const duelData = useSelector((state) => state.user.duelData);

  const problemUrl = duelData
    ? `https://codeforces.com/problemset/problem/${duelData.problem.contestId}/${duelData.problem.index}`
    : "#";
  const opponent = duelData
    ? { name: duelData.user2[0].handle, rating: "N/A" }
    : { name: "Unknown", rating: "N/A" };

  const myself = duelData
    ? { name: duelData.user1[0].handle, rating: "N/A" }
    : { name: "Unknown", rating: "N/A" };

  const handleCloseAndNavigate = () => {
    onClose && onClose();
    navigate("/user/duel", { replace: true });
  };

  const handleSubmitSolution = async () => {
    if (!duelOngoing) return;

    setIsSubmitting(true);
    setMessage("");
    setShowToast(false);

    try {
      // console.log(duelData._id);
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
        setShowToast(true);

        if (data.message.includes("You win")) {
          setIsWinner(true);
        }

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

  const handleDropDuel = async () => {
    // console.log(duelDataFromOp);
    if (!duelOngoing) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/duel/dropDuel/${duelData._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setMessage("Duel dropped successfully.");
        setShowToast(true);
        setDuelOngoing(false);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error dropping duel.");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (error) {
      setMessage("Error dropping duel. Please try again.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
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

        {duelOngoing ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Problem Details
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {challengeDetails?.problemTitle || "Unknown Problem"}
              </p>
              <a
                href={problemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 mb-4"
              >
                View Problem
              </a>
              <button
                onClick={handleSubmitSolution}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Solution"}
              </button>
              <button
                onClick={handleDropDuel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Drop Duel
              </button>

              {message && (
                <p className="mt-4 text-sm text-gray-200">{message}</p>
              )}

              {isWinner && (
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-green-600">
                    Congratulations, You Won!
                  </h3>
                  <img
                    src="https://media.giphy.com/media/3o6Zt0LC2X7Do4nDBK/giphy.gif"
                    alt="Winner GIF"
                    className="mx-auto mt-4 w-36"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Participants
              </h3>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-8 h-8 text-gray-900 dark:text-white" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {myself.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rating: {myself.rating}
                    </p>
                  </div>
                </div>
                <Swords className="w-6 h-6 text-red-500" />
                <div className="flex items-center gap-3">
                  <User className="w-8 h-8 text-gray-900 dark:text-white" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {opponent.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rating: {opponent.rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              No duel ongoing.
            </p>
            <button
              onClick={handleCloseAndNavigate}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Return to Duels
            </button>
          </div>
        )}
      </div>

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg max-w-xs w-full z-50 opacity-100 transition-opacity duration-300 ease-in-out">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default OngoingChallenge;
