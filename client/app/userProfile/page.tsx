'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { USER_SERVICE_URL } from '@/utils/constants';
import { useSearchParams, useRouter } from 'next/navigation';
import { uploadImagesToFireStore } from '../../utils/fireStore'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
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
    university: string,
    toYear: string;
  }

  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${USER_SERVICE_URL}/get-userDetails?id=${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        if (response.data.failToken) {
          router.push('login');
        }
        if(response.data.success==false){
          router.push('login');
        }
        setUserDetails(response.data.userDetails);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.message);
          router.push('login')
        } else if (error instanceof Error) {
          console.error('General error:', error.message);
          router.push('pageNotFound')
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchData();
  }, []);


  const formatDate = (dateString: string): string => {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  const formatYear = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();

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
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast.info('Please select a valid PDF file')
    }
  };
  if (!userId) {
    toast.error('User ID is missing')
    return;
  }



  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.info('Please select a PDF file to upload')
      return;
    }

    const formData = new FormData();

    formData.append('resume', selectedFile);
    formData.append('userId', userId);
    try {

      let uploadImageUrl = await uploadImagesToFireStore(selectedFile)
      if (uploadImageUrl) {
        const response = await axios.post(`${USER_SERVICE_URL}/add-resume`, { uploadImageUrl, userId }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
      }
      toast.success('resume uploaded successfully')
    } catch (error) {
      console.error('Error uploading the file:', error);
      toast.error('Error uploading the resume')
    }
  };

  const deleteResume = async () => {
    let response = await axios.post(`${USER_SERVICE_URL}/delete-resume`, { userId }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    if (response.status) {
      toast.success('resume deleted')
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedImage(file);
    } else {
      toast.info('Please select a valid image file (JPEG or PNG)');
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      toast.info('Please select an image file to upload');
      return;
    }
    try {
      const uploadImageUrl = await uploadImagesToFireStore(selectedImage);

      if (uploadImageUrl) {
        const response = await axios.post(`${USER_SERVICE_URL}/add-profile-image`, { uploadImageUrl, userId }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        toast.success('Profile image uploaded successfully');
      }

    } catch (error) {
      console.error('Error uploading the image:', error);
      toast.error('Error uploading the profile image');
    }
  };

  const handlePayment = () => {
    const isProfileComplete = userDetails?.profile?.profileImage &&
      userDetails?.profile?.resume &&
      userDetails?.profile?.employment_details?.length > 0 &&
      userDetails?.profile?.education_details?.length > 0 &&
      userDetails?.profile?.skills?.length > 0;

    if (!isProfileComplete) {
      toast.info('Please complete your profile to upgrade to Premium');
      return;
    }

    router.push(`/subscribePage?firstName=${userDetails?.firstName}&lastName=${userDetails?.lastName}&userId=${userDetails?._id}&email=${userDetails?.email}&phone=${userDetails?.phone}`);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto mt-10 px-6">
          <h1 className="text-4xl font-bold">My profile</h1>
          <br />
          {userDetails?.profile?.subscriber ? (
            <span className="text-green-500 font-semibold text-lg">
              ✅ You are already a Premium Member!
            </span>
          ) : (
            <button
              onClick={handlePayment}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              💎 Upgrade to Premium Account
            </button>
          )}
          <h1 className="text-4xl font-bold"></h1>
          <div className="bg-gray-800 rounded-lg p-6 mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={selectedImage ? URL.createObjectURL(selectedImage) : userDetails?.profile?.profileImage || 'images/userProfile.jpg'}
                alt={`${userDetails?.firstName}'s Profile Picture`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold">{userDetails?.firstName}</h2>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                    className="mb-4"
                  />
                  <button onClick={handleImageUpload} className="bg-green-500 text-black px-4 py-2 rounded mt-4">
                    Upload Image
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-right">
              <p>📞 {userDetails?.phone}</p>
              <p>✉️ {userDetails?.email}</p>
            </div>
          </div>


          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Resume</h3>
              <div className="space-x-4">
                {userDetails?.profile?.resume ? (
                  <a href={userDetails.profile.resume} download>
                    <button className="text-gray-400">📄</button>
                  </a>
                ) : (
                  <button className="text-gray-400" disabled>
                    📄
                  </button>
                )}
                <button onClick={deleteResume} className="text-gray-400">🗑️</button>
              </div>
            </div>
            <div className="mt-4">
              <input
                type="file"
                accept="application/pdf"
                id="pdfInput"
                className="mb-4"
                onChange={handleFileChange}
              />
              <button onClick={handleFileUpload} className="bg-green-500 text-black px-4 py-2 rounded mt-4">
                Update Resume.
              </button>
              <p className="text-gray-400 mt-2">Supported formats: pdf, up to 2 MB</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Employment</h3>
              <button onClick={handleEmployment} className="text-green-500">Add Employment</button>
            </div>

            {userDetails?.profile?.employment_details && userDetails.profile.employment_details.length > 0 ? (
              userDetails.profile.employment_details.map((employment: EmploymentDetail, index: number) => (
                <div key={index} className="mt-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{employment.jobTitle}</h4>
                    <p>{employment.companyName}</p>
                    <p className="text-gray-400">{formatDate(employment.fromDate)} to {formatDate(employment.toDate)}</p>
                  </div>

                </div>
              ))
            ) : (
              <p>No employment details available</p>
            )}
          </div>




          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Education</h3>
              <button onClick={handleEducation} className="text-green-500">Add Education</button>
            </div>

            {userDetails?.profile?.education_details && userDetails.profile.education_details.length > 0 ? (
              userDetails.profile.education_details.map((education: EducationDetail, index: number) => (
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
              <button onClick={handleSkill} className="text-green-500">Add Skill</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {userDetails && userDetails.profile && userDetails.profile.skills && userDetails.profile.skills.length > 0 ? (
                userDetails.profile.skills.map((skill: string, index: number) => (
                  <span key={index} className="bg-green-600 px-4 py-2 rounded-full text-black">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No skills added</span>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Profile;
