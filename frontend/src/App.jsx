import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import the Redux store
import LandingPage from "./pages/general/LandingPage";
import DashBoard from "./pages/user/DashBoard";
import IUPCDetails from "./pages/user/IUPCDetails";
import Duel from "./pages/user/Duel";
import DuelRoom from "./pages/user/DuelRoom";
import DuelHistory from "./pages/user/Duelhistory";
import LeaderBoard from "./pages/user/LeaderBoard";
import CFProfile from "./pages/user/CFProfile";
import Sidebar from "./components/Sidebar";
import ContestDetails from "./pages/user/ContestDetails";
import Topbar from "./components/Topbar";
import OngoingChallenge from "./pages/user/OngoingChallenge";
import Chat from "./components/chat";

function AppContent() {
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
            <div className="flex-1 flex flex-col">
              <Topbar /> {/* Topbar remains persistent */}
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="dashboard" element={<DashBoard />} />
                  <Route path="iupc-details" element={<IUPCDetails />} />
                  <Route path="duel" element={<Duel />} />
                  <Route path="duel-room" element={<DuelRoom />} />
                  <Route path="duel-history" element={<DuelHistory />} />
                  <Route path="leaderboard" element={<LeaderBoard />} />
                  <Route path="cf-profile" element={<CFProfile />} />
                  <Route path="contest-details" element={<ContestDetails />} />
                  <Route path="ongoing-challenge" element={<OngoingChallenge />} />
                  <Route path="chat" element={<Chat />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
