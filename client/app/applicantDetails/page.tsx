'use client'
import React, { useEffect, useState } from 'react';
import CompanyNavbar from '../components/companyNavbar';
import { useSearchParams } from 'next/navigation';
import { COMPANY_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';

function ProfilePage() {
    const searchParams = useSearchParams();
    const applicantId = searchParams.get('id');
    const [userDetails, setUserDetails] = useState<any | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (applicantId) {
                try {
                    let response = await axios.get(`${COMPANY_SERVICE_URL}/applicantDetails?id=${applicantId}`, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    });
                    console.log(response)
                    setUserDetails(response.data.applicantDetails);
                } catch (error) {
                    console.error("Error fetching user details", error);
                }
            }
        };
        fetchUserDetails();
    }, [applicantId]);
    console.log(userDetails)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(/ /g, '-');
    };



    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <CompanyNavbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center space-x-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold">Applicant Profile</h2>
                            <br />
                            <h2 className="text-3xl font-bold">{userDetails?.firstName} {userDetails?.lastName}</h2>
                            <p className="text-gray-400">{userDetails?.profile?.headline || 'Professional'}</p>
                        </div>
                    </div>
                   
                    <br />
                    <div className="space-y-6">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
                            {userDetails?.education_details?.map((education: any, index: number) => (
                                <div key={index} className="mb-2">
                                    <p className="text-gray-300">{education.education} in {education.university}</p>
                                    <p className="text-gray-400">{education.course}</p>
                                    <p className="text-gray-500">Graduated: {formatDate(education.toYear)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-white mb-2">Employment</h3>
                            {userDetails?.employment_details?.map((employment: any, index: number) => (
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
                                {userDetails?.skills?.map((skill: string, index: number) => (
                                    <span key={index} className="bg-green-500 text-black px-3 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
