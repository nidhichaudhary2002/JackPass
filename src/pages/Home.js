import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-2xl font-semibold mb-6'>
        Welcome to Jackpass Events
      </h1>
      <div className='flex space-x-4'>
        <Link
          to='/create-event'
          className='px-6 py-2 bg-blue-500 text-white rounded-lg'
        >
          Add Event
        </Link>
        <Link
          to='/explore-events'
          className='px-6 py-2 bg-pink-500 text-white rounded-lg'
        >
          Explore Events
        </Link>
      </div>
    </div>
  );
}

export default Home;
