'use client'
import React, { useEffect, useState, useCallback } from 'react'
import AdminLeftSideBar from '../components/adminLeftSideBar';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '@/utils/constants';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Company {
    _id: string;
    companyName: string;
    email: string;
    status?: string;
    createdAt?: string;
    isBlock: boolean;
}

function Page() {
    const [companyDetails, setCompanyDetails] = useState<Company[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 7;
    const [loading, setLoading] = useState(true);
    const [filterBy, setFilterBy] = useState<string>('all'); // New state for filtering

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

    // Filter by search term
    const searchFilteredCompanies = companyDetails.filter(company =>
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Date Filtering Function
    const dateFilteredCompanies = searchFilteredCompanies.filter((company) => {
        if (!company.createdAt) return false;

        const createdDate = new Date(company.createdAt);
        const today = new Date();

        switch (filterBy) {
            case 'weekly':
                const weekAgo = new Date(today);
                weekAgo.setDate(today.getDate() - 7);
                return createdDate >= weekAgo && createdDate <= today;
            case 'monthly':
                return createdDate.getMonth() === today.getMonth() && createdDate.getFullYear() === today.getFullYear();
            case 'yearly':
                return createdDate.getFullYear() === today.getFullYear();
            default:
                return true; // No filter applied
        }
    });

    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = dateFilteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
    const totalPages = Math.ceil(dateFilteredCompanies.length / companiesPerPage);

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

    // Export to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(dateFilteredCompanies.map(company => ({
            'Company Name': company.companyName,
            'Email': company.email,
            'Status': company.status || 'Active',
            'Created Date': company.createdAt
                ? new Date(company.createdAt).toLocaleDateString()
                : 'N/A',
            'Blocked': company.isBlock ? 'Yes' : 'No',
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Company Details');
        XLSX.writeFile(wb, 'Company_Details.xlsx');
    };

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Company Details', 14, 15);
        autoTable(doc, {
            startY: 20,
            head: [['Company Name', 'Email', 'Status', 'Created Date', 'Blocked']],
            body: dateFilteredCompanies.map(company => [
                company.companyName,
                company.email,
                company.status || 'Active',
                company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString()
                    : 'N/A',
                company.isBlock ? 'Yes' : 'No',
            ]),
        });
        doc.save('Company_Details.pdf');
    };

    return (
        <div className="flex min-h-screen bg-black">
            <AdminLeftSideBar />

            <div className="flex-grow bg-white p-4 md:p-8 ml-[20%] sm:ml-[25%] md:ml-[20%] lg:ml-[16.67%]">
                <h2 className="text-green-600 text-2xl md:text-3xl font-bold mb-6">Company Information</h2>

                {/* Buttons */}
                <div className="mb-4 flex gap-4">
                    <button
                        onClick={exportToPDF}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
                    >
                        Export to PDF
                    </button>
                    <button
                        onClick={exportToExcel}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
                    >
                        Export to Excel
                    </button>
                </div>

                <div className="mb-4 flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search by company name or email"
                        className="px-4 py-2 w-full md:w-1/3 rounded-md border border-gray-300 text-black"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 w-full md:w-1/5 rounded-md border border-gray-300 text-black"
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-white text-center py-8">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        {dateFilteredCompanies.length === 0 ? (
                            <div className="text-white text-center py-8">No companies found</div>
                        ) : (
                            <>
                                <table className="min-w-full bg-gray-100 rounded-lg shadow-lg">
                                    <thead>
                                        <tr className="bg-gray-700 text-gray-100">
                                            <th className="px-4 py-3">Company Name</th>
                                            <th className="px-4 py-3">Company Mail</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3">Created Date</th>
                                            <th className="px-4 py-3">Block/Unblock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                   
                                        {currentCompanies.map((company) => (
                                            <tr key={company._id} className="border-b border-gray-300">
                                                <td className="px-4 py-3  text-gray-800">{company.companyName}</td>
                                                <td className="px-4 py-3  text-gray-800">{company.email}</td>
                                                <td className="px-4 py-3  text-gray-800">{company.status || 'Active'}</td>
                                                <td className="px-4 py-3  text-gray-800">{new Date(company.createdAt!).toLocaleDateString()}</td>
                                                <td className="px-4 py-3">
                                                {company.isBlock? (
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

                                {/* Pagination */}
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handlePagination('previous')}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2  text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-gray-700 text-lg font-medium">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePagination('next')}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2  text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;

