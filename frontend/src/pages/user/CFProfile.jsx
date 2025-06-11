import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { ExternalLink, Trophy, Users } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { asyncHandler } from "../../../../backend/utils/AsyncHandler";

const colors = ["#4CAF50", "#2196F3", "#00BCD4", "#9C27B0", "#E91E63"];

function CFProfile() {
  const username = useSelector((state) => state.user.username);
  const handle = useSelector((state) => state.user.handle);

  const [codeforcesRatingHistory, setCodeforcesRatingHistory] = useState([]);
  const [duelRatingHistory, setDuelRatingHistory] = useState([]);
  const [submissionStats, setSubmissionStats] = useState([]);
  const [solvedRatings, setSolvedRatings] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [position, setPosition] = useState(42);
  const [rating, setRating] = useState(0);
  const [duelWon, setDuelWon] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [duelRes, leaderboardRes, ratingRes, statsRes, ratingCountRes] =
          await Promise.all([
            axios.get(`${apiUrl}/api/v1/duel/fetchDuelStats`, {
              params: { handle },
            }),
            axios.get(`${apiUrl}/api/v1/users/fetchLeaderboard`),
            axios.get(`${apiUrl}/api/v1/problems/fetchRatingHistory`, {
              params: { handle },
            }),
            axios.get(`${apiUrl}/api/v1/problems/fetchSubmissionStats`, {
              params: { handle },
            }),
            axios.get(`${apiUrl}/api/v1/problems/fetchRatingCount`, {
              params: { handle },
            }),
          ]);

        setRating(duelRes.data.currentDuelRating);
        setDuelWon(duelRes.data.duelWon);
        setProfilePicture(duelRes.data.avatar);
        setDuelRatingHistory(duelRes.data.duelRatingHistory);

        const index =
          leaderboardRes.data.findIndex((user) => user.handle === handle) + 1;
        setPosition(index);

        setCodeforcesRatingHistory(ratingRes.data);
        setSubmissionStats(statsRes.data);
        setSolvedRatings(ratingCountRes.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [apiUrl, handle]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-400 shadow-lg">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">{username}</h1>
        <a
          href={`https://codeforces.com/profile/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline flex justify-center items-center gap-1 mt-1"
        >
          {handle} <ExternalLink className="w-4 h-4" />
        </a>
        <p className="mt-2 text-lg font-semibold text-gray-600">
          Duel Rating: <span className="text-indigo-600">{rating}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-[#1f2937] p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-center text-white">
            Duel Rating History
          </h2>
          <LineChart width={700} height={300} data={duelRatingHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="newRating"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </div>
        <div className="space-y-6">
          <div className="bg-[#1f2937] p-6 rounded-xl shadow-lg flex items-center gap-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <div>
              <p className="text-2xl text-white">Leaderboard Position</p>
              <p className="text-4xl font-bold text-blue-600">#{position}</p>
            </div>
          </div>
          <div className="bg-[#1f2937] p-6 rounded-xl shadow-lg flex items-center gap-4">
            <Users className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-2xl text-white">Duels Won</p>
              <p className="text-4xl font-bold text-green-600">{duelWon}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-[#1f2937] p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-center text-white">
            Codeforces Rating History
          </h2>
          <LineChart width={700} height={350} data={codeforcesRatingHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="newRating"
              stroke="#2196F3"
              strokeWidth={2}
            />
          </LineChart>
        </div>
        <div className="bg-[#1f2937] p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-center text-white">
            Submission Statistics
          </h2>
          <PieChart width={400} height={320}>
            <Pie
              data={submissionStats}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="count"
              nameKey="status"
            >
              {submissionStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div className=" bg-[#1f2937] p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Solved Problems by Rating
        </h2>
        <BarChart
          width={1000}
          height={400}
          data={solvedRatings}
          className="mx-auto"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#3F51B5" barSize={30} />
        </BarChart>
      </div>
    </div>
  );
}

export default CFProfile;
