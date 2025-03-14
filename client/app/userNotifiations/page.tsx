'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/footer';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { CHAT_SERVICE_URL } from '@/utils/constants';

function Page() {
  interface Notification {
    _id: string;
    userId: string;
    messages: {
      message: string;
      roomId: string;
      sender?: {
        companyName?: string;
        _id?:string
      };
      createdAt: string;
    }[];
    createdAt: string;
  }

  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const user: string | null = localStorage.getItem('user');
    if (user && user !== 'undefined') {
      const userDetails = JSON.parse(user);
      setUserId(userDetails._id);
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${CHAT_SERVICE_URL}/getNotifications`, {
            params: { userId },
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, [userId]);

  const handleNotificationClick = async (companyId: string | undefined) => {
    if (!companyId) return;

    try {
      const response = await axios.post(
        `${CHAT_SERVICE_URL}/createRoom`,
        { userId, companyId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const { chatRoom } = response.data;
      console.log(userId);
      console.log(companyId);
      console.log('not');
      console.log(chatRoom)
      router.push(`userChat?roomDetails=${encodeURIComponent(JSON.stringify(chatRoom))}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const recentMessages = notifications
    .flatMap((notification) => notification.messages)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
  console.log(recentMessages)
  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen flex flex-col p-6 font-sans">
        <header className="text-center text-3xl font-bold mt-10">Notifications</header>
        <div className="flex flex-col items-center mt-8 space-y-6 flex-grow mb-10">
          {recentMessages.map((msg, index) => {
            const companyName = msg.sender?.companyName || 'Unknown Company';
            return (
              <div
                key={index}
                className="w-11/12 md:w-1/2 bg-gray-800 rounded-lg p-5 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-600 p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.56-.63-4.95-1.69l1.41-1.41c1.08.81 2.4 1.28 3.54 1.28 3.31 0 6-2.69 6-6s-2.69-6-6-6c-1.14 0-2.46.47-3.54 1.28L7.05 7.05C8.44 6.63 10.15 6 12 6c5.52 0 10 4.48 10 10s-4.48 10-10 10zm-3-8h6v2H9v-2z" />
                    </svg>
                  </div>
                  <div>
                    <button
                      onClick={() => handleNotificationClick(msg.sender?._id)}
                      className="font-bold text-lg"
                    >
                      New Message!
                    </button>
                    <p className="text-gray-300">You have a new message from {companyName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Page;
