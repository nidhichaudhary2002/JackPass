import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isCreateEventPage = location.pathname === '/create-event';
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      {/* Hamburger Icon */}
      <button className='lg:hidden p-2 rounded-md' onClick={toggleMenu}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>

      {/* Menu (Horizontal Links) */}
      {isOpen && (
        <div className='absolute top-0 left-0 flex items-center gap-6 bg-white shadow-md rounded-md p-4 z-50 mt-10'>
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
          </Link>)}
        </div>
      )}

      {/* Displaying the hamburger icon and links on large screens */}
      <div className='hidden lg:flex items-center space-x-6 absolute top-4 left-4 z-50'>
        <button onClick={toggleMenu} className='p-2 rounded-md'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
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
  );
};

export default Hamburger;
