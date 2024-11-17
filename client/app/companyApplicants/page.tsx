'use client';
import React, { useEffect, useState } from 'react';
import CompanyNavbar from '../components/companyNavbar';
import CompanyLeftSideBar from '../components/companyLeftSideBar';
import axios from 'axios';
import { COMPANY_SERVICE_URL } from '@/utils/constants';

function Page() {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [applicants, setApplicants] = useState([]);

    // Fetch company ID from localStorage
    useEffect(() => {
        const company = localStorage.getItem('company');
        if (company && company !== 'undefined') {
            const companyDetails = JSON.parse(company);
            setCompanyId(companyDetails._id);
        }
    }, []);

    // Fetch applicants and filter them based on the company ID
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${COMPANY_SERVICE_URL}/applicants`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                const allApplicants = response.data.applicants;

                if (companyId) {
                    const filteredApplicants = allApplicants.filter(
                        (applicant: any) => applicant.companyId === companyId
                    );
                    setApplicants(filteredApplicants);
                }
            } catch (error) {
                console.error('Error fetching applicants:', error);
            }
        })();
    }, [companyId]);


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
                                        <td className="border border-gray-600 px-4 py-2">Interview</td>
                                        <td className="border border-gray-600 px-4 py-2">June 16, 2024</td>
                                        <td className="border border-gray-600 px-4 py-2">
                                            <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded">
                                                Live
                                            </button>
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
