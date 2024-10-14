
import Link from 'next/link';
import React from 'react';
import HomePage from '../homePage/page';

function Navbar() {
   
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}

        <Link href={'/'}>
        <div className="text-green-400 font-bold text-2xl">
          _JobClub.
        </div>
        </Link>
      

        {/* Menu Section - hidden on smaller screens, flex on medium+ screens */}
        <div className="hidden md:flex space-x-4">
        <Link href={'/login'}>
          <button  className="border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
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
        </div>

        {/* Mobile Menu Button - visible on small screens */}
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
