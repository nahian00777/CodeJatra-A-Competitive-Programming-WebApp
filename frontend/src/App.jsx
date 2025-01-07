import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/general/LandingPage";
import DashBoard from "./pages/user/DashBoard";
import IUPCDetails from "./pages/user/IUPCDetails";
import Duel from "./pages/user/Duel";
import LeaderBoard from "./pages/user/LeaderBoard";
import CFProfile from "./pages/user/CFProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/dashboard" element={<DashBoard />} />
      <Route path="/user/iupc-details" element={<IUPCDetails />} />
      <Route path="/user/duel" element={<Duel />} />
      <Route path="/user/leaderboard" element={<LeaderBoard />} />
      <Route path="/user/cf-profile" element={<CFProfile />} />
    </Routes>
  );
}

export default App;
