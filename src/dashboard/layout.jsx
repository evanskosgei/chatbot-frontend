/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex mt-4 justify-center overflow-auto">
        <div className="w-full max-w-7xl px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;