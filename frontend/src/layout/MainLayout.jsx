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
      <footer className="bg-white border-t py-8 text-center text-gray-400 text-sm">
        © 2025 JournAi - News you can trust, intelligence you can feel.
      </footer>
    </div>
  );
};

export default MainLayout;