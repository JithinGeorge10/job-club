import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="font-bold text-xl mb-3">About _JobClub.</h3>
            <p className="text-gray-400">
              Your trusted platform to find the best jobs and career opportunities in India. Explore thousands of jobs with ease.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="font-bold text-xl mb-3">Quick Links</h3>
            <ul className="text-gray-400">
              <li><a href="#" className="hover:text-green-500">Home</a></li>
              <li><a href="#" className="hover:text-green-500">Find Jobs</a></li>
              <li><a href="#" className="hover:text-green-500">Post Jobs</a></li>
              <li><a href="#" className="hover:text-green-500">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/3">
            <h3 className="font-bold text-xl mb-3">Contact Us</h3>
            <p className="text-gray-400">
              Email: support@jobclub.com <br />
              Phone: +91 8199425506 <br />
              Address: Packapeer Academy Pvt. Ltd,Coimbatore, Tamil Nadu
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-10">
          <p className="text-gray-500">&copy; 2024 _JobClub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
