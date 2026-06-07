import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { AuthContext } from '../contexts/AuthContext';

const MainLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;