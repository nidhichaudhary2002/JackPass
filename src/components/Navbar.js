import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import Hamburger from './Hamburger';

const Navbar = () => {
  const location = useLocation(); // Get the current location (URL)

  // Determine the current page and adjust the navbar accordingly
  const isCreateEventPage = location.pathname === '/create-event';

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        {/* Hamburger Icon for small screens */}
        <div className='lg:hidden'>
          <Hamburger />
        </div>

        {/* Navbar Links for larger screens */}
        <div className='hidden lg:flex space-x-6'>
          <Link to='/' className='text-xl font-semibold text-gray-800'>
            Home
          </Link>
          {isCreateEventPage ? (
            <Link
              to='/explore-events'
              className='text-xl font-semibold text-gray-800'
            >
              Explore Events
            </Link>
          ) : (
            <Link
              to='/create-event'
              className='text-xl font-semibold text-gray-800'
            >
              Create Event
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
