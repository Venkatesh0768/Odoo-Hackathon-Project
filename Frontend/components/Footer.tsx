
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Skill Swap Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
