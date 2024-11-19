'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


function CompanyLeftSideBar() {
    const [companyId, setCompanyId] = useState<string | null>(null);

    useEffect(() => {
        const company: string | null = localStorage.getItem('company');
        if (company && company !== 'undefined') {
            let companyDetails = JSON.parse(company);
            setCompanyId(companyDetails._id);
        }
    }, []);

    const router = useRouter();

    const handleJobListing = () => {
        router.push('companyJobListing');
    };

    const handleMessage = async () => {
        try {
    
            router.push(`/companyChat`);
        } catch (error) {
            console.error("Error fetching room details:", error);
        }
    };
    
    const handleApplicants = async () => {
        try {
            router.push(`/companyApplicants`);
        } catch (error) {
            console.error("Error fetching room details:", error);
        }
    };
    
    const handleDashboard = async () => {
        try {
            router.push(`/companyDashboard?id=${companyId}`);
        } catch (error) {
            console.error("Error fetching room details:", error);
        }
    };
    
    return (
        <aside className="bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen w-1/5 p-5">
            <nav className="space-y-6">
                <button onClick={handleDashboard} className="flex items-center  hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">Dashboard</span>
                </button>
                <button onClick={handleMessage} className="flex items-center hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">Messages</span>
                </button>
                <button className="flex items-center hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">Company Profile</span>
                </button>
                <button onClick={handleApplicants} className="flex items-center hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">All Applicants</span>
                </button>
                <button onClick={handleJobListing} className="flex items-center hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">Job Listing</span>
                </button>
               
            </nav>
        </aside>
    );
}

export default CompanyLeftSideBar;
