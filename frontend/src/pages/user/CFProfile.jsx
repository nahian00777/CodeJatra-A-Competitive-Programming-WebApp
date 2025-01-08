import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Trophy, Users } from 'lucide-react';

// Mock data - replace with actual API data
const duelRatingHistory = [
  { date: '2023-01', rating: 1200 },
  { date: '2023-02', rating: 1250 },
  { date: '2023-03', rating: 1300 },
  { date: '2023-04', rating: 1280 },
  { date: '2023-05', rating: 1350 },
];

const codeforcesRatingHistory = [
  { date: '2023-01', rating: 1400 },
  { date: '2023-02', rating: 1450 },
  { date: '2023-03', rating: 1500 },
  { date: '2023-04', rating: 1480 },
  { date: '2023-05', rating: 1550 },
];

const submissionStats = [
  { name: 'Accepted', value: 150, color: '#4CAF50' },
  { name: 'Wrong Answer', value: 50, color: '#F44336' },
  { name: 'Time Limit Exceeded', value: 20, color: '#FFC107' },
];

const solvedRatings = [
  { rating: '800-1000', count: 25 },
  { rating: '1000-1200', count: 35 },
  { rating: '1200-1400', count: 20 },
  { rating: '1400-1600', count: 15 },
  { rating: '1600-1800', count: 10 },
];

function CFProfile() {
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
        <h1 className="text-3xl font-bold mb-2">John Doe</h1>
        <p className="text-gray-600 mb-1">@codeMaster</p>
        <p className="text-xl font-semibold text-blue-600">Dual Rating: 1350</p>
      </div>

      {/* Dual Rating Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-40 flex items-center gap-4">
              <Trophy className="w-12 h-12 text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold">Leaderboard Position</h3>
                <p className="text-3xl font-bold text-blue-600">#42</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
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
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2 flex flex-col items-center gap-8">
          <h2 className="text-xl font-bold mb-4">CodeForces Rating History</h2>
          <LineChart width={700} height={400} data={codeforcesRatingHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rating" stroke="#2196F3" />
          </LineChart>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Submission Statistics</h2>
          <PieChart width={400} height={350}>
            <Pie
              data={submissionStats}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {submissionStats.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Solved Problems Rating Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
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