import React, { useState, useEffect } from "react";
import { X, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DuelMatchmaking = ({ onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("any");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/getAllUsers"
        );
        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Fetch current user
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/getCurrentUser",
          { withCredentials: true } // Ensure cookies are sent
        );

        console.log(response);

        if (response.data.success) {
          setCurrentUser(response.data.data); // Ensure this matches your response structure
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, []);

  const sendDuelRequest = async (opponentHandle, rating) => {
    if (!currentUser) {
      console.error("Current user not found");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/duel/createDuel",
        {
          user1Id: currentUser.handle,
          user2Id: opponentHandle,
          rating: Number(rating),
        }, // Ensure this matches your request structure
        { withCredentials: true } // Ensure cookies are sent
      );

      if (response.data.success) {
        console.log("Duel request sent successfully");
        navigate("/user/duel-room", {
          state: {
            opponentHandle,
            problemUrl: "https://codeforces.com/problemset/problem/1/A",
          },
        });
      }
    } catch (error) {
      console.error("Error sending duel request:", error);
    }
  };

  const handleChallenge = (opponent) => {
    sendDuelRequest(opponent.handle, selectedRating);
  };

  const filteredUsers = users.filter(
    (user) =>
      user._id !== currentUser?._id && // Exclude the current user
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
                        CF Handle: {user.handle}
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
    </div>
  );
};

export default DuelMatchmaking;
