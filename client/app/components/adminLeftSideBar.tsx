import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function AdminLeftSideBar() {
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('adminToken');
    router.push(`/`);
  };

  const handleCompany = () => {
    router.push(`companyManagement`);
  };
  const handleUsers = () => {
    router.push(`userManagement`);
  };
  
  return (
    <aside className="bg-black text-white fixed h-full w-1/5 p-6 sm:w-1/4 md:w-1/5 lg:w-1/6">
      <nav className="space-y-6">
        <button 
          onClick={handleCompany} 
          className="w-full text-left py-3 hover:bg-gray-700 rounded-md text-lg">
          Companies
        </button>
        <button 
          onClick={handleUsers} 
          className="w-full text-left py-3 hover:bg-gray-700 rounded-md text-lg">
          Users
        </button>
      </nav>
      <button 
        onClick={handleLogout}
        className="w-full mt-6 bg-red-900 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
      >
        Logout
      </button>
    </aside>
  );
}

export default AdminLeftSideBar;
