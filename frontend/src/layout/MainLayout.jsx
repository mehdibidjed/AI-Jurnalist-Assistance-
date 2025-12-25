import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navbar />
      <main className="flex-grow">

        <Outlet/>
      </main>
      
    </div>
  );
};

export default MainLayout;