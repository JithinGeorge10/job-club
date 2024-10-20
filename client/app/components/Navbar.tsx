'use client'
import { FaBriefcase, FaBell, FaEnvelope, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function Navbar() {

  const router = useRouter()

  const [userName, setUserName] = useState<string | null>(null);
  const [userId,setUserId]=useState<string | null>(null)
  useEffect(() => {

    const user: string | null = localStorage.getItem('user');

    console.log(user)
    if (user && user !== 'undefined') {
      let userDetails = JSON.parse(user)
      console.log(userDetails);
      setUserName(userDetails.firstName)
      setUserId(userDetails._id)
    }
  }, []);

 
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('userToken');
    router.push(`/`)
  }

  const handleUserProfile=()=>{
    router.push(`userProfile?id=${userId}`)
  }
  return (

    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">

        <Link href={'/'}>
          <div className="text-green-400 font-bold text-2xl">
            _JobClub.
          </div>
        </Link>

        {userName ? (
          <div className="flex space-x-6 items-center">
            <div className="flex space-x-4">
              <div className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaBriefcase />
                <span>My jobs</span>
              </div>
              <div className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaBell />
                <span>Notifications</span>
              </div>
              <div className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                <FaEnvelope />
                <span>Messages</span>
              </div>
          
                <div onClick={handleUserProfile} className="text-white flex items-center space-x-2 hover:text-green-400 transition-colors cursor-pointer">
                  <FaUser />
                  <span>User Profile</span>
                </div>
              
             
            </div>

            <span className="text-green-400 font-bold text-2xl">Hi, {userName}</span>
            <button onClick={handleLogout}
              className="w-20 bg-red-900 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        ) : (<div className="hidden md:flex space-x-4">
          <Link href={'/login'}>
            <button className="border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
              Login
            </button>
          </Link>
          <Link href={'/signup'}>
            <button className="border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
              Signup
            </button>
          </Link>
          <Link href={'/companySignUp'}>
            <button className="border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
              Employers / Post Job
            </button>
          </Link>
        </div>)
        }


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
