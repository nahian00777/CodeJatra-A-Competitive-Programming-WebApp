import React from 'react';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Trophy, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { asyncHandler } from '../../../../backend/utils/AsyncHandler';

// Mock data - replace with actual API data
const duelRatingHistory = [
  { date: '2023-01', rating: 1200 },
  { date: '2023-02', rating: 1250 },
  { date: '2023-03', rating: 1300 },
  { date: '2023-04', rating: 1280 },
  { date: '2023-05', rating: 1350 },
];

const colors = ["#4CAF50", "#2196F3", "#00BCD4", "#9C27B0", "#E91E63"];

function CFProfile() {
  const username = useSelector((state) => state.user.username);
  const handle = useSelector((state) => state.user.handle);
  const [codeforcesRatingHistory, setCodeforcesRatingHistory] = useState([]);
  const [submissionStats, setsubmissionStats] = useState([]);
  const [solvedRatings, setsolvedRatings] = useState([]);


  useEffect(() => {
    const fetchRatingHistory = asyncHandler(async () => {

      // console.log( "fetchRatingHistory executed " +handle);

      const response = await axios.get(
        "http://localhost:3000/api/v1/problems/fetchRatingHistory",
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

      console.log( "fetchSubmissionStats executed " +handle);

      const response = await axios.get(
        "http://localhost:3000/api/v1/problems/fetchSubmissionStats",
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
        "http://localhost:3000/api/v1/problems/fetchRatingCount",
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
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=400&h=400&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl text-gray-400 font-bold mb-2">{username}</h1>
        <p className="text-gray-400 mb-1">{handle}</p>
        <p className="text-xl font-semibold text-blue-600">Duel Rating: 1350</p>
      </div>

      {/* Dual Rating Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Dual Rating History</h2>
          <LineChart width={700} height={300} data={duelRatingHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="space-y-4 flex flex-col justify-center">
          <div className="bg-gray-300 p-6 rounded-lg shadow-md">
            <div className="h-40 flex items-center gap-4">
              <Trophy className="w-12 h-12 text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold">Leaderboard Position</h3>
                <p className="text-3xl font-bold text-blue-600">#42</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg shadow-md">
            <div className="h-40 flex items-center gap-4">
              <Users className="w-12 h-12 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Duels Won</h3>
                <p className="text-3xl font-bold text-green-600">127</p>
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
                 <Cell key={`cell-${index}`} fill={colors[index % colors.length]} /> // Assign color
                 
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
        <div className='flex justify-center w-full'>
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