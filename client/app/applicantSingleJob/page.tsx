'use client';
import React, { useEffect, useState } from 'react';
import CompanyNavbar from '../components/companyNavbar';
import CompanyLeftSideBar from '../components/companyLeftSideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { COMPANY_SERVICE_URL } from '@/utils/constants';
import { useRouter, useSearchParams } from 'next/navigation';

function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const jobId = searchParams.get('id');

    // Fetch company ID from localStorage
    useEffect(() => {
        const company = localStorage.getItem('company');
        if (company && company !== 'undefined') {
            const companyDetails = JSON.parse(company);
            setCompanyId(companyDetails._id);
        }
    }, []);

    // Fetch applicants based on companyId and jobId
    useEffect(() => {
        if (companyId && jobId) {
            setLoading(true); // Start loading
            axios
                .get(`${COMPANY_SERVICE_URL}/singleJobApplicants`, {
                    headers: { 'Content-Type': 'application/json' },
                    params: { companyId, jobId },
                    withCredentials: true,
                })
                .then((response) => {
                    const applicantData = Array.isArray(response.data.applicantDetails)
                        ? response.data.applicantDetails
                        : [response.data.applicantDetails];
                    setApplicants(applicantData);
                })
                .catch((error) => {
                    console.error('Error fetching applicants:', error);
                })
                .finally(() => {
                    setLoading(false); // End loading
                });
        }
    }, [companyId, jobId]);

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, _id: string) => {
        const newStatus = e.target.value;
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

                    // Refetch applicants
                    axios
                        .get(`${COMPANY_SERVICE_URL}/singleJobApplicants`, {
                            headers: { 'Content-Type': 'application/json' },
                            params: { companyId, jobId },
                            withCredentials: true,
                        })
                        .then((updatedResponse) => {
                            setApplicants(updatedResponse.data.applicantDetails || []);
                        });
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

    const handleNameClick = (userId: string) => {
        router.push(`applicantDetails?id=${userId}`);
    };

    return (
        <>
            <CompanyNavbar />
            <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
                <CompanyLeftSideBar />
                <div className="overflow-auto w-full p-4">
                    {loading ? (
                        <div className="text-center text-gray-400">Loading applicants...</div>
                    ) : (
                        <table className="w-full border-collapse bg-gray-800 text-white">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="border border-gray-600 px-4 py-2 text-left">Full Name</th>
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
                                            <td
                                                className="border border-gray-600 px-4 py-2 cursor-pointer text-blue-500 hover:underline"
                                                onClick={() => handleNameClick(applicant._id)}
                                            >
                                                {applicant.firstName}
                                            </td>
                                            <td className="border border-gray-600 px-4 py-2">
                                                {applicant.Status || 'N/A'}
                                            </td>
                                            <td className="border border-gray-600 px-4 py-2">
                                                {applicant.createdAt
                                                    ? new Date(applicant.createdAt).toLocaleDateString('en-GB', {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      })
                                                    : 'N/A'}
                                            </td>
                                            <td className="border border-gray-600 px-4 py-2">
                                                <select
                                                    className="bg-gray-600 text-white py-1 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                                                    value=""
                                                    onChange={(e) => handleStatusChange(e, applicant._id)}
                                                >
                                                    <option value="" disabled>
                                                        Change Status
                                                    </option>
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
                    )}
                </div>
            </div>
        </>
    );
}

export default Page;
