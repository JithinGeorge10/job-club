'use client'
import { CHAT_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
    const searchParams = useSearchParams();
    const roomDetailsString = searchParams.get('roomDetails');
    let roomDetails = null;
    if (roomDetailsString) {
        roomDetails = JSON.parse(decodeURIComponent(roomDetailsString));
    }
    const { _id, userId, companyId } = roomDetails
    console.log(_id)
    console.log(userId)
    console.log(companyId)
    const [message, setMessage] = useState('');


    const handleSendMessage = async () => {
        console.log(message);
        let response = await axios.post(`${CHAT_SERVICE_URL}/postMessage`, { sender:userId,receiver:companyId,message,roomId :_id }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        setMessage('');
    };

    return (
        <>
            <div className="flex flex-col h-screen bg-gray-800 text-white">
                <div className="p-4 bg-gray-900 shadow-lg">
                    <h1 className="text-xl font-semibold text-green-600">Chat Room</h1>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-gray-700 p-3 rounded-lg max-w-xs">
                            <p>Hello! How are you?</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-green-600 p-3 rounded-lg max-w-xs">
                            <p>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-4 bg-gray-900">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none"
                    />
                    <button onClick={handleSendMessage} className="ml-3 px-4 py-2 bg-green-600 rounded-lg">Send</button>
                </div>
            </div>
        </>
    );
}

export default Page;
