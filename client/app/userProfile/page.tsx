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
  interface EmploymentDetail {
    jobTitle: string;
    companyName: string;
    fromDate: string;
    toDate: string;
  }
  interface EducationDetail {
    education: string;
    course: string;
    fromYear: string;
    university:string,
    toYear: string;
  }
  
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [userDetails, setUserDetails] = useState<any | null>(null);
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
  const formatDate = (dateString: string): string => {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const date = new Date(dateString);
  
    const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad to two digits
    const month = months[date.getMonth()]; // Get the month abbreviation
    const year = date.getFullYear(); // Get the full year
  
    return `${day}-${month}-${year}`;
  };
  const formatYear = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear(); // Get the full year
  
    return `${year}`;
  };
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

  {userDetails?.profile?.employment_details && userDetails.profile.employment_details.length > 0 ? (
    userDetails.profile.employment_details.map((employment:EmploymentDetail, index:number) => (
      <div key={index} className="mt-4">
        <h4 className="font-semibold">{employment.jobTitle}</h4>
        <p>{employment.companyName}</p>
        <p className="text-gray-400">{formatDate(employment.fromDate)} to {formatDate(employment.toDate)}</p>
      </div>
    ))
  ) : (
    <p>No employment details available</p>
  )}
</div>



<div className="bg-gray-800 rounded-lg p-6 mt-6">
  <div className="flex justify-between items-center">
    <h3 className="text-xl font-semibold">Employment</h3>
    <button onClick={handleEducation} className="text-green-500">Add Education</button>
  </div>

  {userDetails?.profile?.education_details && userDetails.profile.education_details.length > 0 ? (
    userDetails.profile.education_details.map((education:EducationDetail, index:number) => (
      <div key={index} className="mt-4">
        <h4 className="font-semibold">{education.education}</h4>
        <p>{education.course}</p>
        <p>{education.university}</p>
        <p className="text-gray-400">{formatYear(education.fromYear)} to {formatYear(education.toYear)}</p>
      </div>
    ))
  ) : (
    <p>No education details available</p>
  )}
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

          
        </div>


      </div >
    </>
  );
};

export default Profile;
