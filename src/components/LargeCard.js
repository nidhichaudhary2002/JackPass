import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; 
import Notification from './Notification';

const LargeCard = ({ event, onClose }) => {
  const [notification, setNotification] = useState(''); 

  const handleBookClick = () => {
    const message = `Hoorah! It's gonna be fun at ${event.title}`;
      setNotification(message); 
    setTimeout(() => {
      onClose();
    }, 500); 
  };

  return (
    <div
      className='fixed inset-0 flex justify-center items-center z-50'
      onClick={onClose}
    >
      {/* Background blur effect */}
      <div
        className='absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm'
        onClick={(e) => e.stopPropagation()} 
      ></div>

      {/* Modal Content */}
      <div className='relative bg-white w-4/5 sm:w-3/5 lg:w-2/5 p-8 rounded-lg shadow-lg z-60'>
        {/* Enlarged Event Image */}
        {event.media && (
          <img
            src={event.media}
            alt='Event'
            className='w-full h-72 object-cover mb-4'
          />
        )}

        {/* Enlarged Event Details */}
        <div>
          <h3 className='font-semibold text-2xl mb-4'>{event.title}</h3>
          <p className='text-lg text-gray-600 mb-2'>By {event.community}</p>

          {/* Icon in front of Description */}
          <div className='flex items-center gap-2 mb-4 mt-2'>
            <FaCheckCircle className='text-green-500' />
            <p className='text-md text-gray-600'>{event.description}</p>
          </div>

          {/* Event Start/End Time */}
          <p className='text-sm text-gray-600 flex items-center gap-1 mt-2'>
            ⏰ Start: {new Date(event.startTime).toLocaleString()}
          </p>

          <p className='text-sm text-gray-600 flex items-center gap-1 mt-2'>
            ⏰ End: {new Date(event.endTime).toLocaleString()}
          </p>

          {/* Event Location */}
          <p className='text-sm text-gray-600 flex items-center gap-1 mt-2'>
            📍 {event.location || 'Delhi'}
          </p>

          {/* Book Button */}
          <button
            className='bg-pink-500 text-white px-6 py-3 rounded-full mt-2'
            onClick={handleBookClick}
          >
            Book
          </button>
        </div>
      </div>

      {/* Show Notification when set */}
      {notification && (
        <Notification
          message={notification}
          onClose={setNotification('')} // Clear notification after it's displayed
        />
      )}
    </div>
  );
};

export default LargeCard;
