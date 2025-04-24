import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ConnectSphere
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">
            Categories
          </Link>
          <Link to="/profile" className="hover:text-blue-200">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
