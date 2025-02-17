'use client'
import React, { useEffect, useRef, useState } from 'react';
import { CHAT_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import io from "socket.io-client";
const socket = io("https://chat.jobclub.live", {
    path: "/socket.io", // Matches the server's path
    transports: ["websocket", "polling"], // Ensure compatibility
    withCredentials: true, // Matches the server's CORS settings
});

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
    const [newRoomNotification, setNewRoomNotification] = useState<boolean>(false);
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

                const roomsData = response.data.getRoom;
             
                const filteredRooms = roomsData.filter((room: Room) => room.lastMessage);
                const sortedRooms = filteredRooms.sort((a: Room, b: Room) => {
                    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                });

                setRooms(sortedRooms);

                if (sortedRooms.length > 0) {
                    setSelectedRoom(sortedRooms[0]);
                }
            }
        };

        getRoom();
    }, [companyId]);


    useEffect(() => {
        if (selectedRoom) {
            const roomId = selectedRoom.roomId;

            const receiveMessageListener = (newMessage: Message) => {
                if (newMessage.roomId === roomId) {

                    setRooms(prevRooms => {
                        return prevRooms.map(room => {
                            if (room.roomId === roomId) {
                                return {
                                    ...room,
                                    lastMessage: newMessage.message,
                                    timestamp: newMessage.timestamp,
                                };
                            }
                            return room;
                        });
                    });

                    handleRoomClick(roomId);
                }
            };

            socket.on("receiveMessage", receiveMessageListener);
            return () => {
                socket.off("receiveMessage", receiveMessageListener);
            };
        }
    }, [selectedRoom]);

    useEffect(() => {
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
                const timestamp = new Date().toISOString();

                const newMessage = {
                    sender: companyId,
                    receiver: userId,
                    message,
                    roomId,
                    timestamp,
                    _id: Math.random().toString(36).substring(7)
                };

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

                socket.emit('sendMessage', newMessage);

                setMessages((prevMessages) => [...prevMessages, newMessage]);

                setRooms(prevRooms => prevRooms.map(room => {
                    if (room.roomId === roomId) {
                        return { ...room, lastMessage: message, timestamp };
                    }
                    return room;
                }));


                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    useEffect(() => {

        const handleNewRoom = (newRoom: Room) => {
            setRooms(prevRooms => [newRoom, ...prevRooms]);
            setNewRoomNotification(true);
            setTimeout(() => {
                setNewRoomNotification(false);
            }, 3000);
        };

        socket.on("newRoom", handleNewRoom);
        return () => {
            socket.off("newRoom", handleNewRoom);
        };
    }, []);

    return (
        <div className="flex bg-gray-900 h-screen p-4 space-x-4">
            <div className="w-1/3 bg-gray-800 p-4 rounded-lg space-y-4">
                <h2 className="text-white text-lg font-bold mb-4">CHAT</h2>
                {newRoomNotification && (
                    <div className="text-green-500 text-xl font-semibold bg-gray-700 p-3 rounded-lg mb-4">
                        New room created with a new message!
                    </div>
                )}
                {rooms.length === 0 ? (
                    <div className="text-white">No rooms available.</div>
                ) : (
                    rooms.map((room) => (
                        <div
                            key={room.roomId}
                            className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedRoom?.roomId === room.roomId ? 'bg-green-600' : 'bg-gray-600'}`}
                            onClick={() => handleRoomClick(room.roomId)}
                        >
                            <div className="flex-1">
                                <p className="text-black font-semibold">{room.firstName}</p>
                                <p className="text-black text-sm">{room.lastMessage || 'No message'}</p>
                            </div>
                        </div>
                    ))
                )}

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

                        <div className="mt-4 flex space-x-4">
                            <input
                                type="text"
                                className="w-full p-2 bg-gray-600 text-white rounded-lg"
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <button
                                className="bg-green-600 text-white p-2 rounded-lg"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-white">Select a room to chat.</div>
                )}
            </div>
        </div>
    );
}

export default Page;
