'use client';
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
    const company = localStorage.getItem('company');
    if (company && company !== 'undefined') {
      const companyDetails = JSON.parse(company);
      setCompanyId(companyDetails._id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${COMPANY_SERVICE_URL}/get-jobDetails`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setJobDetails(response.data.jobDetails);
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (companyId) {
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

  const handleCloseJob = async (jobId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`${COMPANY_SERVICE_URL}/changeStatus-jobDetails`, { jobId }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          });
          Swal.fire('Closed!', 'The job has been closed.', 'success');
          setFilteredJobDetails((prevJobs) =>
            prevJobs.map((job) =>
              job._id === jobId ? { ...job, status: false } : job
            )
          );
        } catch (error) {
          Swal.fire('Error!', 'Failed to close the job.', 'error');
        }
      }
    });
  };

  const handleEditJob = (jobId: string) => {
    router.push(`editJob?id=${jobId}`);
  };

  const handleDeleteJob = async (jobId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the job permanently.',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${COMPANY_SERVICE_URL}/delete-jobDetails`, {
            data: { jobId },
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          });
          Swal.fire('Deleted!', 'The job has been deleted.', 'success');
          setFilteredJobDetails((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete the job.', 'error');
        }
      }
    });
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleSelectJob = (jobId: string) => {
    console.log('Selected Job ID:', jobId);
    router.push(`applicantSingleJob?id=${jobId}`);
  };
  return (
    <>
      <CompanyNavbar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
        <CompanyLeftSideBar />
        <div className="flex-1 flex flex-col items-center p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6 md:mb-8 text-center md:text-left">Job Listings</h1>
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-4xl p-2 mb-4 rounded-lg text-gray-800"
          />
          <div className="overflow-x-auto w-full max-w-4xl shadow-lg rounded-lg">
            <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-700 text-left border-b border-gray-600">
                  {['Role', 'Status', 'Start Date', 'Due Date', 'Type', 'Action'].map((header) => (
                    <th key={header} className="p-4 text-sm md:text-base">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentJobs.map((job) => (
                  <tr key={job._id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td
                      className="p-3 md:p-4 cursor-pointer hover:underline"
                      onClick={() => handleSelectJob(job._id)}
                    >
                      {job.jobTitle}
                    </td>
                    <td className="p-3 md:p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${job.status ? 'bg-green-600' : 'bg-red-600'}`}>
                        {job.status ? 'Live' : 'Closed'}
                      </span>
                    </td>
                    <td className="p-3 md:p-4">{new Date(job.startDate).toLocaleDateString()}</td>
                    <td className="p-3 md:p-4">{new Date(job.endDate).toLocaleDateString()}</td>
                    <td className="p-3 md:p-4">{job.employmentType[0]}</td>
                 
                    <td className="p-3 md:p-4 flex space-x-2">
                      {job.status ? (
                        <button onClick={() => handleCloseJob(job._id)} className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded-full">
                          Close
                        </button>
                      ) : (
                        <button disabled className="bg-gray-600 px-3 py-1 rounded-full">
                          Closed
                        </button>
                      )}
                      <button onClick={() => handleEditJob(job._id)} className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-full">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteJob(job._id)} className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-full">
                        Delete
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
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md"
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
