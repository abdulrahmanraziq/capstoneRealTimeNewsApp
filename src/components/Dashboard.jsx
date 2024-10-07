import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import AxiosService from "../utils/AxioService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [counts, setCounts] = useState(null); // Initialize with null for loading state
  const topics = ["Politics", "Sports", "Business", "Entertainment", "Education"]; // Remove duplicate topics
  let email = sessionStorage.getItem("email");

  const getMailCount = async () => {
    try {
      let { message, topicCount } = await AxiosService.get(`${ApiRoutes.GET_MAIL_COUNT.path}/${email}`, { authenticate: ApiRoutes.GET_MAIL_COUNT.auth });
      if (topicCount && topicCount.length > 0) {
        const extractedCounts = topicCount.map(item => item.count);
        setCounts(extractedCounts);
      } else {
        setCounts([]);
      }

    } catch (error) {
      toast.error(error.message || "Failed to retrieve data");
      setCounts([]);
    }
  }

  useEffect(() => {
    getMailCount();
  }, []);

  const data = {
    labels: topics,
    datasets: [
      {
        label: 'Subscription Counts',
        data: counts || [], // Use counts if available, otherwise an empty array
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-center">Each Topic Sent to Email</h2>
      <div className="col-md-4 offset-md-4">
        {counts === null ? (
          <p>Loading...</p> // Show loading state while data is being fetched
        ) : counts.length > 0 ? (
          <Pie data={data} /> // Render the chart if counts are available
        ) : (
          <h1 className="text-center mt-3">No Email Sent for this user</h1> // Show fallback message when no data is available
        )}
      </div>
    </div>
  );
}

export default Dashboard;