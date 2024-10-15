'use client'
import { FaBriefcase, FaBell, FaEnvelope, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function Navbar() {
  const router = useRouter()

  const [companyName, setCompanyName] = useState<string | null>(null);

  useEffect(() => {
    const company: string | null = localStorage.getItem('company');

    console.log(company)
    if (company && company !== 'undefined') {
      let companyDetails = JSON.parse(company)
      console.log(companyDetails);
      setCompanyName(companyDetails.companyName)
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('companyToken');
    router.push(`/`)
  }
  return (

    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">

        <Link href={'/'}>
          <div className="text-green-400 font-bold text-2xl">
            _JobClub.
          </div>
        </Link>

        
          <div className="flex space-x-6 items-center">
            <div className="flex space-x-4">
              <div className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaBriefcase />
                <span>Dashboard</span>
              </div>
              <div className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaBell />
                <span>Message</span>
              </div>
              <div className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaEnvelope />
                <span>Company Profile</span>
              </div>
              <div className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaUser />
                <span>All Applicants</span>
              </div>
              <div className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaUser />
                <span>Job listing</span>
              </div>
              <div className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaUser />
                <span>settings</span>
              </div>
            </div>

            <span className="text-green-400 font-bold text-2xl">{companyName}</span>
            <button onClick={handleLogout}
              className="w-20 bg-red-900 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        
        


        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
