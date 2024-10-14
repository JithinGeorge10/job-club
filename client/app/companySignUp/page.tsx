"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '@/utils/constants'
import Link from 'next/link';


function page() {


  type signup = {
    companyName: String
    description: String
    email: String
    website: String
    industry: String
    location: String
    password: string
    confirmPassword: string
  }
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<signup>();

  const router = useRouter()

  const onSubmit = async (data: signup) => {

    try {
      localStorage.clear();
      console.log('++++++',data)

      let response = await axios.post(`${AUTH_SERVICE_URL}/company-register`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response.data);
      if (response.data.success) {
        toast.info('Verify OTP')
         setTimeout(() => {
              router.push(`companyOtpPage?id=${data.email}`)
          }, 3000);
      } else {
        toast.error('Company Already exists')
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('images/signup.jpeg')` }}>                <form
          onSubmit={handleSubmit(onSubmit)}

          className="w-full max-w-lg bg-black p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-white text-center mb-6">Register to post <span className="text-green-400">{`Job`}</span></h2>

          <div className="mb-4">
            <input
              {...register("companyName", {
                required: "company name is required",
                pattern: {
                  value: /^(?=.{1,15}$)[A-Za-z][A-Za-z0-9._]*$/,
                  message:
                    "companyName can only contain letters, numbers, periods, and underscores. It must start with a letter.",
                },
              })}
              type='text'
              placeholder="Company Name"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.companyName?.message as string}</p>
          </div>
          <div className="mb-4">
            <input
              {...register("description", {
                required: "Description is required",

              })}
              type='text'
              placeholder="Description"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.description?.message as string}</p>
          </div>



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
              {...register("website", {
                required: "Website is required",
                pattern: {
                  value: /^((https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "Please enter a valid address.",
                },
              })}
              type='input'
              placeholder="Enter website"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.website?.message as string}</p>
          </div>

          <div className="mb-4">
            <input
              {...register("industry", {
                required: "Industry is required",

              })}
              type='text'
              placeholder="Enter Industry"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.industry?.message as string}</p>
          </div>

          <div className="mb-4">
            <input
              {...register("location", {
                required: "Location is required",

              })}
              type='text'
              placeholder="Location"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.location?.message as string}</p>
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

          <div className="mb-6">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password",
                validate: (value) => value === getValues("password") || "Passwords do not match",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              type='password'
              placeholder="Confirm password"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.confirmPassword?.message as string}</p>
          </div>



          <div>
            --------------------------------------------------------------------
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
           Register
          </button>
          <div>
            <br />

            <Link href={'/login'}>
              Already having an account?
              <button className=" text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
                Login
              </button>
            </Link>
          </div>


        </form>
      </div>
    </>

  )
}

export default page
