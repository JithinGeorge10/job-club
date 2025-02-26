'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AUTH_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';

function Navbar() {
  const router = useRouter()

  const [companyName, setCompanyName] = useState<string | null>(null);

  useEffect(() => {
    const company: string | null = localStorage.getItem('company');

    if (company && company !== 'undefined') {
      let companyDetails = JSON.parse(company)
      setCompanyName(companyDetails.companyName)
    }
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      Cookies.remove('companyAccessToken');
      await axios.post(`${AUTH_SERVICE_URL}/companyLogOut`, {}, { withCredentials: true });
      router.push(`/`)
    } catch (error) {
      console.log(error)
    }
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
