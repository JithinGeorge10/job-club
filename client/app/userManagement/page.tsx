'use client'
import React, { useEffect, useState } from 'react'
import AdminLeftSideBar from '../components/adminLeftSideBar';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '@/utils/constants';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${AUTH_SERVICE_URL}/get-userDetails`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                setUserDetails(response.data.userDetails);
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const filteredUsers = userDetails.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePagination = (direction: 'previous' | 'next') => {
        setCurrentPage(prevPage => {
            if (direction === 'previous') {
                return Math.max(prevPage - 1, 1);
            } else {
                return Math.min(prevPage + 1, totalPages);
            }
        });
    };

    const blockUser = async (userId: any) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to block this user.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, block it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.post(`${AUTH_SERVICE_URL}/block-user`, { userId });
                setUserDetails(prevDetails =>
                    prevDetails.map(user =>
                        user._id === userId ? { ...user, isBlocked: true } : user
                    )
                );
                Swal.fire('Blocked!', 'The user has been blocked.', 'success');
            } catch (error) {
                console.error("Error blocking the user:", error);
                Swal.fire('Error', 'There was an issue blocking the user.', 'error');
            }
        }
    };

    const unblockUser = async (userId: any) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to unblock this user.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, unblock it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.post(`${AUTH_SERVICE_URL}/unblock-user`, { userId });
                setUserDetails(prevDetails =>
                    prevDetails.map(user =>
                        user._id === userId ? { ...user, isBlocked: false } : user
                    )
                );
                Swal.fire('Unblocked!', 'The user has been unblocked.', 'success');
            } catch (error) {
                console.error("Error unblocking the user:", error);
                Swal.fire('Error', 'There was an issue unblocking the user.', 'error');
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminLeftSideBar />

            <div className="flex-grow bg-black p-4 md:p-8 ml-[20%] sm:ml-[25%] md:ml-[20%] lg:ml-[16.67%]">
                <h2 className="text-green-600 text-2xl md:text-3xl font-bold mb-6">User Information</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by first name, last name, or email"
                        className="px-4 py-2 w-full md:w-1/3 rounded-md border border-gray-300 text-black"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="text-white text-center py-8">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        {filteredUsers.length === 0 ? (
                            <div className="text-white text-center py-8">No users found</div>
                        ) : (
                            <table className="min-w-full bg-gray-100 rounded-lg shadow-lg">
                                <thead>
                                    <tr className="bg-gray-700 text-gray-100">
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">First Name</th>
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Last Name</th>
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Phone</th>
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Email</th>
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Created Date</th>
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Block/Unblock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user) => (
                                        <tr key={user._id} className="border-b border-gray-300">
                                            <td className="px-4 py-3 text-gray-800">{user.firstName}</td>
                                            <td className="px-4 py-3 text-gray-800">{user.lastName}</td>
                                            <td className="px-4 py-3 text-gray-800">{user.phone}</td>
                                            <td className="px-4 py-3 text-gray-800">{user.email}</td>
                                            <td className="px-4 py-3 text-gray-800">
                                                {user.createdAt
                                                    ? new Date(user.createdAt).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })
                                                    : '07-Nov-2024'
                                                }
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.isBlocked ? (
                                                    <button
                                                        onClick={() => unblockUser(user._id)}
                                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
                                                    >
                                                        Unblock
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => blockUser(user._id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
                                                    >
                                                        Block
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePagination('previous')}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-gray-700 text-white rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Previous
                    </button>
                    <span className="text-white">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePagination('next')}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-gray-700 text-white rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Page;
