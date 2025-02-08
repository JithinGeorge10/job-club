'use client'
import React, { useEffect, useState } from 'react'
import AdminLeftSideBar from '../components/adminLeftSideBar';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '@/utils/constants';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx'; // For Excel export
import jsPDF from 'jspdf'; // For PDF export
import 'jspdf-autotable';

function Page() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all'); // Filter state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${AUTH_SERVICE_URL}/get-userDetails`, {
                    params: { adminEmail: "admin@gmail.com" },
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

    const filteredUsers = userDetails.filter(user => {
        const createdDate = new Date(user.createdAt);
        const now = new Date();

        if (filterType === 'weekly') {
            const lastWeek = new Date();
            lastWeek.setDate(now.getDate() - 7);
            return createdDate >= lastWeek && createdDate <= now;
        } else if (filterType === 'monthly') {
            return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
        } else if (filterType === 'yearly') {
            return createdDate.getFullYear() === now.getFullYear();
        }
        return true; // Default (all data)
    }).filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
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

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "user_data.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("User Information", 20, 10);
        const tableColumn = ["First Name", "Last Name", "Phone", "Email", "Created Date", "Status"];
        const tableRows: any[] = [];

        filteredUsers.forEach(user => {
            const userData = [
                user.firstName,
                user.lastName,
                user.phone,
                user.email,
                new Date(user.createdAt).toLocaleDateString('en-GB'),
                user.isBlocked ? "Blocked" : "Active"
            ];
            tableRows.push(userData);
        });

        (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
        doc.save("user_data.pdf");
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
        <div className="flex min-h-screen bg-black">
            <AdminLeftSideBar />

            <div className="flex-grow bg-white p-4 md:p-8 ml-[20%] sm:ml-[25%] md:ml-[20%] lg:ml-[16.67%]">
                <h2 className="text-green-600 text-2xl md:text-3xl font-bold mb-6">User Information</h2>

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <button onClick={exportToExcel} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                            Export to Excel
                        </button>
                        <button onClick={exportToPDF} className="bg-green-500 text-white px-4 py-2 rounded-md">
                            Export to PDF
                        </button>
                    </div>
                   
                    <select
                        className="px-4 py-2 w-full md:w-1/5 rounded-md border border-gray-300 text-black"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>



                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by first name or email"
                        className="px-4 py-2 w-full md:w-1/3 rounded-md border border-gray-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-black text-center py-8">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        {/* Same Table Code */}
                        <table className="min-w-full bg-gray-100 rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-gray-700 text-gray-100">
                                    <th className="px-4 py-3">First Name</th>
                                    <th className="px-4 py-3">Last Name</th>
                                    <th className="px-4 py-3">Phone</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Created Date</th>
                                    <th className="px-4 py-3">Block/Unblock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(user => (
                                    <tr key={user._id} className="border-b">
                                        <td className="px-4 py-3 text-gray-800">{user.firstName}</td>
                                        <td className="px-4 py-3 text-gray-800">{user.lastName}</td>
                                        <td className="px-4 py-3 text-gray-800">{user.phone}</td>
                                        <td className="px-4 py-3 text-gray-800">{user.email}</td>
                                        <td className="px-4 py-3 text-gray-800">
                                            {new Date(user.createdAt).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-4 py-3">
                                            {user.isBlock? (
                                                <button onClick={() => unblockUser(user._id)} className="bg-green-500 text-white px-4 py-2 rounded-md">
                                                    Unblock
                                                </button>
                                            ) : (
                                                <button onClick={() => blockUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                                    Block
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button onClick={() => handlePagination('previous')} disabled={currentPage === 1} className="bg-gray-700 text-white px-4 py-2 rounded-md">
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePagination('next')} disabled={currentPage === totalPages} className="bg-gray-700 text-white px-4 py-2 rounded-md">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Page;
