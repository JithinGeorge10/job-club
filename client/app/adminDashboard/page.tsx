'use client'
import React from 'react'
import AdminLeftSideBar from '../components/adminLeftSideBar';

function Page() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminLeftSideBar />
      

      <main className="bg-white text-black w-full p-6 sm:p-8 md:p-10 ml-[200px]"> 
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="ml-4">
              <h2 className="font-bold text-2xl sm:text-3xl">Welcome Admin</h2>
            </div>
          </div>
        </header>

        <section className="mt-8">
          <p className="text-gray-500 mb-6">Here is your job listings statistic report</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold">Job Posts</h3>
              <p className="font-bold text-3xl mt-2">2,456</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold">Total Applications</h3>
              <p className="font-bold text-3xl mt-2">4,561</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold">No of Hirings</h3>
              <p className="font-bold text-3xl mt-2">2,456</p>
            </div>
          </div>
        </section>

        <section className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <header className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Application Response</h3>
            <a href="#" className="text-orange-500 font-semibold">Download Report</a>
          </header>
          <div className="mt-6">
            <img
              src="https://via.placeholder.com/300"
              alt="Application Response Chart"
              className="mx-auto rounded-md"
            />
            <div className="flex justify-around mt-6">
              <div className="text-center">
                <p className="font-bold text-xl">+2.5%</p>
                <p className="text-sm">Shortlisted</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">+0.4%</p>
                <p className="text-sm">Hired</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">-0.5%</p>
                <p className="text-sm">Rejected</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Page;
