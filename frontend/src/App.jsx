import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/general/LandingPage";
import DashBoard from "./pages/user/DashBoard";
import IUPCDetails from "./pages/user/IUPCDetails";
import Duel from "./pages/user/Duel";
import LeaderBoard from "./pages/user/LeaderBoard";
import CFProfile from "./pages/user/CFProfile";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import ContestDetails from "./pages/user/ContestDetails";

function App() {
  return (
    <Routes>
      {/* Landing page route */}
      <Route path="/" element={<LandingPage />} />

      {/* Group routes for user-related pages */}
      <Route
        path="/user/*"
        element={
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar /> {/* Sidebar remains persistent */}
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="iupc-details" element={<IUPCDetails />} />
                <Route path="duel" element={<Duel />} />
                <Route path="leaderboard" element={<LeaderBoard />} />
                <Route path="cf-profile" element={<CFProfile />} />
                <Route path="contest-details" element={<ContestDetails />} />
              </Routes>
            </main>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
