'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '@/utils/constants';
import { useRouter, useSearchParams, useParams } from 'next/navigation';

export default function OTPVerification() {
    const { register, handleSubmit } = useForm();
    const [timer, setTimer] = useState(50);
    const [showVerify, setShowVerify] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { email } = useParams<{ email: string }>();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev > 1) return prev - 1;
                setShowVerify(false);
                clearInterval(interval);
                return 0;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const { otp } = data;
            const response = await axios.post(`${AUTH_SERVICE_URL}/company-verify-otp`, { otp, email });
            if (response.data.success) {
                toast.success('OTP verified successfully');
                router.push(`/companyDashboard?id=${response.data.verifiedCompany._id}`);
            } else {
                toast.error('Invalid OTP');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black p-6 rounded-lg"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                {...register(`otp[${index}]`)}
                                maxLength={1}
                                className="input-class"
                            />
                        ))}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Verify OTP
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
