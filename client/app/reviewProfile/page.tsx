'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useSearchParams, useRouter } from 'next/navigation';
import { COMPANY_SERVICE_URL, USER_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfilePage() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const jobId = searchParams.get('jobId');

    const [userDetails, setUserDetails] = useState<any | null>(null);

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


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(/ /g, '-');
    };

    const handleSubmit = async () => {
        // let applyResponse = await axios.post(`${USER_SERVICE_URL}/applyJob`, { jobId, userId }, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     withCredentials: true
        // });
        // console.log(applyResponse);
        const response = await axios.post(`${COMPANY_SERVICE_URL}/submitApplication`, { userDetails, jobId }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })
        console.log(response)
        toast.success('Job Applied');
        setTimeout(() => {
            router.push(`/jobListingPage`);
        }, 3000);


    };

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center space-x-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold">Review your Profile</h2>
                            <br />
                            <h2 className="text-3xl font-bold">{userDetails?.firstName} {userDetails?.lastName}</h2>
                            <p className="text-gray-400">{userDetails?.profile?.headline || 'Professional'}</p>
                        </div>
                    </div>
                    {userDetails?.profile?.resume ? (
                        <a href={userDetails.profile.resume} download>
                            <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-200">
                                <span className="mr-2">📄</span>
                                <span>Review Resume</span>
                            </button>
                        </a>
                    ) : (
                        <button className="flex items-center bg-gray-700 text-gray-400 font-semibold px-4 py-2 rounded-lg cursor-not-allowed">
                            <span className="mr-2">📄</span>
                            <span>Resume Not Available</span>
                        </button>
                    )}
                    <br />
                    <div className="space-y-6">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
                            {userDetails?.profile?.education_details?.map((education: any, index: number) => (
                                <div key={index} className="mb-2">
                                    <p className="text-gray-300">{education.education} in {education.university}</p>
                                    <p className="text-gray-400">{education.course}</p>
                                    <p className="text-gray-500">Graduated: {formatDate(education.toYear)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-white mb-2">Employment</h3>
                            {userDetails?.profile?.employment_details?.map((employment: any, index: number) => (
                                <div key={index} className="mb-2">
                                    <p className="text-gray-300 font-semibold">{employment.companyName}</p>
                                    <p className="text-gray-400">{employment.jobTitle}</p>
                                    <p className="text-gray-500">{formatDate(employment.fromDate)} - {employment.toDate ? formatDate(employment.toDate) : 'Present'}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-white mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {userDetails?.profile?.skills?.map((skill: string, index: number) => (
                                    <span key={index} className="bg-green-500 text-black px-3 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={handleSubmit} className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
