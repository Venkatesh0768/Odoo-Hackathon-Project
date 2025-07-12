
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowPathIcon } from './icons';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
             <ArrowPathIcon className="h-8 w-8 text-sky-500"/>
            <span className="text-2xl font-bold text-slate-800">SkillSwap</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/" className="text-slate-600 hover:text-sky-500 transition-colors">Browse</Link>
            {isAuthenticated ? (
              <>
                <Link to="/swaps" className="text-slate-600 hover:text-sky-500 transition-colors">My Swaps</Link>
                <Link to="/profile" className="text-slate-600 hover:text-sky-500 transition-colors">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="bg-slate-200 text-slate-700 hover:bg-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-sky-500 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-sky-500 text-white hover:bg-sky-600 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
