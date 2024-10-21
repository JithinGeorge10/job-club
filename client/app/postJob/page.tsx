'use client';
import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

interface Skill {
  skill: string;
}

interface PostJobForm {
  jobTitle: string;
  employmentType: string[];
  minSalary?: number; // Optional
  maxSalary?: number; // Optional
  category: string;
  slots?: number; // Optional
  startDate: string;
  endDate: string;
  skills: Skill[];
  jobDescription?: string; // Optional
  qualification?: string; // Optional
  jobResponsibilities?: string; // Optional
  requirements?: string; // Optional
}

const PostJob: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<PostJobForm>({
    defaultValues: {
      skills: [],
      employmentType: [],
      startDate: '',
      endDate: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const addSkill = () => {
    append({ skill: '' });
  };

  const onSubmit: SubmitHandler<PostJobForm> = (data) => {
    console.log('Form submitted', data);
  };

  // Watch startDate and endDate to validate date range
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-6">Post a Job</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-sm mb-2">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              {...register('jobTitle', { required: 'Job Title is required' })}
              className={`w-full p-2 bg-gray-800 rounded-md text-white ${errors.jobTitle ? 'border-red-500' : ''}`}
              placeholder="eg: Software Engineer"
            />
            {errors.jobTitle && <span className="text-red-500">{errors.jobTitle.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Type of Employment</label>
            <div className="flex gap-4">
              {['Full time', 'Part time', 'Remote', 'Internship', 'Contract'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('employmentType')}
                    value={type}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minSalary" className="block text-sm mb-2">Minimum Salary</label>
              <input
                type="number"
                id="minSalary"
                {...register('minSalary', { min: { value: 0, message: 'Minimum Salary must be at least 0' } })}
                className="w-full p-2 bg-gray-800 rounded-md text-white"
              />
              {errors.minSalary && <span className="text-red-500">{errors.minSalary.message}</span>}
            </div>
            <div>
              <label htmlFor="maxSalary" className="block text-sm mb-2">Maximum Salary</label>
              <input
                type="number"
                id="maxSalary"
                {...register('maxSalary', {
                  min: { value: 0, message: 'Maximum Salary must be at least 0' },
                  validate: (value) => {
                    const minSalary = watch('minSalary') ?? 0; // Use nullish coalescing to set a default
                    return (value !== undefined && value >= minSalary) || 'Maximum Salary must be greater than Minimum Salary';
                }
                })}
                className="w-full p-2 bg-gray-800 rounded-md text-white"
              />
              {errors.maxSalary && <span className="text-red-500">{errors.maxSalary.message}</span>}
            </div>  
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm mb-2">Category</label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="w-full p-2 bg-gray-800 rounded-md text-white"
            >
              <option value="">Select Category</option>
              <option value="IT">Information Technology</option>
              <option value="Design">Design</option>
            </select>
            {errors.category && <span className="text-red-500">{errors.category.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="slots" className="block text-sm mb-2">Slots</label>
            <input
              type="number"
              id="slots"
              {...register('slots', { min: { value: 1, message: 'At least 1 slot is required' } })}
              className="w-full p-2 bg-gray-800 rounded-md text-white"
              placeholder="At least 1 slot"
            />
            {errors.slots && <span className="text-red-500">{errors.slots.message}</span>}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm mb-2">Start Date</label>
              <input
                type="date"
                id="startDate"
                {...register('startDate', { required: 'Start Date is required' })}
                className={`w-full p-2 bg-gray-800 rounded-md text-white ${errors.startDate ? 'border-red-500' : ''}`}
              />
              {errors.startDate && <span className="text-red-500">{errors.startDate.message}</span>}
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm mb-2">End Date</label>
              <input
                type="date"
                id="endDate"
                {...register('endDate', { 
                  required: 'End Date is required', 
                  validate: (value) => {
                    const startDateValue = startDate ?? ''; // Use nullish coalescing to set a default
                    return (new Date(value) >= new Date(startDateValue)) || 'End Date must be after Start Date';
                  } 
                })}
                className={`w-full p-2 bg-gray-800 rounded-md text-white ${errors.endDate ? 'border-red-500' : ''}`}
              />
              {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Required Skills</label>
            <div className="flex gap-4 mb-2">
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center">
                  <input
                    type="text"
                    {...register(`skills.${index}.skill`, { required: `Skill ${index + 1} is required` })}
                    className={`w-full p-2 bg-gray-800 rounded-md text-white ${errors.skills?.[index]?.skill ? 'border-red-500' : ''}`}
                    placeholder="Add a skill"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="ml-2 bg-red-600 px-3 rounded-md"
                  >
                    Remove
                  </button>
                  {errors.skills?.[index]?.skill && <span className="text-red-500">{errors.skills[index].skill.message}</span>}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSkill}
              className="bg-green-600 px-4 py-2 rounded-md"
            >
              Add Skill
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="jobDescription" className="block text-sm mb-2">Job Description</label>
            <textarea
              id="jobDescription"
              {...register('jobDescription')}
              className="w-full p-2 bg-gray-800 rounded-md text-white"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="qualification" className="block text-sm mb-2">Qualification</label>
            <textarea
              id="qualification"
              {...register('qualification')}
              className="w-full p-2 bg-gray-800 rounded-md text-white"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="jobResponsibilities" className="block text-sm mb-2">Job Responsibilities</label>
            <textarea
              id="jobResponsibilities"
              {...register('jobResponsibilities')}
              className="w-full p-2 bg-gray-800 rounded-md text-white"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="requirements" className="block text-sm mb-2">Requirements</label>
            <textarea
              id="requirements"
              {...register('requirements')}
              className="w-full p-2 bg-gray-800 rounded-md text-white"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
