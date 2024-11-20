'use client'
import React, { useEffect, useState } from 'react'
import CompanyNavbar from '../components/companyNavbar';
import CompanyLeftSideBar from '../components/companyLeftSideBar';
import axios from 'axios';
import { COMPANY_SERVICE_URL, USER_SERVICE_URL } from '@/utils/constants';
import { toast } from 'react-toastify';
import { uploadImagesToFireStore } from '../../utils/fireStore'
function Page() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [companyDetails, setCompanyDetails] = useState<any | null>(null);

    useEffect(() => {
        const company = localStorage.getItem('company');
        if (company && company !== 'undefined') {
            const companyDetails = JSON.parse(company);
            setCompanyId(companyDetails._id);
        }
    }, []);

    useEffect(() => {
        if (companyId) {
            (async () => {
                try {
                    const response = await axios.get(`${COMPANY_SERVICE_URL}/companyDetails`, {
                        params: { id: companyId },
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    });
                    console.log(response.data);
                    setCompanyDetails(response.data.companyDetails[0]);
                } catch (error) {
                    console.error('Error fetching company details:', error);
                }
            })();
        }
    }, [companyId]);
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
            const response = await axios.post(`${COMPANY_SERVICE_URL}/companyLogo`, { uploadImageUrl, companyId }, {
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
      console.log(companyDetails)
    return (
        <>
            <CompanyNavbar />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
                <CompanyLeftSideBar />
                <main className="mt-10">

                    <section className="bg-gray-900 p-6 rounded-xl">
                        <div className="flex items-center gap-6">







                                <div className="flex items-center space-x-4">
                                    <img
                                        src={selectedImage ? URL.createObjectURL(selectedImage) : companyDetails?.profileImage || 'images/userProfile.jpg'}
                                        alt={`${companyDetails?.firstName}'s Profile Picture`}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-semibold">{companyDetails?.firstName}</h2>
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


















                 
                            <div>
                                <h2 className="text-3xl font-bold">{companyDetails?.companyName || 'Company Name'}</h2>
                                <a href={`https://${companyDetails?.website}`} className="text-green-400 hover:underline">
                                    {companyDetails?.website || 'www.example.com'}
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <div className="bg-gray-800 p-4 rounded-lg text-center">
                                <p className="font-bold">Location</p>
                                <p>{companyDetails?.location || 'Location not available'}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg text-center">
                                <p className="font-bold">Industry</p>
                                <p>{companyDetails?.industry || 'Industry not available'}</p>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                        <div className="bg-gray-900 p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Company Profile</h3>
                            <p>{companyDetails?.description || 'No description available'}</p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2">Contacts</h3>
                            <ul className="space-y-2">
                                <li>
                                    Email:{" "}
                                    <a href={`mailto:${companyDetails?.email}`} className="text-green-400 hover:underline">
                                        {companyDetails?.email || 'No email available'}
                                    </a>
                                </li>
                                <li>
                                    Website:{" "}
                                    <a href={`https://${companyDetails?.website}`} className="text-green-400 hover:underline">
                                        {companyDetails?.website || 'No website available'}
                                    </a>
                                </li>
                                <li>Location: {companyDetails?.location || 'No location available'}</li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default Page;
