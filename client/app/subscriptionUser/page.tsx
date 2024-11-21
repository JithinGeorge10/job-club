'use client';
import React, { useEffect, useState } from 'react';
import AdminLeftSideBar from '../components/adminLeftSideBar';
import axios from 'axios';
import { USER_SERVICE_URL } from '@/utils/constants';


interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}

interface Subscriber {
  _id: string;
  userId: string;
  subscriber: boolean;
  userDetails: UserDetails[];
}

function Page() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${USER_SERVICE_URL}/subscriberList`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setSubscribers(Array.isArray(response.data.subscriberList) ? response.data.subscriberList : []);
      } catch (error) {
        console.error('Error fetching subscriber list:', error);
      }
    })();
  }, []);

  return (
    <div className="flex min-h-screen bg-black">
      <AdminLeftSideBar />
      <main className="bg-white text-black w-full p-6 sm:p-8 md:p-10 ml-[200px]">
        <h1 className="text-2xl font-bold mb-4">Subscriber List</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">First Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => {
                const user = subscriber.userDetails[0]; 
                return (
                  <tr key={subscriber._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{user?.firstName || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">{user?.lastName || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">{user?.email || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">{user?.phone || 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Page;
