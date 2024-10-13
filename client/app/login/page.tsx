"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
function page() {
  type login = {
    email: string,
    password: string
  }
  const { register, handleSubmit, formState: { errors } } = useForm<login>();
  const onSubmit = (data: login) => {
    console.log(data);
  };
  return (
   <>
      <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('images/login.jpeg')` }}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-black p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Login to <span className="text-green-400">{`Job hunt`}</span></h2>

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
