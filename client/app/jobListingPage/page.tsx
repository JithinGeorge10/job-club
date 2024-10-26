'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { COMPANY_SERVICE_URL } from '@/utils/constants'
import axios from 'axios'

function Page() {
  const [jobDetails, setJobDetails] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredJobs, setFilteredJobs] = useState<any[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const jobsPerPage = 5

  const salaryRanges = [
    { label: '0 - 20k', value: '0-20000' },
    { label: '20k - 50k', value: '20000-50000' },
    { label: '50k - 80k', value: '50000-80000' },
    { label: '80k+', value: '80000-1000000000' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`${COMPANY_SERVICE_URL}/get-jobDetails`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      setJobDetails(response.data.jobDetails)
      setFilteredJobs(response.data.jobDetails)
    }
    fetchData()
  }, [])

  const handleSearch = () => {
    let filtered = jobDetails;

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((job: { jobTitle: string; companyId: { companyName: string }; category: string }) => 
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyId.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedSalaryRanges.length > 0) {
      filtered = filtered.filter((job: { maxSalary: number; minSalary: number }) => {
        const jobMinSalary = job.minSalary || 0;
        const jobMaxSalary = job.maxSalary || 0;

        return selectedSalaryRanges.some(range => {
          const [min, max] = range.split('-').map(Number);
          return (max ? jobMaxSalary <= max : jobMinSalary >= min) && jobMinSalary >= min;
        });
      });
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((job: { category: string }) =>
        selectedCategories.includes(job.category)
      );
    }

    setFilteredJobs(filtered)
    setCurrentPage(1) // Reset to the first page after filtering
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  }

  const handleSalaryRangeChange = (range: string) => {
    setSelectedSalaryRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  }

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <Navbar />

      <div className="p-8">

        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search by skill, designation, or company"
            className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}  
          />
          <button onClick={handleSearch} className="bg-green-600 px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-700">
            Search
          </button>
        </div>

        <div className="flex">

          <div className="w-1/4 bg-gray-800 p-4 rounded-lg border border-gray-600 mr-6">
            <h2 className="text-xl font-bold mb-4 text-white">Filters</h2>

            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-white">Salary Range</h3>
              {salaryRanges.map(range => (
                <label key={range.value} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={range.value}
                    checked={selectedSalaryRanges.includes(range.value)}
                    onChange={() => handleSalaryRangeChange(range.value)}
                    className="mr-2"
                  />
                  <span className="text-white">{range.label}</span>
                </label>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-white">Category</h3>
              {['IT', 'Design'].map(category => (
                <label key={category} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  <span className="text-white">{category}</span>
                </label>
              ))}
            </div>

            <button onClick={handleSearch} className="w-full bg-green-500 py-2 rounded-lg text-black font-semibold hover:bg-green-600">
              Apply Filters
            </button>
          </div>

          <div className="w-3/4">
            {currentJobs.length > 0 ? (
              currentJobs.map((job: any, index: number) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg flex items-center justify-between mb-4 border border-gray-600">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{job.jobTitle}</h2>
                    <h2 className="text-xl font-semibold text-gray-300">{job.companyId.companyName}</h2>
                    <div className="mt-2 space-x-4">  
                      <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">{job.employmentType[0]}</span>
                      <span className="inline-block bg-gray-700 text-white px-3 py-1 rounded-full">{job.category}</span>
                      <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">Salary upto &#8377; {job.maxSalary}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-xl font-bold text-red-500">
                No results found
              </div>
            )}

            {/* Pagination controls */}
            <div className="flex justify-center space-x-2 mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;
