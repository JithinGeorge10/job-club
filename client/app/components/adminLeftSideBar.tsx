import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { AUTH_SERVICE_URL } from '@/utils/constants';
import axios from 'axios';

function AdminLeftSideBar() {
  const router = useRouter();

  const handleLogout = async() => {
    localStorage.clear();
    Cookies.remove('adminAccessToken');
    await axios.post(`${AUTH_SERVICE_URL}/adminLogOut`,{}, { withCredentials: true });
    router.push(`/`);
  };

  const handleCompany = () => {
    router.replace(`companyManagement`);
  };
  const handleUsers = () => {
    router.replace(`userManagement`);
  };
  const handleDashboard = () => {
    router.replace(`adminDashboard`);
  };
  const subscription = () => {
    router.replace(`subscriptionUser`);
  };
 

  return (
    <aside className="bg-black text-white h-full w-[235px] fixed">
      <div className="p-6">
        <nav className="space-y-6">
          <button
            onClick={handleDashboard}
            className="w-full text-left py-3 hover:bg-gray-700 rounded-md text-lg">
            Dashboard
          </button>
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
          <button
            onClick={subscription}
            className="w-full text-left py-3 hover:bg-gray-700 rounded-md text-lg">
            subscription list
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
