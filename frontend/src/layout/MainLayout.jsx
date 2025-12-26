import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Professional Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      {/* We use ml-0 for mobile and ml-72 (or 24) for desktop */}
      <main className="flex-grow transition-all duration-300 lg:ml-72 has-[aside.lg\:w-24]:lg:ml-24">
        {/* Top Padding to account for the mobile toggle on small screens */}
        <div className="p-4 lg:p-10 pt-20 lg:pt-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;