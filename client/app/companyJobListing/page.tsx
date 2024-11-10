'use client'
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import CompanyNavbar from '../components/companyNavbar';
import CompanyLeftSideBar from '../components/companyLeftSideBar';
import axios from 'axios';
import { COMPANY_SERVICE_URL } from '@/utils/constants';
import { useRouter } from 'next/navigation';

function JobTable() {
  const router = useRouter();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [jobDetails, setJobDetails] = useState<any[]>([]);
  const [filteredJobDetails, setFilteredJobDetails] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    const company: string | null = localStorage.getItem('company');
    if (company && company !== 'undefined') {
      let companyDetails = JSON.parse(company);
      setCompanyId(companyDetails._id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${COMPANY_SERVICE_URL}/get-jobDetails`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setJobDetails(response.data.jobDetails);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (companyId && jobDetails.length > 0) {
      const filteredJobs = jobDetails.filter((job) => job.companyId._id === companyId);
      setFilteredJobDetails(filteredJobs);
    }
  }, [companyId, jobDetails]);

  const filteredAndSearchedJobs = filteredJobDetails.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredAndSearchedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredAndSearchedJobs.length / jobsPerPage);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handleCloseJob = async (jobId: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post(`${COMPANY_SERVICE_URL}/changeStatus-jobDetails`, { jobId }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(response);

        Swal.fire('Closed!', 'The job has been closed.', 'success');
        setFilteredJobDetails((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, status: false } : job
          )
        );
      }
    });
  };

  const handleEditJob = (jobId: string) => {
    console.log(jobId)
    router.push(`editJob?id=${jobId}`);

  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <CompanyNavbar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
        <CompanyLeftSideBar />

        <div className="flex-1 flex flex-col items-center justify-start p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6 md:mb-8 text-center md:text-left">Job Listings</h1>

          <input
            type="text"
            placeholder="Search by job title..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-4xl p-2 mb-4 rounded-lg text-gray-800"
          />

          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-700 text-left border-b border-gray-600">
                  <th className="p-4 text-sm md:text-base">Role</th>
                  <th className="p-4 text-sm md:text-base">Status</th>
                  <th className="p-4 text-sm md:text-base">Start Date</th>
                  <th className="p-4 text-sm md:text-base">Due Date</th>
                  <th className="p-4 text-sm md:text-base">Type</th>
                  <th className="p-4 text-sm md:text-base">Applicants</th>
                  <th className="p-4 text-sm md:text-base">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.map((job) => (
                  <tr key={job._id} className="border-b border-gray-700">
                    <td className="p-3 md:p-4 bg-gray-900 text-sm md:text-base">{job.jobTitle}</td>
                    <td className="p-3 md:p-4 bg-gray-900 text-sm md:text-base">
                      <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${job.status ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                        {job.status ? 'Live' : 'Closed'}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 bg-gray-900 text-sm md:text-base">{new Date(job.startDate).toLocaleDateString()}</td>
                    <td className="p-3 md:p-4 bg-gray-900 text-sm md:text-base">{new Date(job.endDate).toLocaleDateString()}</td>
                    <td className="p-3 md:p-4 bg-gray-900 text-sm md:text-base">
                      <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs md:text-sm">
                        {job.employmentType[0]}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 bg-gray-900 text-sm md:text-base">{job.slots}</td>
                    <td className="p-3 md:p-4 bg-gray-900 flex space-x-2">
                      {job.status ? (
                        <button
                          onClick={() => handleCloseJob(job._id)}
                          className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-full text-xs md:text-sm"
                        >
                          Close
                        </button>
                      ) : (
                        <button
                          className="bg-gray-600 text-white px-3 py-1 rounded-full cursor-not-allowed text-xs md:text-sm"
                          disabled
                        >
                          Closed
                        </button>
                      )}
                      {/* New Edit button */}
                      <button
                        onClick={() => handleEditJob(job._id)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-full text-xs md:text-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobTable;
