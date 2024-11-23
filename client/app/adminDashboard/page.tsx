'use client'
import React, { useEffect, useState } from 'react'
import AdminLeftSideBar from '../components/adminLeftSideBar';
import { AUTH_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Page() {
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [companyDetails, setCompanyDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${AUTH_SERVICE_URL}/get-userDetails`, {
          params: { adminEmail: "admin@gmail.com" },
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setUserDetails(response.data.userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${AUTH_SERVICE_URL}/get-companyDetails`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setCompanyDetails(response.data.companyDetails);
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyDetails();
  }, []);

  const chartData = {
    labels: ['Users', 'Companies'],
    datasets: [
      {
        label: 'Counts',
        data: [userDetails.length, companyDetails.length], 
        backgroundColor: ['#4CAF50', '#FF9800'],
        borderColor: ['#388E3C', '#F57C00'], 
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top' as const, 
        },
    },
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminLeftSideBar />

      <main className="bg-white text-black w-full p-6 sm:p-8 md:p-10 ml-[200px]">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="ml-4">
              <h2 className="font-bold text-2xl sm:text-3xl">Welcome Admin</h2>
            </div>
          </div>
        </header>

        <section className="mt-8">
          <p className="text-gray-500 mb-6">Here is your job listings statistic report</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="font-bold text-3xl mt-2">
                {loading ? "Loading..." : userDetails.length}
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold">Total Companies</h3>
              <p className="font-bold text-3xl mt-2">
                {loading ? "Loading..." : companyDetails.length}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
  <header className="flex justify-between items-center mb-6">
    <h3 className="font-bold text-lg">Application Response</h3>
  </header>
  <div className="mt-6">
    {!loading && (
      <div style={{ width: '400px', height: '300px', margin: '0 auto' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    )}
  </div>
</section>

      </main>
    </div>
  );
}

export default Page;
