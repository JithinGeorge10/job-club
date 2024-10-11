'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

export default function OTPVerification() {
    const { register, handleSubmit } = useForm()
    const [data, setData] = useState('')



    const handleOTPChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const value = target.value
        if (value.length === 1 && index < 5) {
            const nextInput = document.querySelector(`input[name="otp[${index + 1}]"]`) as HTMLInputElement
            if (nextInput) nextInput.focus()
        }
    }
    const onSubmit = async (data: any) => {
        try {
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-black bg-opacity-50 p-8 rounded-2xl shadow-2xl backdrop-blur-md"
            >
                <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-6">
                    <span className="text-green-400">OTP</span> Verification
                </h2>

                <p className="text-lg text-gray-300 text-center mb-8">
                    A verification code has been sent to your email.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
                        {[...Array(6)].map((_, index) => (
                            <motion.input
                                key={index}
                                {...register(`otp[${index}]`, { required: true, maxLength: 1 })}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold text-white bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-green-500 transition-colors duration-300"
                                placeholder="0"
                                onChange={(e) => handleOTPChange(index, e)}
                                whileFocus={{ scale: 1.05 }}
                            />
                        ))}
                    </div>

                    {data && (
                        <p className="text-green-400 text-center mb-4">
                            Submitted OTP: {data}
                        </p>
                    )}

                   

                   { <motion.button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Verify OTP
                    </motion.button>}
                </form>

                <p className="text-gray-400 text-center mt-6">
                    Didn't receive the code?{' '}
                    <a href="#" className="text-green-400 hover:underline">
                        Resend OTP
                    </a>
                </p>
            </motion.div>
        </div>
    )
}