import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LandingPage from "./pages/general/LandingPage";
import DashBoard from "./pages/user/DashBoard";
import IUPCDetails from "./pages/user/IUPCDetails";
import Duel from "./pages/user/Duel";
import DuelRoom from "./pages/user/DuelRoom";
import DuelHistory from "./pages/user/DuelHistory";
import LeaderBoard from "./pages/user/LeaderBoard";
import CFProfile from "./pages/user/CFProfile";
import Sidebar from "./components/Sidebar";
import ContestDetails from "./pages/user/ContestDetails";
import Topbar from "./components/Topbar";
import OngoingChallenge from "./pages/user/OngoingChallenge";
import Chat from "./components/chat";
import LoginPage from "./pages/general/Login";
import RegisterPage from "./pages/general/register";
import NotificationContainer from "./components/notificationContainer"; // Import the NotificationContainer
import axios from "axios";

function AppContent() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const checkTokensAndRedirect = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/getCurrentUser",
        {
          withCredentials: true,
        }
      );
      // console.log("Response:", response);

      if (response.data.statuscode === 200) {
        // Tokens are valid, redirect to duel page
        navigate("/user/duel");
      } else {
        // Tokens are invalid, redirect to login page
        navigate("/login");
      }
    } catch (error) {
      console.error("Error verifying tokens:", error);
      // If there's an error, redirect to login page
    }
  };

  useEffect(() => {
    checkTokensAndRedirect();
  }, []);

  const fetchDuelRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/duel/checkNew",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const newRequests = response.data.data;
        setNotifications(
          newRequests.map((request) => ({
            id: request._id,
            message: `Duel request from ${request.user1[0].username}`,
            sender: request.user1[0].username,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching duel requests:", error);
    }
  };

  useEffect(() => {
    fetchDuelRequests(); // Initial fetch
    const intervalId = setInterval(fetchDuelRequests, 10000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/duel/acceptDuel/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      const duelDataFromOp = response.data.data;
      // console.log("Duel full data:", duelData);
      setNotifications(notifications.filter((x) => x.id !== id));

      // Pass the duelId to the ongoing-challenge page
      // console.log("Duel data:", duelDataFromOp);
      navigate("/user/ongoing-challenge", {
        state: { duelDataFromOp, accepted: true },
      });
    } catch (error) {
      console.error("Failed to accept duel request:", error);
    }
  };
  const handleReject = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/duel/rejectDuel/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      // const duelDataFromOp = response.data.data;
      // console.log("Duel full data:", duelData);
      setNotifications(notifications.filter((x) => x.id !== id));
    } catch (error) {
      console.error("Failed to accept duel request:", error);
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/user/*"
          element={
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="iupc-details" element={<IUPCDetails />} />
                    <Route path="duel" element={<Duel />} />
                    <Route path="duel-room" element={<DuelRoom />} />
                    <Route path="duel-history" element={<DuelHistory />} />
                    <Route path="leaderboard" element={<LeaderBoard />} />
                    <Route path="cf-profile" element={<CFProfile />} />
                    <Route
                      path="contest-details"
                      element={<ContestDetails />}
                    />
                    <Route
                      path="ongoing-challenge"
                      element={<OngoingChallenge />}
                    />
                    <Route path="chat" element={<Chat />} />
                    <Route path="login" element={<LoginPage />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
      <NotificationContainer
        onAccept={handleAccept}
        onReject={handleReject}
        notifications={notifications}
      />
    </div>
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
