// import React, { useState, useEffect, useRef } from 'react';
// import { CHAT_SERVICE_URL } from '@/utils/constants';
// import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4003');

// function CompanyMessage({ selectedRoom, messages }: any) {
//     const [message, setMessage] = useState('');
//     const [companyId, setCompanyId] = useState<string | null>(null);
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     const scrollToBottom = () => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     useEffect(() => {
//         const company: string | null = localStorage.getItem('company');
//         if (company && company !== 'undefined') {
//             let companyDetails = JSON.parse(company);
//             setCompanyId(companyDetails._id);
//         }
//     }, []);

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     useEffect(() => {
//       const receiveMessageListener = (newMessage: any) => {
//           if (selectedRoom && selectedRoom.roomId === newMessage.roomId) {
//               setMessages((prevMessages) => [...prevMessages, newMessage]);
//           } else {
//               setRooms((prevRooms) =>
//                   prevRooms.map((room) =>
//                       room.roomId === newMessage.roomId
//                           ? { ...room, lastMessage: newMessage.message, timestamp: newMessage.timestamp }
//                           : room
//                   )
//               );
//           }
//       };

//       socket.on('receiveMessage', receiveMessageListener);

//       return () => {
//           socket.off('receiveMessage', receiveMessageListener);
//       };
//   }, [selectedRoom]);

//     const handleSendMessage = async () => {
//         if (selectedRoom && message.trim() !== '' && companyId) {
//             const roomId = selectedRoom.roomId;
//             const userId = selectedRoom.userId;

//             const newMessage = {
//                 sender: companyId,
//                 receiver: userId,
//                 message,
//                 roomId,
//                 timestamp: new Date().toISOString(),
//                 _id: Math.random().toString(36).substring(7)
//             };

//             try {
//                 await axios.post(`${CHAT_SERVICE_URL}/postMessage`, {
//                     sender: companyId,
//                     receiver: userId,
//                     message,
//                     roomId
//                 }, {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     withCredentials: true
//                 });

//                 socket.emit('sendMessage', { roomId, message, sender: companyId });


//                 setMessage('');
//             } catch (error) {
//                 console.error('Error sending message:', error);
//             }
//         }
//     };

//     return (
//         <div>
//             <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-700 rounded-lg">
//                 <div className="flex flex-col space-y-3">
//                     {messages.map((msg: any) => (
//                         <div
//                             key={msg._id}
//                             className={`flex ${msg.receiver === companyId ? 'justify-start' : 'justify-end'}`}
//                         >
//                             <div
//                                 className={`${msg.receiver === companyId ? 'bg-gray-600' : 'bg-green-600'} p-3 rounded-lg text-white max-w-xs`}
//                             >
//                                 <p>{msg.message}</p>
//                                 <p className="text-xs text-gray-300 mt-1">
//                                     {new Date(msg.timestamp).toLocaleString()}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                 </div>
//             </div>

//             <div className="flex items-center mt-4 p-2 bg-gray-800 rounded-lg">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message..."
//                     className="flex-1 bg-gray-600 text-white p-3 rounded-lg outline-none"
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="ml-3 p-3 bg-green-600 text-white rounded-lg"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default CompanyMessage;
