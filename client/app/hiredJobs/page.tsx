'use client'
import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/footer';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { COMPANY_SERVICE_URL, USER_SERVICE_URL } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const MyJobsPage = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [jobDetails, setJobDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user: string | null = localStorage.getItem('user');
        if (user && user !== 'undefined') {
            const userDetails = JSON.parse(user);
            setUserId(userDetails._id);
            setUserEmail(userDetails.email);
        }
    }, []);

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!userEmail) return;

            try {
                const response = await axios.get(`${COMPANY_SERVICE_URL}/hiredCompanies?id=${userEmail}`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                if (response.data?.hiredCompanies) {
                    setJobDetails(response.data.hiredCompanies);
                }
            } catch (error) {
                console.error("Error fetching job details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [userEmail]);

    const applied = () => {
        router.push(`appliedJobs`);
    };
    const saved = () => {
        router.push(`myJobs`);
    };

    return (
        <div className="bg-black text-white font-sans min-h-screen">
            <Navbar />

            <main className="container mx-auto py-8 px-4 min-h-[70vh]">
                <h1 className="text-3xl font-bold text-center mb-8">My Jobs</h1>

                <div className="flex justify-center space-x-4 mb-6">
                    <button onClick={saved} className="text-lg font-semibold text-gray-400">Saved</button>
                    <button onClick={applied} className="text-lg font-semibold text-gray-400">Applied</button>
                    <button className="text-lg font-semibold border-b-2 border-white">Hired</button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-400">Loading jobs...</p>
                ) : jobDetails.length > 0 ? (
                    jobDetails.map((job, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">{job.jobDetails.jobTitle}</h2>
                                <p className="text-gray-400">{job.companyDetails.companyName}</p>
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full mt-2 inline-block">
                                    {job.companyDetails.location}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400">No hired jobs found.</p>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyJobsPage;