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
    router.replace(`companyManagement`);
  };
  const handleUsers = () => {
    router.replace(`userManagement`);
  };
  
  return (
    <aside className="bg-black text-white h-full w-[235px] fixed"> 
      <div className="p-6">
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
      </div>
    </aside>
  );
}

export default AdminLeftSideBar;
