import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const Layout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
