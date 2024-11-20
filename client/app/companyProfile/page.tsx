'use client'
import React, { useEffect, useState } from 'react'
import CompanyNavbar from '../components/companyNavbar';
import CompanyLeftSideBar from '../components/companyLeftSideBar';
import axios from 'axios';
import { COMPANY_SERVICE_URL } from '@/utils/constants';

function Page() {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [companyDetails, setCompanyDetails] = useState<any | null>(null);

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
                    const response = await axios.get(`${COMPANY_SERVICE_URL}/companyDetails`, {
                        params: { id: companyId }, 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    });
                    console.log(response.data);
                    setCompanyDetails(response.data.companyDetails[0]);
                } catch (error) {
                    console.error('Error fetching company details:', error);
                }
            })();
        }
    }, [companyId]);

    return (
        <>
            <CompanyNavbar />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
                <CompanyLeftSideBar />
                <main className="mt-10">

                    <section className="bg-gray-900 p-6 rounded-xl">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                {/* Add company logo or icon here */}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">{companyDetails?.companyName || 'Company Name'}</h2>
                                <a href={`https://${companyDetails?.website}`} className="text-green-400 hover:underline">
                                    {companyDetails?.website || 'www.example.com'}
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <div className="bg-gray-800 p-4 rounded-lg text-center">
                                <p className="font-bold">Location</p>
                                <p>{companyDetails?.location || 'Location not available'}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg text-center">
                                <p className="font-bold">Industry</p>
                                <p>{companyDetails?.industry || 'Industry not available'}</p>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                        <div className="bg-gray-900 p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Company Profile</h3>
                            <p>{companyDetails?.description || 'No description available'}</p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Contacts</h3>
                            <ul className="space-y-2">
                                <li>
                                    Email:{" "}
                                    <a href={`mailto:${companyDetails?.email}`} className="text-green-400 hover:underline">
                                        {companyDetails?.email || 'No email available'}
                                    </a>
                                </li>
                                <li>
                                    Website:{" "}
                                    <a href={`https://${companyDetails?.website}`} className="text-green-400 hover:underline">
                                        {companyDetails?.website || 'No website available'}
                                    </a>
                                </li>
                                <li>Location: {companyDetails?.location || 'No location available'}</li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default Page;
