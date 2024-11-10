import React from 'react';
import { useRouter } from 'next/navigation';

function CompanyLeftSideBar() {
    const router = useRouter();

    const handleJobListing = () => {
        router.push('companyJobListing');
    };
    const handleMessage=()=>{
        router.push('companychat');
    }


    return (
        <aside className="bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen w-1/5 p-5">
            <nav className="space-y-6">
                <a href="#" className="flex items-center text-green-400 hover:text-green-500 transition-colors duration-200">
                    <span className="material-icons mr-3">Dashboard</span>
                </a>
                <button onClick={handleMessage} className="flex items-center hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">Messages</span>
                </button>
                <button className="flex items-center hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">Company Profile</span>
                </button>
                <a href="#" className="flex items-center hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">All Applicants</span>
                </a>
                <button onClick={handleJobListing} className="flex items-center hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">Job Listing</span>
                </button>
                <a href="#" className="flex items-center hover:text-gray-300 transition-colors duration-200">
                    <span className="material-icons mr-3">Settings</span>
                </a>
            </nav>
        </aside>
    );
}

export default CompanyLeftSideBar;
