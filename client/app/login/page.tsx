"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { AUTH_SERVICE_URL } from '@/utils/constants'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';

function page() {

  const router = useRouter()
  type login = {
    email: string,
    password: string
  }
  const { register, handleSubmit, formState: { errors } } = useForm<login>();
  const onSubmit = async (data: login) => {
    let response = await axios.post(`${AUTH_SERVICE_URL}/user-login`, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    const user=response.data.user
    if (response.data.success) {
      localStorage.setItem('user',JSON.stringify(user));
      toast.success('Welcome')
      setTimeout(() => {
        router.replace(`jobListingPage`)
      }, 3000);
    } else {
      toast.error('Invalid credentials')
    }
  };





  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('images/login.jpeg')` }}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-black p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">Login to <span className="text-green-400">{`_JobClub.`}</span></h2>

          <div className="mb-4">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
              type='email'
              placeholder="Enter email"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.email?.message as string}</p>
          </div>

          <div className="mb-4">
            <input
              {...register("password", {
                required: "Enter password",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              type='password'
              placeholder="Enter password"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.password?.message as string}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Sign Up
          </button>

        </form>
      </div>
    </>
  );
}

export default page
