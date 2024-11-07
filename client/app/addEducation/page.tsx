'use client'
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { USER_SERVICE_URL } from '@/utils/constants';
import { useSearchParams,useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface EmploymentFormInputs {
    university: string;
    course: string;
    education: string;
    specialization: string;
    courseType: string;
    cgpa:number;
    fromYear:number;
    toYear:number;
}

const AddEmploymentForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter()
    const userId = searchParams.get('id');
    const { register, handleSubmit, formState: { errors }, watch } = useForm<EmploymentFormInputs>();

    const onSubmit = async (data: EmploymentFormInputs) => {
        const response = await axios.post(`${USER_SERVICE_URL}/add-education`, { data, userId }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        if(response.data.failToken){
            router.push(`login`)
          }
        if (response.data.userDetails) {
          toast.success('Education Added')
          setTimeout(() => {
            router.push(`userProfile?id=${userId}`)
          }, 1000);
        } else {
          toast.error('Error')
          
        }
      };

    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 space-y-6"
                >
                    <h2 className="text-center text-xl font-bold">Add Education</h2>

                    <div>
                        <label className="block mb-2">Education:</label>
                        <select
                            {...register('education', { required: true })}
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
                        >
                            <option value="Graduation">Graduation</option>
                            <option value="SSLC">SSLC</option>
                            <option value="HSC">HSC</option>
                            <option value="Diploma">Diploma</option>
                        </select>
                        {errors.education && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div>
                        <label className="block mb-2">University:</label>
                        <input
                            {...register('university', { required: true })}
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
                            placeholder="University"
                        />
                        {errors.university && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div>
                        <label className="block mb-2">Course:</label>
                        <select
                            {...register('course', { required: true })}
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
                        >
                            <option value="B.tech">B.tech</option>
                            <option value="Bsc">Bsc</option>
                            <option value="Msc">Msc</option>
                            <option value="BCA">BCA</option>
                            <option value="MCA">MCA</option>
                        </select>
                        {errors.course && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div>
                        <label className="block mb-2">Specialization</label>
                        <input
                            {...register('specialization', { required: true })}
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
                            placeholder="specialization"
                        />
                        {errors.specialization && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div>
                        <label className="block mb-2">Course type:</label>
                        <select
                            {...register('courseType', { required: true })}
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
                        >
                            <option value="Full time">Full time</option>
                            <option value="Part time">Part time</option>
                            <option value="Correspondace">Correspondace</option>

                        </select>
                        {errors.courseType && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div>
                        <label className="block mb-2">CGPA:</label>
                        <input
                            {...register('cgpa', { required: true,
                                pattern: {
                                    value: /^(10(\.0{1,2})?|[0-9]{1}\.[0-9]{1,2}|[0-9]{1}[0-9]?(\.[0-9]{1,2})?)$/,
                                    message: "CGPA must be between 0.00 and 10.00"
                                }
                             })}
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
                            placeholder="CGPA"
                        />
                        {errors.cgpa && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div>
                        <label className="block mb-2">From Year:</label>
                        <input
                            type="number"
                            {...register('fromYear', { 
                                required: true,
                                min: { value: 1900, message: "Year must be 1900 or later" },
                                max: { value: new Date().getFullYear(), message: `Year must be ${new Date().getFullYear()} or earlier` }
                            })}
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
                            placeholder="From Year"
                        />
                        {errors.fromYear && <span className="text-red-500">{errors.fromYear.message}</span>}
                    </div>

                    <div>
                        <label className="block mb-2">To Year:</label>
                        <input
                            type="number"
                            {...register('toYear', { 
                                required: true,
                                min: { value: 1900, message: "Year must be 1900 or later" },
                                max: { value: new Date().getFullYear(), message: `Year must be ${new Date().getFullYear()} or earlier` },
                                validate: value => value >= watch('fromYear') || "To Year must be greater than or equal to From Year"
                            })}
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded-md"
                            placeholder="To Year"
                        />
                        {errors.toYear && <span className="text-red-500">{errors.toYear.message}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
                    >
                        Save
                    </button>
                </form>

              
            </div>
        </>
    );
};

export default AddEmploymentForm;
