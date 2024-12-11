"use client";
import React, { useEffect, useState } from "react";
import AdminLeftSideBar from "../components/adminLeftSideBar";
import axios from "axios";
import { USER_SERVICE_URL } from "@/utils/constants";
import dayjs from "dayjs";

interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}

interface PaymentDetails {
  _id: string;
  amount: string;
  bank_ref_num: string;
  bankcode: string;
  cardnum: string;
  createdAt: string;
  paymentSource: string;
  paymentStatus: string;
  transactionId: string;
  updatedAt: string;
  userId: string;
}

interface Subscriber {
  _id: string;
  userId: string;
  subscriber: boolean;
  userDetails: UserDetails[];
  paymentDetails: PaymentDetails[];
}

function Page() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${USER_SERVICE_URL}/subscriberList`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const subscribersData = Array.isArray(response.data.subscriberList)
          ? response.data.subscriberList
          : [];
        setSubscribers(subscribersData);
        setFilteredSubscribers(subscribersData);
      } catch (error) {
        console.error("Error fetching subscriber list:", error);
      }
    })();
  }, []);

  const applyFilters = () => {
    let filtered = subscribers;

    // Apply search filter
    if (searchFilter) {
      filtered = filtered.filter((subscriber) => {
        const user = subscriber.userDetails[0];
        return (
          user?.firstName?.toLowerCase().includes(searchFilter) ||
          user?.lastName?.toLowerCase().includes(searchFilter) ||
          user?.email?.toLowerCase().includes(searchFilter)
        );
      });
    }

    // Apply date filter
    const now = dayjs();
    filtered = filtered.filter((subscriber) => {
      const paymentDate = dayjs(subscriber.paymentDetails[0]?.updatedAt);
      switch (dateFilter) {
        case "weekly":
          return now.diff(paymentDate, "week") === 0;
        case "monthly":
          return now.diff(paymentDate, "month") === 0;
        case "yearly":
          return now.diff(paymentDate, "year") === 0;
        default:
          return true;
      }
    });

    setFilteredSubscribers(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [searchFilter, dateFilter]);

  // Calculate total
  const total = filteredSubscribers.reduce((sum, subscriber) => {
    return sum + parseInt(subscriber.paymentDetails[0]?.amount || "0", 10);
  }, 0);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSubscribers.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredSubscribers.length / rowsPerPage);

  return (
    <div className="flex min-h-screen bg-black">
      <AdminLeftSideBar />
      <main className="bg-white text-black w-full p-6 sm:p-8 md:p-10 ml-[200px]">
        <h1 className="text-2xl font-bold mb-4">Subscriber List</h1>

        {/* Total amount */}
        <div className="mb-4 text-xl font-semibold">Total: Rs. {total}</div>

        {/* Filters */}
        <div className="flex mb-4 space-x-4">
          <input
            type="text"
            placeholder="Filter by name or email"
            className="px-4 py-2 border border-gray-300 rounded"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value.toLowerCase())}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Subscriber table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">First Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Payment Amount</th>
                <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                <th className="border border-gray-300 px-4 py-2">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((subscriber, index) => {
                const user = subscriber.userDetails[0];
                const payment = subscriber.paymentDetails[0];
                return (
                  <tr key={subscriber._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {indexOfFirstRow + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user?.firstName || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user?.lastName || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user?.email || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user?.phone || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Rs. {payment?.amount || "0"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {payment?.paymentStatus || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {dayjs(payment?.updatedAt).format("DD-MM-YYYY") || "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2 mx-1 border ${
                pageNumber === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              } rounded`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Page;
