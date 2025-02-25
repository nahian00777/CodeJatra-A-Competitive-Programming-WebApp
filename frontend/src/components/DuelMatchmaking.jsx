import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDuelData } from "../redux/userSlice.jsx";
import { X, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DuelMatchmaking = ({ onClose, onlineUsers }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("any");
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Timer state

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/getCurrentUser",
          { withCredentials: true }
        );

        if (response.data.success) {
          setCurrentUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const checkInvitationStatus = async (duelId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/duel/checkInvitation/${duelId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error checking invitation status:", error);
      return false;
    }
  };

  const dropDuel = async (duelId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/duel/dropDuel/${duelId}`
      );
      console.log("Duel dropped successfully.");
    } catch (error) {
      console.error("Error dropping duel:", error);
    }
  };

  const sendDuelRequest = async (opponentHandle, rating) => {
    if (!currentUser) {
      console.error("Current user not found");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/duel/createDuel",
        {
          user1Id: String(currentUser.handle),
          user2Id: String(opponentHandle),
          rating: Number(rating),
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Duel request sent successfully");
        setLoading(true);
        setTimeLeft(30); // Reset timer

        const duelId = response.data.data._id;
        const intervalId = setInterval(async () => {
          const invitation = await checkInvitationStatus(duelId);
          console.log("Invitation status:", invitation);
          if (invitation.invitationAccepted) {
            clearInterval(intervalId);
            clearTimeout(timerId);
            clearInterval(countdownId);
            setLoading(false);
            dispatch(setDuelData(response.data.data));
            navigate("/user/ongoing-challenge");
          } else if (invitation.invitationRejected) {
            clearInterval(intervalId);
            clearTimeout(timerId);
            clearInterval(countdownId);
            setLoading(false);
            setErrorMessage("Invitation rejected by opponent.");
          }
        }, 3000);

        const timerId = setTimeout(async () => {
          clearInterval(intervalId);
          clearInterval(countdownId);
          setLoading(false);
          await dropDuel(duelId); // Drop the duel if not accepted
          setErrorMessage("Invitation not accepted in time.");
          setTimeout(() => setErrorMessage(""), 3000);
        }, 30000);

        const countdownId = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(countdownId);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);

        return () => {
          clearInterval(intervalId);
          clearTimeout(timerId);
          clearInterval(countdownId);
        };
      } else {
        if (response.data.message === "No unsolved problem found") {
          setErrorMessage("No unsolved problems available for this rating.");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Error sending duel request:", error);
      setErrorMessage("No Common Unsolved Problem Found.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleChallenge = async (opponent) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/duel/ongoingChallenge",
        { withCredentials: true }
      );
      console.log(response.data.data);
      if (response.data.data.length === 0) {
        sendDuelRequest(opponent.handle, selectedRating);
      } else {
        alert("You already have an ongoing duel with this user.");
      }
    } catch (error) {
      console.error("Error checking ongoing duel:", error);
    }
  };

  const filteredUsers = onlineUsers.filter(
    (user) =>
      user._id !== currentUser?._id &&
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {loading ? (
        <div className="text-white text-xl">
          Waiting For Opponent to Accept Request... {timeLeft}s
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Find an Opponent
          </h2>

          {errorMessage && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-xs w-full z-50 opacity-100 transition-opacity duration-300 ease-in-out">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Rating Range
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="800">800</option>
                <option value="900">900</option>
                <option value="1000">1000</option>
                <option value="1100">1100</option>
                <option value="1200">1200</option>
                <option value="1300">1300</option>
                <option value="1400">1400</option>
                <option value="1500">1500</option>
                <option value="1600">1600</option>
                <option value="1700">1700</option>
                <option value="1800">1800</option>
                <option value="1900">1900</option>
                <option value="2000">2000</option>
                <option value="2100">2100</option>
                <option value="2200">2200</option>
                <option value="2300">2300</option>
                <option value="2400">2400</option>
                <option value="2500">2500</option>
                <option value="2600">2600</option>
                <option value="2700">2700</option>
                <option value="2800">2800</option>
                <option value="2900">2900</option>
                <option value="3000">3000</option>
                <option value="3100">3100</option>
                <option value="3200">3200</option>
                <option value="3300">3300</option>
                <option value="3400">3400</option>
                <option value="3500">3500</option>
              </select>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Online Players
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 bg-green-500`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          CF Handle:
                          <a
                            href={`https://codeforces.com/profile/${user.handle}`}
                            className="text-blue-500 hover:underline"
                            style={{ cursor: 'pointer' }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {user.handle}
                          </a>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleChallenge(user)}
                      className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Challenge
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuelMatchmaking;
