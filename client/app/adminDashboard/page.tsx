"use client";
import React, { useEffect, useState } from "react";
import AdminLeftSideBar from "../components/adminLeftSideBar";
import { AUTH_SERVICE_URL, USER_SERVICE_URL } from "@/utils/constants";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Page() {
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [companyDetails, setCompanyDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${AUTH_SERVICE_URL}/get-userDetails`, {
          params: { adminEmail: "admin@gmail.com" },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setUserDetails(response.data.userDetails || []);
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
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setCompanyDetails(response.data.companyDetails || []);
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyDetails();
  }, []);

  const activeUsers = userDetails.filter(user => !user.isBlock).length;
  const blockedUsers = userDetails.length - activeUsers;
  const activeCompanies = companyDetails.filter(company => !company.isBlock).length;
  const blockedCompanies = companyDetails.length - activeCompanies;

  // Group data by date
  const groupByDate = (data: any[]) => {
    return data.reduce((acc: { [key: string]: number }, item) => {
      const date = new Date(item.createdAt).toLocaleDateString("en-GB");
      acc[date] = (acc[date] || 0) + 1; // Count registrations for each date
      return acc;
    }, {});
  };

  // Group user and company data
  const groupedUserData = groupByDate(userDetails);
  const groupedCompanyData = groupByDate(companyDetails);

  // Chart data for User and Company
  const userBarData = {
    labels: Object.keys(groupedUserData),
    datasets: [
      {
        label: "New Users",
        data: Object.values(groupedUserData),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  const companyBarData = {
    labels: Object.keys(groupedCompanyData),
    datasets: [
      {
        label: "New Companies",
        data: Object.values(groupedCompanyData),
        backgroundColor: "#FF9800",
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminLeftSideBar />
      <main className="bg-white text-black w-full p-6 sm:p-8 md:p-10 ml-[200px]">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="ml-4">
              <h2 className="font-bold text-2xl sm:text-3xl">Welcome Admin</h2>
              <p className="text-gray-500">Analyze user and company statistics</p>
            </div>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Users Overview</h3>
            <div className="mb-4">
              <p>Active Users: {activeUsers}</p>
              <p>Blocked Users: {blockedUsers}</p>
            </div>
            <Pie
              data={{
                labels: ["Active Users", "Blocked Users"],
                datasets: [
                  {
                    data: [activeUsers, blockedUsers],
                    backgroundColor: ["#4CAF50", "#F44336"],
                    hoverBackgroundColor: ["#388E3C", "#D32F2F"],
                  },
                ],
              }}
            />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Companies Overview</h3>
            <div className="mb-4">
              <p>Active Companies: {activeCompanies}</p>
              <p>Blocked Companies: {blockedCompanies}</p>
            </div>
            <Pie
              data={{
                labels: ["Active Companies", "Blocked Companies"],
                datasets: [
                  {
                    data: [activeCompanies, blockedCompanies],
                    backgroundColor: ["#FF9800", "#607D8B"],
                    hoverBackgroundColor: ["#F57C00", "#455A64"],
                  },
                ],
              }}
            />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">User Signup Trend</h3>
            <Bar data={userBarData} />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Company Signup Trend</h3>
            <Bar data={companyBarData} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
