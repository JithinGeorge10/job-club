'use client'
import { AUTH_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
function ChangePassword() {
    const searchParams = useSearchParams();
    const router = useRouter()
    // const userId = searchParams.get('id');
    const [userId, setUserId] = useState<string | null>(null);


    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        const user: string | null = localStorage.getItem('user');
        if (user && user !== 'undefined') {
            let userDetails = JSON.parse(user);
            setUserId(userDetails._id);
        }
    }, []);
    const onSubmit = async (data: any) => {
        const response = await axios.post(`${AUTH_SERVICE_URL}/changePassword`, { data, userId }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        if (response.data.errorMessage) {
            toast.error(response.data.errorMessage)
        } else {
            toast.success('Password updated')
            router.push(`userProfile?id=${userId}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Change Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="oldPassword" className="block text-white mb-2">Current Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            {...register('oldPassword', { required: 'Old Password is required' })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
                        />
                        {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message as String}</p>}
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-white mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            {...register('newPassword', {
                                required: 'New Password is required',
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,

                                    message: 'Password must start with a letter and can contain letters, numbers, periods, and underscores.',
                                },
                            })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
                        />
                        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message as String}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-white mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword', { required: 'Confirm Password is required' })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message as String}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
