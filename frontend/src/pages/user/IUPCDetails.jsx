import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
// import { useTheme } from '../hooks/useTheme';

const contests = [
  {
    id: '1',
    name: 'BUET IUPC 2024',
    host: 'BUET Computer Club',
    date: '2024-04-15',
    duration: '5 hour',
    location: 'BUET Academic Building',
    platform: {
      name: 'Hackerrank',
      url: 'https://www.hackerrank.com'
    }
  },
  {
    id: '2',
    name: 'DU CSE Fest Programming Contest',
    host: 'DU Computer Science & Engineering',
    date: '2024-05-20',
    duration: '4 hour',
    location: 'DU Academic Building',
    platform: {
      name: 'Codeforces',
      url: 'https://www.codeforces.com'
    }
  },
  {
    id: '3',
    name: 'SUST Inter University Programming Contest',
    host: 'SUST Computer Club',
    date: '2024-06-10',
    duration: '5 hour',
    location: 'SUST Campus',
    platform: {
      name: 'UVa Online Judge',
      url: 'https://onlinejudge.org'
    }
  }
];

const IUPCDetails = () => {

  const addToCalendar = (contest) => {
    const startDate = new Date(contest.date);
    const endDate = new Date(startDate.getTime() + parseInt(contest.duration) * 60 * 60 * 1000);

    const event = {
      text: `${contest.name} at ${contest.location}`,
      dates: `${startDate.toISOString()}/${endDate.toISOString()}`,
      details: `Host: ${contest.host}\nPlatform: ${contest.platform.name}\nLocation: ${contest.location}`
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates.replace(/[-:]/g, '')}&details=${encodeURIComponent(event.details)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
      <div className="flex flex-col items-center px-4 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Upcoming IUPCS</h1>
        <table className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-600">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Contest Name
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ">
                Host
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Platform
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Calendar
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 bg-white}`}>
            {contests.map((contest) => (
              <tr key={contest.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contest.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contest.host}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(contest.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contest.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contest.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a
                    href={contest.platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {contest.platform.name}
                    <ExternalLink size={14} />
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm-center">
                  <button
                    onClick={() => addToCalendar(contest)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    title="Add to Calendar"
                  >
                    <Calendar size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default IUPCDetails;
