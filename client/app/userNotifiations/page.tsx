'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/footer';
import Navbar from '../components/Navbar';

import axios from 'axios';
import { CHAT_SERVICE_URL } from '@/utils/constants';
import io from "socket.io-client";
const socket = io('http://localhost:4003');
function Page() {

  interface Room {
    _id: string;  // Define the fields you expect in each room object
    // Add other properties of the room object here if needed
}

  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [roomIds, setRoomIds] = useState<string[]>([]); // Specify the type here

  useEffect(() => {
    const getRoom = async () => {
        if (userId) {
            const response = await axios.get<{ getRoom: Room[] }>(`${CHAT_SERVICE_URL}/getUserRoomDetails`, {
                params: { userId },
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setRoomIds(response.data.getRoom.map((room: Room) => room._id));
        }
    };
    getRoom();
}, [userId]);


console.log(roomIds)


useEffect(() => {
  roomIds.forEach(roomId => {
      socket.emit("joinRoom", roomId);
  });

  const handleReceiveMessage = (msg:any) => {
      console.log(msg);
  };

  socket.on("receiveMessage", handleReceiveMessage);

  return () => {
      roomIds.forEach(roomId => {
          socket.emit("leaveRoom", roomId)
      });
      socket.off("receiveMessage", handleReceiveMessage);
  };
}, [roomIds]);







  return (
    <>
      <Navbar></Navbar>
      <div className="bg-black text-white min-h-screen p-6 font-sans">

        <header className="text-center text-3xl font-bold mt-10">
          Notifications
        </header>


        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 bg-green-500 text-black rounded-md hover:bg-green-600">
            Mark all as read
          </button>
        </div>


        <div className="flex flex-col items-center mt-8 space-y-6 mb-10">

          <div className="w-11/12 md:w-1/2 bg-gray-800 rounded-lg p-5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.56-.63-4.95-1.69l1.41-1.41c1.08.81 2.4 1.28 3.54 1.28 3.31 0 6-2.69 6-6s-2.69-6-6-6c-1.14 0-2.46.47-3.54 1.28L7.05 7.05C8.44 6.63 10.15 6 12 6c5.52 0 10 4.48 10 10s-4.48 10-10 10zm-3-8h6v2H9v-2z" />
                </svg>
              </div>
              <div>
                <button className="font-bold text-lg">New Message!</button>
                <p className="text-gray-300">You have a new message from your recruiter</p>
              </div>
            </div>
            <span className="text-gray-500 text-sm">1w</span>
          </div>


        
        </div>

        <Footer></Footer>
      </div>
    </>
  );
}

export default Page;
  