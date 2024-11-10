'use client'
import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/footer';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { CHAT_SERVICE_URL, COMPANY_SERVICE_URL, USER_SERVICE_URL } from '@/utils/constants';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function page() {

    interface JobDetails {
        _id: String;
        jobTitle: string;
        employmentType: string[];
        companyId: CompanyDetails;
        maxSalary: String;
        minSalary: String;
        qualification: String;
        jobResponsibilities: String;
        jobDescription: String;
        requirements: String;
    }

    interface CompanyDetails {
        companyName: string;
        location: string;
        industry: String;
        _id:String
    }
    const router = useRouter()
    const searchParams = useSearchParams();
    const jobId = searchParams.get('jobId');
    const [userId, setUserId] = useState<string | null>(null);
    const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
    const [userDetails, setUserDetails] = useState<any | null>(null);

    useEffect(() => {
        const user: string | null = localStorage.getItem('user');
        if (user && user !== 'undefined') {
            let userDetails = JSON.parse(user);
            setUserId(userDetails._id);
        }
    }, []);

    useEffect(() => {
        const res = async function () {
            if (userId) {
                const response = await axios.get(`${USER_SERVICE_URL}/get-userDetails?id=${userId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                setUserDetails(response.data.userDetails);
            }
        };
        res();
    }, [userId]);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${COMPANY_SERVICE_URL}/get-singleJobDetails?jobId=${jobId}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            setJobDetails(response.data.jobDetails[0]);
        };
        fetchData();
    }, [jobId]);
    console.log(jobDetails)

    const handleSaveJob = async (jobId: any) => {
        let response = await axios.post(`${USER_SERVICE_URL}/saveJob`, { jobId, userId }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        console.log(response);
        if (response.status === 200) {
            setUserDetails((prevDetails: any) => ({
                ...prevDetails,
                profile: {
                    ...prevDetails?.profile,
                    saved_jobs: [...(prevDetails?.profile?.saved_jobs || []), jobId]
                }
            }));
        }
    };


    const isJobSaved = userDetails?.profile?.saved_jobs?.includes(jobDetails?._id);
    const isJobApplied = userDetails?.profile?.applied_jobs?.includes(jobDetails?._id);

    const handleSubmit = async () => {
        router.push(`reviewProfile?jobId=${jobId}&userId=${userId}`);
    }

    const handlePremiumSubmit=()=>{
        router.push(`userProfile?id=${userId}`);
    }
    
    const handlechat=async(companyId:any)=>{
        let response = await axios.post(`${CHAT_SERVICE_URL}/createRoom`,{userId,companyId}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        router.push(`userChat?id=${companyId}`);
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white font-sans">
                <div className="bg-gray-900 rounded-lg p-6 mx-6 my-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">{jobDetails?.jobTitle}</h2>
                            <p className="text-xl text-gray-400">
                                {jobDetails?.companyId?.companyName} <span className="text-green-500">•</span> {jobDetails?.companyId?.location}
                            </p>
                            <div className="mt-4 flex space-x-2">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full">{jobDetails?.employmentType[0]}</span>
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full">{jobDetails?.companyId?.industry}</span>
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full">Salary upto {jobDetails?.maxSalary}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
                        <div className="space-x-4">
                            {isJobSaved ? (
                                <button className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg" disabled>
                                    Saved
                                </button>
                            ) : (
                                <button onClick={() => handleSaveJob(jobDetails?._id)} className="bg-white text-black font-semibold px-6 py-2 rounded-lg">
                                    Save
                                </button>
                            )}

                            {isJobApplied ? (
                                <button className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg" disabled>
                                    Applied
                                </button>
                            ) : (
                                <button onClick={handleSubmit} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg">Apply</button>
                            )}
                            {userDetails?.profile?.subscriber ? ( // Check if the user is a subscriber
                                <button onClick={()=>handlechat(jobDetails?.companyId?._id)} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg">
                                    Chat
                                </button>
                            ) : (
                                <button onClick={handlePremiumSubmit} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg">
                                    Get premium account for chat
                                </button>
                            )}


                        </div>
                    </div>
                </div>


                <div className="mx-6 my-8 text-gray-300">
                    <h3 className="text-lg font-semibold text-white">Job Types: <span className="font-normal text-gray-400">{jobDetails?.employmentType[0]}</span></h3>
                    <h3 className="text-lg font-semibold text-white">Pay: <span className="font-normal text-gray-400">₹{jobDetails?.minSalary} - ₹{jobDetails?.maxSalary}</span></h3>
                    <h3 className="text-lg font-semibold text-white">Qualification:</h3>
                    <ul className="ml-6">
                        <li className="list-disc">{jobDetails?.qualification}</li>
                    </ul>
                </div>

                <div className="mx-6 my-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Job Responsibilities</h2>
                    <ul className="ml-6 text-gray-300 space-y-2">
                        <li className="list-disc">{jobDetails?.jobResponsibilities}</li>
                    </ul>
                </div>

                <div className="mx-6 my-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
                    <ul className="ml-6 text-gray-300 space-y-2">
                        <li className="list-disc">{jobDetails?.jobDescription}</li>
                    </ul>
                </div>

                <div className="mx-6 my-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Job Requirements</h2>
                    <ul className="ml-6 text-gray-300 space-y-2">
                        <li className="list-disc">{jobDetails?.requirements}</li>
                    </ul>
                </div>



            </div>
            <Footer />
        </>
    );
}

export default page;
