'use client';
import { FaBriefcase, FaBell, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AUTH_SERVICE_URL, CHAT_SERVICE_URL } from '@/utils/constants';
import io from "socket.io-client";
const socket = io('https://jobclub.live');

function Navbar() {
  interface Room {
    _id: string;
  }

  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [roomIds, setRoomIds] = useState<string[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
      const userDetails = JSON.parse(user);
      setUserName(userDetails.firstName);
      setUserId(userDetails._id);
    }
  }, []);

  const handleLogout = async () => {

    try {
      localStorage.clear();
      Cookies.remove('userAccessToken');
      await axios.post(`${AUTH_SERVICE_URL}/logOut`,{}, { withCredentials: true });
      router.replace(`/`);
    } catch (error) {
      console.log(error);

    }
  };

  const handleUserProfile = () => {
    router.push(`userProfile?id=${userId}`);
  };

  const handleChangePassword = () => {
    router.push(`/changePassword`);
  };

  const handleMyJobs = () => {
    router.push(`/myJobs`);
  };

  const handleNotifications = async () => {
    router.push(`/userNotifiations`);

    if (notificationCount > 0) {
      try {
        await axios.post(`${CHAT_SERVICE_URL}/sendNotifications`, {
          userId,
          messages: recentMessages
        });
        setNotificationCount(0);
        setRecentMessages([]);
      } catch (error) {
        console.error("Error sending notifications:", error);
      }
    }
  };

  useEffect(() => {
    const getRoom = async () => {
      if (userId) {
        const response = await axios.get<{ getRoom: Room[] }>(`${CHAT_SERVICE_URL}/getUserRoomDetails`, {
          params: { userId },
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        setRoomIds(response.data.getRoom.map((room: Room) => room._id));
      }
    };
    getRoom();
  }, [userId]);

  useEffect(() => {
    roomIds.forEach(roomId => {
      socket.emit("joinRoom", roomId);
    });

    const handleReceiveMessage = (msg: any) => {
      setNotificationCount(prevCount => prevCount + 1);
      setRecentMessages(prevMessages => [...prevMessages, msg]);
    };


    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      roomIds.forEach(roomId => {
        socket.emit("leaveRoom", roomId);
      });
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [roomIds]);

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'}>
          <div className="text-green-400 font-bold text-2xl">_JobClub.</div>
        </Link>

        {userName ? (
          <div className="flex space-x-6 items-center">
            <div className="flex space-x-4">
              <div onClick={handleMyJobs} className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaBriefcase />
                <span>My Jobs</span>
              </div>
              <div onClick={handleNotifications} className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer relative">
                <FaBell />
                <span>Notifications</span>
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </div>
              <div onClick={handleUserProfile} className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaUser />
                <span>My Profile</span>
              </div>
            </div>

            <span className="text-green-400 font-bold text-2xl">Hi, {userName}</span>

            <div className="relative">
              <button
                onMouseEnter={() => setShowSettings(true)}
                onMouseLeave={() => setShowSettings(false)}
                className="w-20 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
              >
                Settings
              </button>
              {showSettings && (
                <div
                  onMouseEnter={() => setShowSettings(true)}
                  onMouseLeave={() => setShowSettings(false)}
                  className="absolute top-12 left-0 bg-white text-black rounded-lg shadow-lg p-2 space-y-2"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded transition-colors"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="w-full text-left px-4 py-2 hover:bg-green-500 hover:text-white rounded transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <Link href={'/login'}>
              <button className="border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
                Login
              </button>
            </Link>
            <Link href={'/signup'}>
              <button className="border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
                Signup
              </button>
            </Link>
            <Link href={'/companySignUp'}>
              <button className="border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
                Employers / Post Job
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
