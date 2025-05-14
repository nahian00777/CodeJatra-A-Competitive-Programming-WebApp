import React from "react";
import { useEffect, useState } from "react";
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

// Mock data - replace with actual API data
const duelRatingHistory = [
  { date: "2023-01", rating: 1200 },
  { date: "2023-02", rating: 1250 },
  { date: "2023-03", rating: 1300 },
  { date: "2023-04", rating: 1280 },
  { date: "2023-05", rating: 1350 },
];

const colors = ["#4CAF50", "#2196F3", "#00BCD4", "#9C27B0", "#E91E63"];

function CFProfile() {
  const username = useSelector((state) => state.user.username);
  const handle = useSelector((state) => state.user.handle);

  const [codeforcesRatingHistory, setCodeforcesRatingHistory] = useState([]);
  const [duelRatingHistory, setduelRatingHistory] = useState([]);
  const [submissionStats, setsubmissionStats] = useState([]);
  const [solvedRatings, setsolvedRatings] = useState([]);
  const [ProfilePicture, setProfilePicture] = useState("");
  const [Position, setPosition] = useState(42);
  const [Rating, setRating] = useState(0);
  const [duelWon, setduelWon] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDuelStats = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/duel/fetchDuelStats`, // URL
          {
            params: { handle }, // Query parameters
            headers: { "Content-Type": "application/json" },
          }
        );

        // Handle the response data as needed
        setRating(response.data.currentDuelRating);
        setduelWon(response.data.duelWon);
        setProfilePicture(response.data.avatar);
        setduelRatingHistory(response.data.duelRatingHistory);
      } catch (error) {
        console.error("Error fetching duel stats: ", error);
      }
    };

    fetchDuelStats();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/users/fetchLeaderboard`
        );

        const leaderboardData = response.data;
        const userIndex =
          leaderboardData.findIndex((user) => user.handle === handle) + 1;
        setPosition(userIndex);
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchRatingHistory = asyncHandler(async () => {
      // console.log( "fetchRatingHistory executed " +handle);

      const response = await axios.get(
        `${apiUrl}/api/v1/problems/fetchRatingHistory`,
        {
          params: { handle }, // Pass the handle as a query parameter
          headers: { "Content-Type": "application/json" },
        }
      );
      setCodeforcesRatingHistory(response.data);
    });

    fetchRatingHistory();
  }, []);

  useEffect(() => {
    const fetchSubmissionStats = asyncHandler(async () => {
      const response = await axios.get(
        `${apiUrl}/api/v1/problems/fetchSubmissionStats`,
        {
          params: { handle }, // Pass the handle as a query parameter
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(response.data)
      setsubmissionStats(response.data);
    });

    fetchSubmissionStats();
  }, []);

  useEffect(() => {
    const fetchRatingCount = asyncHandler(async () => {
      const response = await axios.get(
        `${apiUrl}/api/v1/problems/fetchRatingCount`,
        {
          params: { handle }, // Pass the handle as a query parameter
          headers: { "Content-Type": "application/json" },
        }
      );
      setsolvedRatings(response.data);
      // console.log("Solved Ratings:", response.data);
    });

    fetchRatingCount();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
          <img
            src={ProfilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl text-gray-400 font-bold ">{username}</h1>
        <a
          href={`https://codeforces.com/profile/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 mb-1 transition"
        >
          {handle}
          <ExternalLink className="w-3 h-3 inline-block ml-1" />
        </a>
        <p className="text-xl font-semibold">Duel Rating: {Rating}</p>
      </div>

      {/* Dual Rating Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Duel Rating History</h2>
          <LineChart width={700} height={300} data={duelRatingHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="newRating" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="space-y-4 flex flex-col justify-center">
          <div className="bg-gray-300 p-6 rounded-lg shadow-md">
            <div className="h-40 flex items-center gap-4">
              <Trophy className="w-12 h-12 text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold">Leaderboard Position</h3>
                <p className="text-3xl font-bold text-blue-600">#{Position}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg shadow-md">
            <div className="h-40 flex items-center gap-4">
              <Users className="w-12 h-12 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Duels Won</h3>
                <p className="text-3xl font-bold text-green-600">{duelWon}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CodeForces Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-300 p-6 rounded-lg shadow-md lg:col-span-2 flex flex-col items-center gap-8">
          <h2 className="text-xl font-bold mb-4">CodeForces Rating History</h2>
          <LineChart width={700} height={400} data={codeforcesRatingHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="newRating" stroke="#2196F3" />
          </LineChart>
        </div>
        <div className="bg-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Submission Statistics</h2>
          <PieChart width={400} height={350}>
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
                /> // Assign color
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Solved Problems Rating Distribution */}
      <div className="bg-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Solved Problems by Rating</h2>
        <div className="flex justify-center w-full">
          <BarChart width={1200} height={400} data={solvedRatings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3F51B5" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default CFProfile;
