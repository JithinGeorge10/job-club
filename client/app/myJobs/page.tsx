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
    const [userDetails, setUserDetails] = useState<any | null>(null);
    const [jobDetails, setJobDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user: string | null = localStorage.getItem('user');
        if (user && user !== 'undefined') {
            let userDetails = JSON.parse(user);
            setUserId(userDetails._id);
        }
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (userId) {
                try {
                    let response = await axios.get(`${USER_SERVICE_URL}/get-userDetails?id=${userId}`, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    });
                    setUserDetails(response.data.userDetails);
                } catch (error) {
                    console.error("Error fetching user details", error);
                }
            }
        };
        fetchUserDetails();
    }, [userId]);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                let response = await axios.get(`${COMPANY_SERVICE_URL}/get-jobDetails`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                setJobDetails(response.data.jobDetails);
            } catch (error) {
                console.error("Error fetching job details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, []);

    const savedJobs = jobDetails.filter((job) =>
        userDetails?.profile?.saved_jobs?.includes(job._id)
    );

    const handleJobClick = (jobId: any) => {
        router.push(`jobView?jobId=${jobId}`);
    };

    const handleUnsaveJob = async (jobId: string) => {
        try {
            await axios.put(
                `${USER_SERVICE_URL}/unsave-job`,
                { userId, jobId },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );

            setUserDetails((prevDetails: any) => ({
                ...prevDetails,
                profile: {
                    ...prevDetails.profile,
                    saved_jobs: prevDetails.profile.saved_jobs.filter((id: string) => id !== jobId),
                },
            }));
        } catch (error) {
            console.error("Error unsaving job", error);
        }
    };

    const applied = async () => {
        router.push(`appliedJobs`);
    };
    const hired = async () => {
        router.push(`hiredJobs`);
    }

    return (
        <div className="bg-black text-white font-sans min-h-screen">
            <Navbar />

            <main
    className={`container mx-auto py-8 px-4 ${
        savedJobs.length === 0 && !loading ? 'min-h-[70vh]' : ''
    }`}
>
    <h1 className="text-3xl font-bold text-center mb-8">My Jobs</h1>

    <div className="flex justify-center space-x-4 mb-6">
        <button className="text-lg font-semibold border-b-2 border-white">Saved</button>
        <button onClick={applied} className="text-lg font-semibold text-gray-400">Applied</button>
        <button onClick={hired} className="text-lg font-semibold text-gray-400">Hired</button>
    </div>

    <div className="space-y-4">
        {loading ? (
            <p className="text-center text-gray-400">Loading jobs...</p>
        ) : savedJobs.length > 0 ? (
            savedJobs.map((job) => (
                <div key={job._id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <button onClick={() => handleJobClick(job._id)} className="text-xl font-semibold">{job.jobTitle}</button>
                        <p className="text-gray-400">{job.companyId.companyName}</p>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full mt-2 inline-block">
                            {job.companyId.location}
                        </span>
                    </div>
                    <button
                        onClick={() => handleUnsaveJob(job._id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                    >
                        Unsave
                    </button>
                </div>
            ))
        ) : (
            <p className="text-center text-gray-400">No saved jobs found.</p>
        )}
    </div>
</main>


            <Footer />
        </div>
    );
};

export default MyJobsPage;
