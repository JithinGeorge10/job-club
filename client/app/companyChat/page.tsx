'use client'

import { CHAT_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Room {
    firstName: string;
    lastName: string;
    roomId: string;
    lastMessage: string;
    timestamp: string;
    userId: string;
}

function Page() {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);

    // Get companyId from localStorage and set it
    useEffect(() => {
        const company: string | null = localStorage.getItem('company');
        if (company && company !== 'undefined') {
            let companyDetails = JSON.parse(company);
            setCompanyId(companyDetails._id);
        }
    }, []);

    // Fetch room details based on companyId
    useEffect(() => {
        const getRoom = async () => {
            if (companyId) {
                const response = await axios.get(`${CHAT_SERVICE_URL}/getRoomDetails`, {
                    params: { companyId },
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                
                setRooms(response.data.getRoom); // Assuming response.data is the array of rooms
            }
        };

        getRoom();
    }, [companyId]);

    return (
        <div className="flex bg-gray-900 h-screen p-4 space-x-4">
            <div className="w-1/3 bg-gray-800 p-4 rounded-lg space-y-4">
                <h2 className="text-white text-lg font-bold mb-4">CHAT</h2>

                {/* Iterate over rooms and display each room's information */}
                {rooms.map((room) => (
                    <div key={room.roomId} className="flex items-center bg-green-600 p-3 rounded-lg">
                        <div>
                            <p className="text-black font-semibold">{room.firstName} {room.lastName || ''}</p>
                            <p className="text-black text-sm">{room.lastMessage || 'No message'}</p>
                        </div>
                        <span className="ml-auto text-black text-sm">
                            {new Date(room.timestamp).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex-1 bg-gray-800 p-4 rounded-lg flex flex-col">
                {/* Other chat UI components */}
            </div>
        </div>
    );
}

export default Page;
