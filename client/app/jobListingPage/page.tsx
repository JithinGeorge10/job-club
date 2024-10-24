'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { COMPANY_SERVICE_URL } from '@/utils/constants'
import axios from 'axios'

function page() {
 
  const [jobDetails, setJobDetails] = useState<any | null>()
  const [searchTerm, setSearchTerm] = useState<string>('') 
  const [filteredJobs, setFilteredJobs] = useState<any[]>([])
  useEffect(() => {
    const res = async function () {
      let response = await axios.get(`${COMPANY_SERVICE_URL}/get-jobDetails`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      console.log(response.data);
      setJobDetails(response.data.jobDetails)
    }
    res()
  }, [])

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const filtered = jobDetails.filter((job: { jobTitle: string; companyId: { companyName: string }; category: string }) => 
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyId.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredJobs(filtered)
    } else {
      setFilteredJobs(jobDetails)   
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Enter skill/designations/companies"
              className="w-2/3 p-4 rounded-l-full text-black"
            />
            <button onClick={handleSearch} className="bg-green-400 px-6 py-4 rounded-r-full text-black">Search</button>
          </div>
         
      {jobDetails?.map((job:any, index:number) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{job.jobTitle}</h2>
                      <h2 className="text-2xl font-bold">{job.companyId.companyName}</h2>
                      <div className="mt-2 space-x-4">  
                        <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">{job.employmentType[0]}</span>
                        <span className="inline-block bg-gray-700 text-white px-3 py-1 rounded-full">{job.category}</span>
                        <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">Salary upto &#8377; {job.maxSalary}  </span>
                      </div>
                    </div>
                    {/* <img
                      src={`https://via.placeholder.com/50?text=${index === 0 ? 'Infosys' : index === 1 ? 'Google' : index === 2 ? 'Jkart' : 'DC'}`}
                      alt="Company Logo"
                      className="rounded-full"
                    /> */}
                  </div>
                ))}
    </>
  )
}

export default page
