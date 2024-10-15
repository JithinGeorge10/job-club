'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'next/navigation';

function page() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name')||'';
  return (
    <>
      <Navbar/>
      <div className="bg-black text-white min-h-screen">
        <div className="max-w-7xl mx-auto py-10">
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Enter skill/designations/companies"
              className="w-2/3 p-4 rounded-l-full text-black"
            />
            <button className="bg-green-400 px-6 py-4 rounded-r-full text-black">Search</button>
          </div>

          {/* Job Filters */}
          <div className="grid grid-cols-5 gap-10">
            <aside className="col-span-1 bg-gray-900 p-5 rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-green-400">All Filters</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-md mb-2">Work Mode</h4>
                <label className="block mb-2">
                  <input type="checkbox" /> Remote
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> Hybrid
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> Work From Home
                </label>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-md mb-2">Salary</h4>
                <label className="block mb-2">
                  <input type="checkbox" /> 3-6 Lakhs
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> 6-10 Lakhs
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> 10-15 Lakhs
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> 15-25 Lakhs
                </label>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-md mb-2">Role Category</h4>
                <label className="block mb-2">
                  <input type="checkbox" /> Software Developer
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> QA
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> DevOps
                </label>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-md mb-2">Experience</h4>
                <label className="block mb-2">
                  <input type="checkbox" /> Fresher
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> 0-1 years
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> 1-2 years
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> 2-5 years
                </label>
                <label className="block mb-2">
                  <input type="checkbox" /> 5 and above
                </label>
              </div>
            </aside>

            {/* Job Listings */}
            <div className="col-span-4">
              <div className="space-y-6">
                {/* Job Card */}
                {['MERN stack developer', 'Front end Developer', 'Software Tester', 'DevOps'].map((jobTitle, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{jobTitle}</h2>
                      <p className="text-gray-400">Company {index === 0 ? 'Infosys' : index === 1 ? 'Google' : index === 2 ? 'Jkart' : 'DC'}</p>
                      <div className="mt-2 space-x-4">
                        <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">Full Time</span>
                        <span className="inline-block bg-gray-700 text-white px-3 py-1 rounded-full">Information Technology</span>
                        <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">Salary upto 8.8 LPA</span>
                      </div>
                    </div>
                    <img
                      src={`https://via.placeholder.com/50?text=${index === 0 ? 'Infosys' : index === 1 ? 'Google' : index === 2 ? 'Jkart' : 'DC'}`}
                      alt="Company Logo"
                      className="rounded-full"
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-10">
                <button className="px-4 py-2 bg-gray-600 rounded-lg text-white mx-1">Previous</button>
                {[...Array(10)].map((_, i) => (
                  <button key={i} className={`px-3 py-2 ${i === 0 ? 'bg-green-400' : 'bg-gray-600'} rounded-lg text-white mx-1`}>
                    {i + 1}
                  </button>
                ))}
                <button className="px-4 py-2 bg-gray-600 rounded-lg text-white mx-1">Next</button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-gray-900 mt-10 p-6 rounded-lg text-gray-400">
            <div className="flex justify-between">
              <p>Great platform for job seekers that are passionate about startups. Find your dream job easier.</p>
              <div className="flex space-x-4">
                <a href="#">About</a>
                <a href="#">Resources</a>
                <a href="#">Connect with us</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default page
