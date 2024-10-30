'use client'
import React, { useEffect, useState } from 'react'
import Footer from '../components/footer/footer'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { COMPANY_SERVICE_URL } from '@/utils/constants'
import { useSearchParams } from 'next/navigation'

function page() {
    interface JobDetails {
        jobTitle: string;
        employmentType: string[];
        companyId: CompanyDetails;
        maxSalary:String;
        minSalary:String;
        qualification:String;
        jobResponsibilities:String;
        jobDescription:String;
        requirements:String;
    }
    interface CompanyDetails {
        companyName: string;
        location: string;
        industry:String;
    }
    const searchParams = useSearchParams();
    const jobId = searchParams.get('jobId');
    const [jobDetails, setJobDetails] = useState<JobDetails | null>(null); 

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
            console.log(response.data); 
            setJobDetails(response.data.jobDetails[0])
        };
        fetchData();
    }, [jobId]);
    
    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-screen bg-black text-white font-sans">


                <div className="bg-gray-900 rounded-lg p-6 mx-6 my-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">{jobDetails?.jobTitle}</h2>
                            <p className="text-xl text-gray-400">{jobDetails?.companyId?.companyName} <span className="text-green-500">•</span> {jobDetails?.companyId?.location}</p>
                            <div className="mt-4 flex space-x-2">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full">{jobDetails?.employmentType[0]}</span>
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full">{jobDetails?.companyId?.industry}</span>
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full">Salary upto {jobDetails?.maxSalary}</span>
                            </div>
                        </div>


                        {/* <div className="w-16 h-16 rounded-full overflow-hidden bg-white">
        <img src="path-to-logo.png" alt="Company Logo" className="w-full h-full object-cover" />
      </div> */}



                    </div>
                    <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
                        {/* <p className="text-gray-400">Posted: 01-06-2024 &nbsp;&nbsp; Openings: 2 &nbsp;&nbsp; Applicants: 623</p> */}
                        <div className="space-x-4">
                            <button className="bg-white text-black font-semibold px-6 py-2 rounded-lg">Save</button>
                            <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg">Apply</button>
                        </div>
                    </div>
                </div>

                {/* Job Details Section */}
                <div className="mx-6 my-8 text-gray-300">
                    <h3 className="text-lg font-semibold text-white">Job Types: <span className="font-normal text-gray-400">{jobDetails?.employmentType[0]}</span></h3>
                    <h3 className="text-lg font-semibold text-white">Pay: <span className="font-normal text-gray-400">₹{jobDetails?.minSalary} - ₹{jobDetails?.maxSalary}</span></h3>
                    <h3 className="text-lg font-semibold text-white">Qualification:</h3>
                    <ul className="ml-6">
                        <li className="list-disc">{jobDetails?.qualification}</li>
                    </ul>
                    {/* <h3 className="text-lg font-semibold text-white mt-4">Experience:</h3>
                    <ul className="ml-6">
                        <li className="list-disc">Total work: 1 year</li>
                    </ul> */}
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
            <Footer></Footer>
        </>
    )
}

export default page
