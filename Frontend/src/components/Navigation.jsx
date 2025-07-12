import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
    { path: '/users', label: 'User Management' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="bg-[#18181b] border-b border-[#333]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">Odoo Project</Link>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-[#222]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 