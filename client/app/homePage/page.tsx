'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function HomePage() {
    const router=useRouter()
    const handleSignup=()=>{
        router.push(`signup`)
    }

    return (
        <div className="bg-black text-white min-h-screen">


            <section
                className="bg-black text-center text-white py-20 px-4 min-h-[100vh] flex items-center justify-center"
                style={{
                    backgroundImage: "url('/images/homepage3.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div>
                    <h2 className="text-3xl font-bold mb-4">
                        {`"Cook Up Your Career, Break into the Best Jobs!"`}
                    </h2>
                    <p className="text-lg mb-8">
                        {`500,000+ jobs waiting for you to explore`}
                    </p>
                    <div className="flex justify-center">
                        <Link href="/jobListingPage">
                            <button className="bg-green-500 text-black font-bold py-4 px-8 rounded-full hover:bg-green-600 shadow-lg transition-all duration-300 transform hover:scale-105">
                                {`Find Jobs`}
                            </button>
                        </Link>
                    </div>
                </div>
            </section>



            <section className="bg-green-900 text-white p-10 text-center rounded-lg my-10 mx-4">
                <h2 className="text-2xl font-bold">{`Start Posting Jobs Today`}</h2>
                <p className="text-lg">{`Start posting jobs for free`}</p>
                <button onClick={handleSignup} className="bg-white text-green-500 font-bold py-2 px-4 mt-4 rounded-full">
                    {`Sign up for free`}
                </button>
            </section>



        </div>
    );
}

export default HomePage;
