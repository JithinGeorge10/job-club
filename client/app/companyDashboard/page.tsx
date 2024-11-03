'use client';
import React from 'react';
import CompanyNavbar from '../components/companyNavbar';
import CompanyLeftSideBar from '../components/companyLeftSideBar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function Page() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get('id');

    return (
        <>
            <CompanyNavbar />
            <div className="flex">
                <CompanyLeftSideBar />

                <main className="bg-gray-700 text-white w-4/5 p-10">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <Link href={`postJob?id=${companyId}`}>
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                                + Post Job
                            </button>
                        </Link>
                    </header>

                    <section className="mt-10">
                        <p className="text-gray-400">Here is your job listings statistic report</p>
                        <div className="grid grid-cols-3 gap-6 mt-6">
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-lg text-gray-300">Job Posts</h3>
                                <p className="font-bold text-3xl text-green-400">2,456</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-lg text-gray-300">Total Applications</h3>
                                <p className="font-bold text-3xl text-green-400">4,561</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-lg text-gray-300">No of Hirings</h3>
                                <p className="font-bold text-3xl text-green-400">2,456</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default Page;
