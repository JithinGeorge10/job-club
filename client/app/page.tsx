import React from 'react'
import Navbar from './components/Navbar';
import Footer from './components/footer/footer'
import HomePage from './homePage/page'


function page() {
    return (
        <>
       
                <div>
                    <Navbar />
                </div>
                <div >
                    <HomePage />
                </div>
                <div >
                    <Footer />
                </div>

        </>
    )
}

export default page
