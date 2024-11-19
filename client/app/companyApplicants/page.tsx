'use client';
import React, { useEffect, useState } from 'react';
import CompanyNavbar from '../components/companyNavbar';
import CompanyLeftSideBar from '../components/companyLeftSideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { COMPANY_SERVICE_URL } from '@/utils/constants';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [applicants, setApplicants] = useState([]);

    // Load companyId from localStorage
    useEffect(() => {
        const company = localStorage.getItem('company');
        if (company && company !== 'undefined') {
            const companyDetails = JSON.parse(company);
            setCompanyId(companyDetails._id);
        }
    }, []);

    useEffect(() => {
        if (companyId) {
            (async () => {
                try {
                    const response = await axios.get(`${COMPANY_SERVICE_URL}/applicants`, {
                        headers: { 'Content-Type': 'application/json' },
                        params: { companyId },
                        withCredentials: true,
                    });
                    setApplicants(response.data.applicants);
                } catch (error) {
                    console.error('Error fetching applicants:', error);
                }
            })();
        }
    }, [companyId]);

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, _id: any) => {
        const newStatus = e.target.value;
        console.log(newStatus)
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Change status to "${newStatus}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.patch(
                    `${COMPANY_SERVICE_URL}/changeStatus-Applicant`,
                    { applicantId: _id, status: newStatus },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                );

                if (response.status === 200) {
                    Swal.fire('Updated!', 'Applicant status has been updated.', 'success');

                    const updatedApplicants = await axios.get(`${COMPANY_SERVICE_URL}/applicants`, {
                        headers: { 'Content-Type': 'application/json' },
                        params: { companyId },
                        withCredentials: true,
                    });
                    setApplicants(updatedApplicants.data.applicants);
                } else {
                    Swal.fire('Error', 'Failed to update the status. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error updating applicant status:', error);
                Swal.fire('Error', 'An error occurred while updating the status.', 'error');
            }
        } else {
            e.target.value = ''; 
        }
    };

    return (
        <>
            <CompanyNavbar />
            <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
                <CompanyLeftSideBar />
                <div className="overflow-auto w-full p-4">
                    <table className="w-full border-collapse bg-gray-800 text-white">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="border border-gray-600 px-4 py-2 text-left">Full Name</th>
                                <th className="border border-gray-600 px-4 py-2 text-left">Job Role</th>
                                <th className="border border-gray-600 px-4 py-2 text-left">Hiring Status</th>
                                <th className="border border-gray-600 px-4 py-2 text-left">Applied Date</th>
                                <th className="border border-gray-600 px-4 py-2 text-left">Status</th>
                                <th className="border border-gray-600 px-4 py-2 text-left">See Application</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants.length > 0 ? (
                                applicants.map((applicant: any) => (
                                    <tr key={applicant._id} className="hover:bg-gray-700">
                                        <td className="border border-gray-600 px-4 py-2">
                                            {applicant.firstName} {applicant.lastName}
                                        </td>
                                        <td className="border border-gray-600 px-4 py-2">
                                            {applicant.jobDetails?.jobTitle || 'N/A'}
                                        </td>
                                        <td className="border border-gray-600 px-4 py-2"> {applicant.Status || 'N/A'}</td>
                                        <td className="border border-gray-600 px-4 py-2">
                                            {applicant.createdAt ? new Date(applicant.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }) : 'N/A'}
                                        </td>
                                        <td className="border border-gray-600 px-4 py-2">
                                            <select
                                                className="bg-gray-600 text-white py-1 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                                                value=""
                                                onChange={(e) => handleStatusChange(e, applicant._id)}
                                            >
                                                <option value="" disabled>Change Status</option>
                                                <option value="Hired">Hired</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Inreview">In review</option>
                                                <option value="Interview">Interview</option>
                                            </select>
                                        </td>
                                        <td className="border border-gray-600 px-4 py-2">
                                            <button
                                                onClick={() => window.open(applicant.resume, '_blank')}
                                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
                                            >
                                                See Application
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="border border-gray-600 px-4 py-2 text-center text-gray-400"
                                    >
                                        No applicants found for this company.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Page;
