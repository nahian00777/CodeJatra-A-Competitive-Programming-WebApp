import React, { act, useState, useEffect } from "react";
import {
  PlayCircle,
  Swords,
  Timer,
  Trophy,
  Users,
  ArrowRight,
  Target,
} from "lucide-react";
import axios from "axios";
import DuelMatchmaking from "../../components/DuelMatchmaking";
import DuelDetails from "../../components/DuelDetails";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const DuelCard = ({ title, children }) => (
  <div className=" dark:bg-gray-800 rounded-xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const StatItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

function Duel() {
  const [isSearching, setIsSearching] = useState(false);
  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const [duelRequests, setDuelRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [duelStat, setduelStat] = useState([]);
  const [leaderboardData, setleaderboardData] = useState([]);
  const [selectedDuel, setSelectedDuel] = useState(null);
  const [duels, setDuels] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const userName = useSelector((state) => state.user.username);
  const handle = useSelector((state) => state.user.handle);

  const filteredDuels = duels.filter((duel) => {
    if (filter === "all") return true;
    const isWinner = duel.winner === currentUserId;
    return filter === "Won" ? isWinner : !isWinner;
  });

  useEffect(() => {
    // const fetchDuelRequests = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:3000/api/v1/duel/checkNew",
    //       {
    //         withCredentials: true,
    //       }
    //     );

    //     if (response.data.success) {
    //       const newRequests = response.data.data;
    //       setDuelRequests(newRequests);
    //       // console.log(newRequests.length);
    //       // newRequests.forEach((request) => {
    //       //   toast.info(`New duel request from ${request.user1.username}`);
    //       // });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching duel requests:", error);
    //   }
    // };

    // const intervalDuel = setInterval(fetchDuelRequests, 10000); // Fetch every 10 seconds

    const updateActivity = async () => {
      try {
        await axios.post(
          "http://localhost:3000/api/v1/users/updateActivity",
          {},
          {
            withCredentials: true, // Ensure cookies are sent
          }
        );
        console.log("Activity updated");
      } catch (error) {
        console.error("Error updating activity:", error);
      }
    };

    const interval = setInterval(updateActivity, 10000); // Update every 2 minutes
    return () => clearInterval({ interval }); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchProblems = async () => {
      console.log(
        "fetching problem data script executed with handle: ",
        handle
      );
      try {
        await axios.post(
          "http://localhost:3000/api/v1/problems/fetchProblems",
          {
            handle,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("fetching problem data script executed");
      } catch (error) {
        console.error("Error running fetching problem data: ", error);
      }
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/fetchLeaderboard`
        );

        setleaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:3000/api/v1/users/getCurrentUser",
          {
            withCredentials: true,
          }
        );
        setCurrentUserId(userResponse.data.data._id);

        const duelResponse = await axios.get(
          "http://localhost:3000/api/v1/duel/recentDuels",
          {
            withCredentials: true,
          }
        );
        setDuels(duelResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDuelStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/duel/fetchDuelStats`, // URL
          {
            params: { handle }, // Query parameters
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Duel stats:", response.data);
        // Handle the response data as needed
        setduelStat(response.data);
      } catch (error) {
        console.error("Error fetching duel stats: ", error);
      }
    };

    fetchDuelStats();
  }, []);

  const stats = {
    totalDuels: 48,
    wins: 32,
    winRate: 66.7,
    currentStreak: 5,
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Duel Arena
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Challenge other programmers in real-time coding battles
          </p>
        </div>
        <div className="flex item-center mx-2 my-2">
          <button
            onClick={() => setShowMatchmaking(true)}
            disabled={isSearching}
            className={`px-6 py-3 mx-5 rounded-lg flex items-center gap-2 text-white font-medium transition-all
            ${
              isSearching
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Swords className="w-5 h-5" />
            {isSearching ? "Searching..." : "Start Duel"}
          </button>

          {/* Ongoing Challenge Button */}
          <button
            onClick={() => navigate("/user/ongoing-challenge")} // Navigate to the Ongoing Challenge page
            className="px-6 py-3 rounded-lg flex items-center gap-2 bg-green-600 text-white font-medium hover:bg-green-700 transition-all"
          >
            <PlayCircle className="w-5 h-5" />
            Ongoing Challenge
          </button>
        </div>

        {/* Ongoing Challenge Button */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DuelCard title="Your Statistics">
          <div className="grid grid-cols-2 gap-6">
            <StatItem
              icon={Swords}
              label="Total Duels"
              value={duelStat.totalDuels}
            />
            <StatItem icon={Trophy} label="Wins" value={duelStat.duelWon} />
            <StatItem
              icon={Target}
              label="Win Rate"
              value={`${(duelStat.duelWon / duelStat.totalDuels) * 100}%`}
            />
            <StatItem
              icon={Timer}
              label="Current Streak"
              value={duelStat.streak}
            />
          </div>
        </DuelCard>
        <DuelCard title="Current Rankings">
          <div className="space-y-4">
            {leaderboardData.slice(0, 3).map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    #{index + 1}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {player.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {player.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end pt-4">
            <button
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
              onClick={() => {
                navigate("/user/leaderboard");
                activeItem("leaderboard");
              }} // Redirect to the leaderboard page
            >
              View Full Leaderboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </DuelCard>
      </div>

      <DuelCard title="Recent Duels">
        <div className="space-y-4">
          {filteredDuels.map((duel) => {
            const opponent =
              duel.user1[0]._id === currentUserId
                ? duel.user2[0]
                : duel.user1[0];
            const result = duel.winner === currentUserId ? "Won" : "Lost";

            return (
              <div
                key={duel._id}
                onClick={() => setSelectedDuel(duel)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      vs {opponent?.username || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {duel.problem.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`font-medium ${
                      result === "Won" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {result}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(duel.startTime).toLocaleString()}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            );
          })}

          {/* Add this part for full history navigation */}
          <div
            onClick={() => navigate("/user/duel-history")} // Update with your route
            className="flex items-center justify-center p-3 mt-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
          >
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              View Full History
            </span>
            <ArrowRight className="w-5 h-5 text-gray-400 ml-2" />
          </div>
        </div>
      </DuelCard>

      {showMatchmaking && (
        <DuelMatchmaking onClose={() => setShowMatchmaking(false)} />
      )}
      {selectedDuel && (
        <DuelDetails
          duel={selectedDuel}
          currentUserId={currentUserId}
          onClose={() => setSelectedDuel(null)}
        />
      )}
    </div>
  );
}

export default Duel;
