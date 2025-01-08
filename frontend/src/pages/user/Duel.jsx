import React, { useState } from "react";
import { Swords, Timer, Trophy, Users, ArrowRight, Target } from "lucide-react";

const DuelCard = ({ title, children }) => (
  <div className="dark:bg-gray-800 rounded-xl p-6 shadow-sm">
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

const Duel = () => {
  const [isSearching, setIsSearching] = useState(false);

  const stats = {
    totalDuels: 48,
    wins: 32,
    winRate: 66.7,
    currentStreak: 5,
  };

  const handleStartDuel = () => {
    setIsSearching(true);
    // Simulated opponent finding logic would go here
  };

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
        <button
          onClick={handleStartDuel}
          disabled={isSearching}
          className={`px-6 py-3 rounded-lg flex items-center gap-2 text-white font-medium transition-all
            ${
              isSearching
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          <Swords className="w-5 h-5" />
          {isSearching ? "Searching..." : "Start Duel"}
        </button>
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
        </DuelCard>
      </div>

      <DuelCard title="Recent Duels">
        <div className="space-y-4">
          {[
            {
              opponent: "Sarah Wilson",
              problem: "Binary Tree Traversal",
              result: "Won",
              time: "2h ago",
            },
            {
              opponent: "Mike Johnson",
              problem: "Dynamic Programming",
              result: "Lost",
              time: "5h ago",
            },
            {
              opponent: "Emma Davis",
              problem: "Graph Algorithms",
              result: "Won",
              time: "1d ago",
            },
          ].map((duel, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
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
        </div>
      </DuelCard>
    </div>
  );
};

export default Duel;
