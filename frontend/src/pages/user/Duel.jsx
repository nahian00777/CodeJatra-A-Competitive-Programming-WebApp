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
import { useDispatch } from "react-redux"; // sets the new name
import { setUsername, setHandle } from "../../redux/userSlice.jsx"; // importing this only to set the name! delete this when log in page is up and running

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
  const [selectedDuel, setSelectedDuel] = useState(null);
  const dispatch = useDispatch();
  dispatch(setUsername("Brinto")); // Temporary setup
  dispatch(setHandle("-is-this-dft_")); // Temporary setup

  useEffect(() => {
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
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchProblems = async () => {
      const handle = "-is-this-dft_"; // Temporary setup
      // try {
      //     await axios.post("http://localhost:3000/api/v1/problems/fetchProblems", {
      //       handle
      //     }, {
      //       headers: { "Content-Type": "application/json" }
      //     });
      //     console.log("fetching problem data script executed");
      // } catch (error) {
      //     console.error("Error running fetching problem data: ", error);
      // }
    };

    fetchProblems();
  }, []);

  const stats = {
    totalDuels: 48,
    wins: 32,
    winRate: 66.7,
    currentStreak: 5,
  };

  const navigate = useNavigate();

  const recentDuels = [
    {
      id: 1,
      opponent: "Sarah Wilson",
      problem: "Binary Tree Traversal",
      result: "Won",
      time: "2h ago",
      code: "// Your solution...\nfunction traverse(root) {\n  if (!root) return;\n  console.log(root.val);\n  traverse(root.left);\n  traverse(root.right);\n}",
      opponentCode: "// Opponent solution...",
      timeSpent: "25:30",
      rating: 1850,
      ratingChange: "+15",
    },
    {
      id: 2,
      opponent: "Mike Johnson",
      problem: "Dynamic Programming",
      result: "Lost",
      time: "5h ago",
      code: "// Your solution...",
      opponentCode: "// Opponent solution...",
      timeSpent: "45:00",
      rating: 2100,
      ratingChange: "-12",
    },
    {
      id: 3,
      opponent: "Emma Davis",
      problem: "Graph Algorithms",
      result: "Won",
      time: "1d ago",
      code: "// Your solution...",
      opponentCode: "// Opponent solution...",
      timeSpent: "35:15",
      rating: 1920,
      ratingChange: "+18",
    },
  ];

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
              value={stats.totalDuels}
            />
            <StatItem icon={Trophy} label="Wins" value={stats.wins} />
            <StatItem
              icon={Target}
              label="Win Rate"
              value={`${stats.winRate}%`}
            />
            <StatItem
              icon={Timer}
              label="Current Streak"
              value={stats.currentStreak}
            />
          </div>
        </DuelCard>
        <DuelCard title="Current Rankings">
          <div className="space-y-4">
            {[
              { name: "Alex Chen", rating: 2150, change: "+15" },
              { name: "Maria Garcia", rating: 2080, change: "+8" },
              { name: "John Smith", rating: 2045, change: "-5" },
            ].map((player, index) => (
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
                  <span
                    className={
                      player.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {player.change}
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
          {recentDuels.map((duel) => (
            <div
              key={duel.id}
              onClick={() => setSelectedDuel(duel)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    vs {duel.opponent}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {duel.problem}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`font-medium ${
                    duel.result === "Won" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {duel.result}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {duel.time}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}

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
          onClose={() => setSelectedDuel(null)}
        />
      )}
    </div>
  );
}

export default Duel;
