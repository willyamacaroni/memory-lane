import React from 'react';
import { Link } from 'react-router-dom';
import { CubeIcon } from '@heroicons/react/20/solid';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-2xl">
            <Link to="/" className="text-white">
              <CubeIcon className='h-16 w-16 inline-block' />
              Memory Lane
            </Link>
          </div>
          <div className="space-x-4">
            <Link to="/create" className="text-white">New memory</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
