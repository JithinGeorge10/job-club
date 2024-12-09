'use client'
import React, { useEffect, useState, useCallback } from 'react'
import AdminLeftSideBar from '../components/adminLeftSideBar';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '@/utils/constants';
import Swal from 'sweetalert2';

interface Company {
    _id: string;
    companyName: string;
    email: string;
    status?: string;
    createdAt?: string;
    isBlocked: boolean;
}

function Page() {
    const [companyDetails, setCompanyDetails] = useState<Company[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 7;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${AUTH_SERVICE_URL}/get-companyDetails`, {
                    params: { adminEmail: "admin@gmail.com" }, 
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                setCompanyDetails(response.data.companyDetails);
            } catch (error) {
                console.error("Error fetching company details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    

    const filteredCompanies = companyDetails.filter(company =>
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
    const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

    const handlePagination = (direction: 'previous' | 'next') => {
        setCurrentPage(prevPage => {
            if (direction === 'previous') {
                return Math.max(prevPage - 1, 1);
            } else {
                return Math.min(prevPage + 1, totalPages);
            }
        });
    };

    const handleCompanyAction = useCallback(async (companyId: string, action: 'block' | 'unblock') => {
        const actionText = action === 'block' ? 'block' : 'unblock';
        const confirmationText = `You want to ${actionText} this company.`;
        const confirmButtonColor = action === 'block' ? '#d33' : '#3085d6';
        
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: confirmationText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor,
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${actionText} it!`,
        });

        if (result.isConfirmed) {
            try {
                await axios.post(`${AUTH_SERVICE_URL}/${action}-company`, { companyId });
                setCompanyDetails(prevDetails =>
                    prevDetails.map(company =>
                        company._id === companyId ? { ...company, isBlocked: action === 'block' } : company
                    )
                );
                Swal.fire(actionText.charAt(0).toUpperCase() + actionText.slice(1), `The company has been ${actionText}ed.`, 'success');
            } catch (error) {
                console.error(`Error ${actionText}ing the company:`, error);
                Swal.fire('Error', `There was an issue ${actionText}ing the company.`, 'error');
            }
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-black">
            <AdminLeftSideBar />

            <div className="flex-grow bg-white p-4 md:p-8 ml-[20%] sm:ml-[25%] md:ml-[20%] lg:ml-[16.67%]">
                <h2 className="text-green-600 text-2xl md:text-3xl font-bold mb-6">Company Information</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by company name or email"
                        className="px-4 py-2 w-full md:w-1/3 rounded-md border border-gray-300 text-black"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="text-white text-center py-8">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        {filteredCompanies.length === 0 ? (
                            <div className="text-white text-center py-8">No companies found</div>
                        ) : (
                            <table className="min-w-full bg-gray-100 rounded-lg shadow-lg">
                                <thead>
                                    <tr className="bg-gray-700 text-gray-100">
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Company Name</th>
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Company Mail</th>
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Status</th>
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Created Date</th>
                                        <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">Block/Unblock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCompanies.map((company) => (
                                        <tr key={company._id} className="border-b border-gray-300">
                                            <td className="px-4 py-3 text-gray-800">{company.companyName}</td>
                                            <td className="px-4 py-3 text-gray-800">{company.email}</td>
                                            <td className="px-4 py-3 text-green-600 font-medium">
                                                {company.status || 'Active'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-800">
                                                {company.createdAt
                                                    ? new Date(company.createdAt).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })
                                                    : 'N/A'
                                                }
                                            </td>
                                            <td className="px-4 py-3">
                                                {company.isBlocked ? (
                                                    <button
                                                        onClick={() => handleCompanyAction(company._id, 'unblock')}
                                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
                                                    >
                                                        Unblock
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleCompanyAction(company._id, 'block')}
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
