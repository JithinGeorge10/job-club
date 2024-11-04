'use client';
import React, { useEffect, useState } from 'react';
import CompanyNavbar from '../components/companyNavbar';
import CompanyLeftSideBar from '../components/companyLeftSideBar';
import axios from 'axios';
import { COMPANY_SERVICE_URL } from '@/utils/constants';

function JobTable() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [jobDetails, setJobDetails] = useState<any[]>([]);
  const [filteredJobDetails, setFilteredJobDetails] = useState<any[]>([]);


  useEffect(() => {
    const company: string | null = localStorage.getItem('company');
    if (company && company !== 'undefined') {
      let companyDetails = JSON.parse(company);
      setCompanyId(companyDetails._id);
    }
  }, []);
  console.log(companyId);

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

  console.log(jobDetails);

  useEffect(() => {
    if (companyId && jobDetails.length > 0) {
      const filteredJobs = jobDetails.filter(
        (job) => job.companyId._id === companyId
      );
      setFilteredJobDetails(filteredJobs);
    }
  }, [companyId, jobDetails]);

  console.log(filteredJobDetails);

  return (
    <>
      <CompanyNavbar />
      <div className="flex min-h-screen bg-black">
        <CompanyLeftSideBar />

        <div className="flex-1 flex items-start justify-center p-8">
          <table className="w-full max-w-4xl bg-gray-900 text-white rounded-lg shadow-lg">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Type</th>
                <th className="p-4">Applicants</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobDetails.map((job) => (
                <tr key={job._id} className="border-b border-gray-700">
                  <td className="p-4 bg-gray-800">{job.jobTitle}</td>
                  <td className="p-4 bg-gray-800">Live</td>
                  <td className="p-4 bg-gray-800">{new Date(job.startDate).toLocaleDateString()}</td>
                  <td className="p-4 bg-gray-800">{new Date(job.endDate).toLocaleDateString()}</td>
                  <td className="p-4 bg-gray-800">
                    <button className="bg-green-500 text-white px-4 py-1 rounded-full">
                      {job.employmentType[0]}
                    </button>
                  </td>
                  <td className="p-4 bg-gray-800">{job.slots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default JobTable;
