'use client';
import { COMPANY_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function EditJobPage() {
  const router = useRouter();
  interface JobDetails {
    _id: string;
    jobTitle: string;
    employmentType: string[];
    maxSalary: string;
    minSalary: string;
    qualification: string;
    jobResponsibilities: string;
    jobDescription: string;
    requirements: string;
  }

  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${COMPANY_SERVICE_URL}/get-singleJobDetails?jobId=${jobId}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setJobDetails(response.data.jobDetails[0]);
    };
    fetchData();
  }, [jobId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (jobDetails) {
      const { name, value } = e.target;
      setJobDetails({ ...jobDetails, [name]: value });
    }
  };

  const handleUpdateJob = async () => {
    try {
      await axios.put(`${COMPANY_SERVICE_URL}/update-jobDetails`, { ...jobDetails, jobId }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      toast.success('Job updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    
    setTimeout(() => {
        router.push(`/companyJobListing`);
    }, 3000);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-white text-3xl font-bold mb-6">Edit Job</h2>
        
        <label className="text-white">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={jobDetails?.jobTitle || ''}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white"
        />

        <label className="text-white">Employment Type</label>
        <input
          type="text"
          name="employmentType"
          value={jobDetails?.employmentType.join(', ') || ''}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white"
        />

        <label className="text-white">Max Salary</label>
        <input
          type="text"
          name="maxSalary"
          value={jobDetails?.maxSalary || ''}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white"
        />

        <label className="text-white">Min Salary</label>
        <input
          type="text"
          name="minSalary"
          value={jobDetails?.minSalary || ''}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white"
        />

        <label className="text-white">Qualifications</label>
        <textarea
          name="qualification"
          value={jobDetails?.qualification || ''}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white"
          rows={3}
        ></textarea>

        <label className="text-white">Responsibilities</label>
        <textarea
          name="jobResponsibilities"
          value={jobDetails?.jobResponsibilities || ''}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white"
          rows={3}
        ></textarea>

        <label className="text-white">Description</label>
        <textarea
          name="jobDescription"
          value={jobDetails?.jobDescription || ''}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white"
          rows={4}
        ></textarea>

        <label className="text-white">Requirements</label>
        <textarea
          name="requirements"
          value={jobDetails?.requirements || ''}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white"
          rows={3}
        ></textarea>

        <button
          onClick={handleUpdateJob}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-full mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditJobPage;
