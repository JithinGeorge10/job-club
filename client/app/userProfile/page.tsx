'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { USER_SERVICE_URL } from '@/utils/constants';
import { useSearchParams ,useRouter} from 'next/navigation';
const Profile = () => {
  
  const router = useRouter()
  interface UserDetailsInterface {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
  }
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [userDetails, setUserDetails] = useState<UserDetailsInterface | null>(null);
  useEffect(() => {
    const res = async function () {
      let response = await axios.get(`${USER_SERVICE_URL}/get-userDetails?id=${userId}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      console.log(response.data);
      setUserDetails(response.data.userDetails)
    }
    res()
  }, [])


  const handleEmployment = () => {
    router.push(`addEmployment?id=${userId}`)
  }
  const handleEducation = () => {
    router.push(`addEducation?id=${userId}`)
  }
  const handleSkill = () => {
    router.push(`addSkill?id=${userId}`)
  }
  
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-black text-white min-h-screen">


        <div className="container mx-auto mt-10 px-6">
          <h1 className="text-4xl font-bold">My public profile</h1>

          <div className="bg-gray-800 rounded-lg p-6 mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">

              <div>
                <h2 className="text-2xl font-semibold">{userDetails?.firstName}</h2>
                {/* <p className="text-gray-400">Profile last updated - 09 Sep, 2024</p> */}
              </div>
            </div>
            <div className="space-y-2 text-right">
              {/* <p>📍 Thrissur, INDIA</p> */}
              <p>📞 {userDetails?.phone}</p>
              <p>✉️ {userDetails?.email}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Resume</h3>
              <div className="space-x-4">
                <button className="text-gray-400">⬇️</button>
                <button className="text-gray-400">🗑️</button>
              </div>
            </div>
            <div className="mt-4">
              <p>Jithin_George’s-resume</p>
              <button className="bg-green-500 text-black px-4 py-2 rounded mt-4">Update Resume</button>
              <p className="text-gray-400 mt-2">Supported formats: doc, docx, rtf, pdf, up to 2 MB</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Employment</h3>
              <button onClick={handleEmployment} className="text-green-500">Add Employment</button>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Software Developer</h4>
              <p>Manappuram Finance</p>
              <p className="text-gray-400">Full-time, Jan 2021 to Jan 2024 (3 years 1 month)</p>
              <p className="mt-2">
                Worked as a PL/SQL developer in Database Administration Team. Optimized database performance by fine-tuning SQL queries...
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Skills</h3>
              <button  onClick={handleSkill} className="text-green-500">Add Skill</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-green-600 px-4 py-2 rounded-full text-black">JavaScript</span>
              <span className="bg-green-600 px-4 py-2 rounded-full text-black">Node.js</span>
              <span className="bg-green-600 px-4 py-2 rounded-full text-black">Express.js</span>
              <span className="bg-green-600 px-4 py-2 rounded-full text-black">MongoDB</span>
              <span className="bg-green-600 px-4 py-2 rounded-full text-black">React</span>
              <span className="bg-green-600 px-4 py-2 rounded-full text-black">HTML</span>
              <span className="bg-green-600 px-4 py-2 rounded-full text-black">CSS</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Education</h3>
              <button  onClick={handleEducation} className="text-green-500">Add Education</button>
            </div>
            <div className="mt-4 space-y-2">
              <div>
                <h4 className="font-semibold">B.Tech/B.E. Computers</h4>
                <p>Anna University</p>
                <p className="text-gray-400">2016–2020 (Full-time)</p>
              </div>
              <div>
                <h4 className="font-semibold">Higher Secondary</h4>
                <p>State Board of Tamilnadu</p>
                <p className="text-gray-400">2015–2016 (Full-time)</p>
              </div>
              <div>
                <h4 className="font-semibold">SSLC</h4>
                <p>State Board of Tamilnadu</p>
                <p className="text-gray-400">2013–2014 (Full-time)</p>
              </div>
            </div>
          </div>
        </div>


      </div >
    </>
  );
};

export default Profile;
