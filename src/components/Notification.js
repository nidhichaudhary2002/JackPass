import React from 'react';

const Notification = ({ message, onClose }) => {
  
  return (
    <div className='fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg'>
      {message}
    </div>
  );
};

export default Notification;
