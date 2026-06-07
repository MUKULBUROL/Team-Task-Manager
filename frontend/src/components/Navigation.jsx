import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

const Navigation = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const getLinkClass = (path) => {
    return `px-3 py-2 rounded-md text-sm font-medium ${
      activePath === path
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-white font-bold">Team Task Manager</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                  Dashboard
                </Link>
                <Link to="/projects" className={getLinkClass('/projects')}>
                  Projects
                </Link>
                <Link to="/tasks" className={getLinkClass('/tasks')}>
                  Tasks
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {user && <span className="mr-4">Welcome, {user.name}</span>}
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;