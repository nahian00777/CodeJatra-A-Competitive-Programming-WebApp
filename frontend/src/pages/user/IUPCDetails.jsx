import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IUPCDetails = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/iupcs/get-iupc"
        );
        // Assuming the API response is structured as response.data.data
        setContests(response.data.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
        toast.error("Error fetching contests.");
      }
    };
    fetchContests();
  }, []);

  const addToCalendar = (contest) => {
    const startDate = new Date(contest.date);
    const endDate = new Date(
      startDate.getTime() + parseInt(contest.duration) * 60 * 60 * 1000
    );

    const event = {
      text: `${contest.contestName} at ${contest.location}`,
      dates: `${startDate.toISOString()}/${endDate.toISOString()}`,
      details: `Host: ${contest.host}\nPlatform: ${contest.platform.name}\nLocation: ${contest.location}`,
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.text
    )}&dates=${event.dates.replace(/[-:]/g, "")}&details=${encodeURIComponent(
      event.details
    )}`;
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Upcoming IUPCs
      </h1>
      <div className="dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
              <th className="px-4 py-2">Contest Name</th>
              <th className="px-4 py-2">Host</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Platform</th>
              <th className="px-4 py-2 text-center">Calendar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {contests.map((contest) => (
              <tr
                key={contest.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                  {contest.contestName}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {contest.host}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {new Date(contest.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {contest.duration}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {contest.location}
                </td>
                <td className="px-4 py-3 text-blue-600 dark:text-blue-400">
                  <a
                    href= {contest.platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {contest.platform.name}
                  </a>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => addToCalendar(contest)}
                    className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    title="Add to Calendar"
                  >
                    <Calendar className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default IUPCDetails;
