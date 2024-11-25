'use client'
import { CHAT_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";

const socket = io('http://localhost:4003');
interface Message {
    sender: string;
    receiver: string;
    message: string;
    roomId: string;
    timestamp: string; // New property for timestamp
}


function Page() {
    const searchParams = useSearchParams();
    const roomDetailsString = searchParams.get('roomDetails');
    let roomDetails = null;
    if (roomDetailsString) {
        roomDetails = JSON.parse(decodeURIComponent(roomDetailsString));
    }
    const { _id, userId, companyId } = roomDetails;
    let roomId = _id;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        socket.emit("joinRoom", roomId);
    
        const handleReceiveMessage = (msg: Message) => {
            const messageWithTimestamp = {
                ...msg,
                timestamp: msg.timestamp || new Date().toISOString() 
            };
    
            setMessages(prevMessages => {
                if (!prevMessages.some((message) => message.message === messageWithTimestamp.message && message.sender === messageWithTimestamp.sender)) {
                    return [...prevMessages, messageWithTimestamp];
                }
                return prevMessages;
            });
        };
    
        socket.on("receiveMessage", handleReceiveMessage);
    
        async function getAllUserMessages() {
            const response = await axios.get(`${CHAT_SERVICE_URL}/getMessages`, {
                params: { companyId, roomId },
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setMessages((prevMessages) => {
                if (prevMessages.length === 0) {
                    return response.data.getMessages.map((msg: { timestamp: any }) => ({
                        ...msg,
                        timestamp: msg.timestamp || new Date().toISOString() 
                    }));
                }
                return prevMessages;
            });
        }
        getAllUserMessages();
    
        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [roomId, companyId]);
    


    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const timestamp = new Date().toISOString();

        // Send the message to the server with timestamp
        let response = await axios.post(`${CHAT_SERVICE_URL}/postMessage`, {
            sender: userId,
            receiver: companyId,
            message,
            roomId: _id,
            timestamp // Include timestamp
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        // Emit the message with timestamp using socket
        socket.emit('sendMessage', { roomId: _id, message, sender: userId, timestamp });

        // Add message to the local state
        setMessages(prevMessages => [
            ...prevMessages,
            { sender: userId, receiver: companyId, message, roomId: _id, timestamp } // Make sure to include timestamp
        ]);

        setMessage('');
    };




    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white">
            <div className="p-4 bg-gray-900 shadow-lg">
                <h1 className="text-xl font-semibold text-green-600">Chat Room</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`p-3 ${msg.sender === userId ? 'bg-green-600' : 'bg-gray-700'} rounded-md`}
                            style={{ maxWidth: '75%', wordWrap: 'break-word', borderRadius: '10px' }}
                        >
                            <p>{msg.message}</p>
                            <p className="text-xs text-gray-300 mt-1">
                                {msg.timestamp
                                    ? new Date(msg.timestamp).toLocaleString()
                                    : new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}


                <div ref={messagesEndRef} />
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
    );
}

export default Page;
