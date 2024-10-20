import React from 'react'
import CompanyNavbar from '../components/companyNavbar'
import Link from 'next/link'

function page() {
  return (
    <div>
      <CompanyNavbar />
      <div className="flex">
        <aside className="bg-black text-white h-screen w-1/5 p-5">
          <nav className="space-y-4">
            <a href="#" className="text-green-400">Dashboard</a>
            <br />
            <a href="#">Messages</a>
            <br />
            <a href="#">Company Profile</a>
            <br />
            <a href="#">All Applicants</a>
            <br />
            <a href="#">Job Listing</a>
            <br />
            <a href="#">Settings</a>
          </nav>
        
        </aside>

        <main className="bg-white text-black w-4/5 p-10">
          <header className="flex justify-between items-center">
            <div className="flex items-center">
             
              <div className="ml-4">
                <h2 className="font-bold text-2xl">Company Google</h2>
              </div>
            </div>
            <Link href={'postJob'}>
            <button  className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
              + Post Job
            </button>
            </Link>
          </header>

          <section className="mt-10">
            <h2 className="font-bold text-lg">Welcome Google</h2>
            <p className="text-gray-500">Here is your job listings statistic report</p>

            <div className="grid grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg">Job Posts</h3>
                <p className="font-bold text-3xl">2,456</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg">Total Applications</h3>
                <p className="font-bold text-3xl">4,561</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg">No of Hirings</h3>
                <p className="font-bold text-3xl">2,456</p>
              </div>
            </div>
          </section>

          <section className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
            <header className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Application Response</h3>
              <a href="#" className="text-orange-500 font-semibold">Download Report</a>
            </header>
            <div className="mt-6">
              <img
                src="https://via.placeholder.com/300"
                alt="Application Response Chart"
                className="mx-auto"
              />
              <div className="flex justify-around mt-6">
                <div>
                  <p className="font-bold text-xl">+2.5%</p>
                  <p>Shortlisted</p>
                </div>
                <div>
                  <p className="font-bold text-xl">+0.4%</p>
                  <p>Hired</p>
                </div>
                <div>
                  <p className="font-bold text-xl">-0.5%</p>
                  <p>Rejected</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default page
