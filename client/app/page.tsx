import React from 'react'
import Navbar from './components/Navbar';
import Footer from './components/footer/footer'
import HomePage from './components/homePage/homePage'

export const metadata = {
    title: "_Job Club. | Job search India",
    description: "Find best jobs",
};
function page() {
    return (
        <>
            <div className="container mx-auto px-4">
                <div>
                    <Navbar />
                </div>
                <div >
                    <HomePage />
                </div>
                <div >
                    <Footer />
                </div>
            </div >
        </>
    )
}

export default page
