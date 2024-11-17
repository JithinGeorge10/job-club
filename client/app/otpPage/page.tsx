'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { AUTH_SERVICE_URL } from '@/utils/constants'
import { useRouter, useSearchParams } from 'next/navigation';

export default function OTPVerification({ params }: { params: { email: string } }) {
    const { register, handleSubmit } = useForm()
    const [timer, setTimer] = useState(50)
    const [showVerify, setShowVerify] = useState(true)
    const router = useRouter()
    const searchParams = useSearchParams();
    const email = searchParams.get('id');
    let interval: NodeJS.Timeout;

 
    const calculateTimeLeft = () => {
        const storedTime = localStorage.getItem('otpStartTime')
        const currentTime = Date.now()
        if (storedTime) {
            const elapsedTime = Math.floor((currentTime - parseInt(storedTime)) / 1000)
            const timeLeft = 50 - elapsedTime
            return timeLeft > 0 ? timeLeft : 0
        }
        return 50
    }

    useEffect(() => {
        const savedTimeLeft = calculateTimeLeft()

        if (savedTimeLeft === 0) {
            setShowVerify(false)
        }

        setTimer(savedTimeLeft)
        if (savedTimeLeft > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 1) {
                        return prevTimer - 1
                    } else {
                        setShowVerify(false)
                        clearInterval(interval)
                        return 0
                    }
                })
            }, 1000)

            if (!localStorage.getItem('otpStartTime')) {
                localStorage.setItem('otpStartTime', Date.now().toString())
            }

            return () => clearInterval(interval)
        }
    }, [])

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
            const { otp } = data

            let response = await axios.post(`${AUTH_SERVICE_URL}/verify-otp`, { otp, email }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            const user=response.data.verifiedUser
            if (response.data.success) {
                localStorage.setItem('user',JSON.stringify(user));
                toast.success('Account created')
                setTimeout(() => {
                    router.push(`jobListingPage`)//pass values as params---folder structure :jobListingPage
                }, 3000);
            } else {
                toast.error('Invalid OTP')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleResend = async () => {

        setShowVerify(true)
        setTimer(50)
        localStorage.setItem('otpStartTime', Date.now().toString())

        clearInterval(interval)

        interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 1) {
                    return prevTimer - 1
                } else {
                    setShowVerify(false)
                    clearInterval(interval)
                    return 0
                }
            })
        }, 1000)
        let response = await axios.post(`${AUTH_SERVICE_URL}/resend-otp`, {email}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
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

                    {showVerify ? (
                        <motion.button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Verify OTP
                        </motion.button>
                    ) : (
                        <p className="text-gray-400 text-center mt-4">
                            Time expired. Please resend the OTP.
                        </p>
                    )}
                </form>

                {timer > 0 && (
                    <p className="text-gray-400 text-center mt-4">Resend OTP in {timer} seconds</p>
                )}

                {timer === 0 && (
                    <motion.button
                        onClick={handleResend}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 mt-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Resend OTP
                    </motion.button>
                )}


            </motion.div>
        </div>
    )
}