'use client'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Navbar from '../components/Navbar';

interface EmploymentFormInputs {
  companyName: string;
  jobTitle: string;
  experience: string;
  salary: string;
  skills: string;
  fromDate: string;
  toDate: string;
}

const AddEmploymentForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<EmploymentFormInputs>();
  const [submittedData, setSubmittedData] = useState<EmploymentFormInputs | null>(null);

  const fromDate = watch('fromDate');

  const onSubmit = (data: EmploymentFormInputs) => {
    setSubmittedData(data);
    console.log("Form Submitted Data: ", data);
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 space-y-6"
      >
        <h2 className="text-center text-xl font-bold">Add Employment</h2>

        <div>
          <label className="block mb-2">Company name:</label>
          <input
            {...register('companyName', { required: true })}
            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
            placeholder="Company Name"
          />
          {errors.companyName && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="block mb-2">Job Title:</label>
          <input
            {...register('jobTitle', { required: true })}
            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
            placeholder="Job Title"
          />
          {errors.jobTitle && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="block mb-2">Experience</label>
          <select
            {...register('experience', { required: true })}
            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3 years">3 years</option>
            <option value="4 years">4 years</option>
          </select>
          {errors.experience && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="block mb-2">Salary</label>
          <select
            {...register('salary', { required: true })}
            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            <option value="2 LPA">2 LPA</option>
            <option value="3.4 LPA">3.4 LPA</option>
            <option value="5 LPA">5 LPA</option>
            <option value="6 LPA">6 LPA</option>
          </select>
          {errors.salary && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="block mb-2">Skills</label>
          <input
            {...register('skills', { required: true })}
            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
            placeholder="Skills"
          />
          {errors.skills && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="block mb-2">From</label>
          <input
            type="date"
            {...register('fromDate', { required: true })}
            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
          />
          {errors.fromDate && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="block mb-2">To</label>
          <input
            type="date"
            {...register('toDate', {
              required: true,
              validate: (value) => {
                if (!fromDate) return true;
                return new Date(value) >= new Date(fromDate) || "To date cannot be earlier than From date";
              },
            })}
            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
          />
          {errors.toDate && <span className="text-red-500">{errors.toDate.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
        >
          Save
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 text-center">
          <h3 className="font-bold">Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
    </>
  );
};

export default AddEmploymentForm;
