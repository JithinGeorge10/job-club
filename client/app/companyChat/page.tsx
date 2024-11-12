'use client'
import React, { useEffect, useRef, useState } from 'react';
import { CHAT_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import io from "socket.io-client";
const socket = io('http://localhost:4003');

// Define Room and Message interfaces
interface Room {
    firstName: string;
    lastName: string;
    roomId: string;
    lastMessage: string;
    timestamp: string;
    userId: string;
}

interface Message {
    message: string;
    receiver: string;
    roomId: string;
    sender: string;
    timestamp: string;
    _id: string;
}

function Page() {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const company = localStorage.getItem('company');
        if (company && company !== 'undefined') {
            const companyDetails = JSON.parse(company);
            setCompanyId(companyDetails._id);
        }
    }, []);

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
                setRooms(response.data.getRoom);
            }
        };
        getRoom();
    }, [companyId]);

    useEffect(() => {
        if (selectedRoom) {
            const roomId = selectedRoom.roomId;

            const receiveMessageListener = (newMessage: Message) => {
                console.log(newMessage)
                console.log(roomId)
                if (newMessage.roomId === roomId) {
                    handleRoomClick(roomId);
                }
            };
            socket.on("receiveMessage", receiveMessageListener);
            return () => {
                socket.off("receiveMessage", receiveMessageListener);
            };
        }
    }, [selectedRoom]);  // Dependency to run effect only when selectedRoom changes

    useEffect(() => {
        // if (selectedRoom) {
        //     const roomId = selectedRoom.roomId;
        //     const joinRoomAndFetchMessages = async () => {
        //         await handleRoomClick(roomId); 
        //     };
        //     joinRoomAndFetchMessages();
        // }
        scrollToBottom();
    }, [messages]);

    const handleRoomClick = async (roomId: string) => {
        try {
            const selected = rooms.find((room) => room.roomId === roomId);
            setSelectedRoom(selected || null);
            socket.emit("joinRoom", roomId);
            const response = await axios.get(`${CHAT_SERVICE_URL}/getMessages`, {
                params: { companyId, roomId },
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setMessages(response.data.getMessages || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        }
    };
    const handleSendMessage = async () => {
        if (selectedRoom && message.trim() !== '' && companyId) {
            const roomId = selectedRoom.roomId;
            const userId = selectedRoom.userId;

            try {
                const timestamp = new Date().toISOString();  // Valid timestamp

                const newMessage = {
                    sender: companyId,
                    receiver: userId,
                    message,
                    roomId,
                    timestamp,
                    _id: Math.random().toString(36).substring(7) // Temporary ID for UI
                };

                // Send the message through the API
                await axios.post(`${CHAT_SERVICE_URL}/postMessage`, {
                    sender: companyId,
                    receiver: userId,
                    message,
                    roomId,
                    timestamp
                }, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

                // Emit the message to the socket
                socket.emit('sendMessage', newMessage);

                // Update the messages state once the message is sent
                setMessages((prevMessages) => [...prevMessages, newMessage]);

                // Reset the input field
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };


    return (
        <div className="flex bg-gray-900 h-screen p-4 space-x-4">
            <div className="w-1/3 bg-gray-800 p-4 rounded-lg space-y-4">
                <h2 className="text-white text-lg font-bold mb-4">CHAT</h2>
                {rooms.map((room) => (
                    <div
                        key={room.roomId}
                        className="flex items-center bg-green-600 p-3 rounded-lg cursor-pointer"
                        onClick={() => handleRoomClick(room.roomId)}
                    >
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
                {selectedRoom ? (
                    <>
                        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-700 rounded-lg">
                            <div className="flex flex-col space-y-3">
                                {messages.map((msg, index) => {
                                    if (!companyId || !selectedRoom) return null;

                                    const messageKey = msg._id || `${msg.roomId || 'room'}-${msg.sender || 'sender'}-${msg.timestamp || Date.now()}-${index}`;

                                    return (
                                        <div
                                            key={messageKey}
                                            className={`flex ${msg.receiver === companyId ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div
                                                className={`${msg.receiver === companyId ? 'bg-gray-600' : 'bg-green-600'} p-3 rounded-lg text-white max-w-xs`}
                                            >
                                                <p>{msg.message}</p>
                                                <p className="text-xs text-gray-300 mt-1">
                                                    {new Date(msg.timestamp).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}


                                <div ref={messagesEndRef} />
                            </div>

                        </div>

                        <div className="flex items-center mt-4 p-2 bg-gray-800 rounded-lg">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-600 text-white p-3 rounded-lg outline-none"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="ml-3 p-3 bg-green-600 text-white rounded-lg"
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-white">Select a room to start chatting.</div>
                )}
            </div>
        </div>
    );
}

export default Page;
