'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { COMPANY_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Footer from '../components/footer/footer';

function Page() {
  const router = useRouter();

  const [jobDetails, setJobDetails] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 5;

  const salaryRanges = [
    { label: '0 - 2 LPA', value: '0-200000' },
    { label: '2 - 5 LPA', value: '200000-500000' },
    { label: '5 - 8 LPA', value: '500000-800000' },
    { label: '8+ LPA', value: '800000-1000000000' },
  ];

  const employmentTypes = [
    { label: 'Full Time', value: 'Full time' },
    { label: 'Part Time', value: 'Part time' },
    { label: 'Remote', value: 'Remote' },
    { label: 'Internship', value: 'Internship' },
    { label: 'Contract', value: 'Contract' },
  ];


  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`${COMPANY_SERVICE_URL}/get-jobDetails`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setJobDetails(response.data.jobDetails);
      setFilteredJobs(response.data.jobDetails);
    };
    fetchData();
  }, []);

  const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  

  const handleSearch = useCallback(() => {
    let filtered = jobDetails;

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((job) =>
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyId.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [jobDetails, searchTerm]);

  const debouncedSearch = useCallback(debounce(handleSearch, 500), [handleSearch]);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm, debouncedSearch]);

  const applyFilters = async () => {


    try {
      const response = await axios.post(`${COMPANY_SERVICE_URL}/get-filteredJobs`, {
        salaryRanges: selectedSalaryRanges,
        categories: selectedCategories,
        employmentTypes: selectedEmploymentTypes,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      setFilteredJobs(response.data.filteredJobs);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
    }
  };

  const handleEmploymentTypeChange = (type: string) => {
    setSelectedEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSalaryRangeChange = (range: string) => {
    setSelectedSalaryRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleJobClick = async (jobId: any, companyId: any) => {
    router.push(`jobView?jobId=${jobId}`);
  };

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
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-white">Employment Type</h3>
              {employmentTypes.map(type => (
                <label key={type.value} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={type.value}
                    checked={selectedEmploymentTypes.includes(type.value)}
                    onChange={() => handleEmploymentTypeChange(type.value)}
                    className="mr-2"
                  />
                  <span className="text-white">{type.label}</span>
                </label>
              ))}
            </div>

            <button onClick={applyFilters} className="w-full bg-green-500 py-2 rounded-lg text-black font-semibold hover:bg-green-600">
              Apply Filters
            </button>
          </div>

          <div className="w-3/4">
            {currentJobs.length > 0 ? (
              currentJobs.map((job: any, index: number) => (
                <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg flex items-center justify-between mb-4 border border-gray-600"
              >
                <div>
                  <button
                    onClick={() => handleJobClick(job._id, job.companyId._id)}
                    className="text-2xl font-bold text-white"
                  >
                    {job.jobTitle}
                  </button>
                  <h2 className="text-xl font-semibold text-gray-300">
                    {job.companyId.companyName}
                  </h2>
                  <div className="mt-2 space-x-4">
                    <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">
                      {job.employmentType[0]}
                    </span>
                    <span className="inline-block bg-gray-700 text-white px-3 py-1 rounded-full">
                      {job.category}
                    </span>
                    <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">
                      Salary upto &#8377;{job.maxSalary ? job.maxSalary : 'N/A'}
                    </span>
                  </div>
                </div>
              
                {job.companyId.profileImage && (
                  <img
                    src={job.companyId.profileImage}
                    alt="Company Logo"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
              </div>
              
              ))
            ) : (
              <div className="text-white text-center text-lg">No jobs found.</div>
            )}

            <div className="flex justify-center mt-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'} mx-1`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
