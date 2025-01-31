import React, { useState } from 'react';
import Navbar from './Navbar';
const Eventform = () => {
  const [eventData, setEventData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    media: null,
  });
  const [community, setCommunity] = useState('Indiranagar Run Club');
  const [previewMedia, setPreviewMedia] = useState(null);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Desired aspect ratio (4:5)
          const aspectRatio = 4 / 5;

          // Calculate the new dimensions based on the image's natural width and height
          let newWidth = img.width;
          let newHeight = img.height;

          // Adjust dimensions to maintain the 4:5 aspect ratio
          if (img.width / img.height > aspectRatio) {
            newWidth = img.height * aspectRatio;
          } else {
            newHeight = img.width / aspectRatio;
          }

          // Set canvas size to the new dimensions
          canvas.width = newWidth;
          canvas.height = newHeight;

          // Draw the resized image onto the canvas
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Convert canvas to data URL
          const resizedImage = canvas.toDataURL('image/jpeg');

          // Set the resized image as the preview
          setPreviewMedia(resizedImage);
          setEventData((prevState) => ({
            ...prevState,
            media: resizedImage,
          }));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !eventData.title ||
      !eventData.startTime ||
      !eventData.endTime ||
      !eventData.description
    ) {
      alert('Please fill all required fields!');
      return;
    }

    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({ ...eventData, community });
    localStorage.setItem('events', JSON.stringify(events));

    setEventData({
      title: '',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
      media: null,
    });
    setCommunity('Indiranagar Run Club');
    setPreviewMedia(null);
  };

  return (
    <div className='p-4'>
      <Navbar />
      <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-start px-4 pt-10 sm:pt-12'>
        <div className='w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg mt-4'>
          <h2 className='text-center text-2xl font-semibold mb-6'>
            Create New Event
          </h2>

          <div className='relative bg-gradient-to-b from-gray-200 to-white rounded-lg p-6 flex flex-col items-center'>
            <img
              id='previewImage'
              src={previewMedia || '/image_13406954.png'}
              className='w-80 h-80 object-cover rounded-lg mb-4'
              alt='Event'
            />
            <label
              htmlFor='photoUpload'
              className='mt-2 px-4 py-2 bg-gray-200 text-gray-600 rounded cursor-pointer text-sm'
            >
              📸 Add Photo
            </label>
            <input
              type='file'
              id='photoUpload'
              className='hidden'
              accept='image/*, video/*'
              onChange={handleMediaChange}
            />
          </div>

          <label className='block mt-4 text-sm text-gray-700'>
            Select Community <span className='text-red-500'>*</span>
          </label>
          <select
            className='w-full mt-1 p-3 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          >
            <option value='Indiranagar Run Club'>Indiranagar Run Club</option>
            <option value='TedX'>TedX</option>
            <option value='Rotaract Club'>Rotaract Club</option>
          </select>

          <label className='block mt-4 text-sm text-gray-700'>
            Event Title <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='title'
            value={eventData.title}
            onChange={handleChange}
            className='w-full mt-1 p-3 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter event title'
            required
          />

          <div className='w-full mt-4 flex items-center space-x-4'>
            <label className='text-sm text-gray-700'>Start </label>
            <input
              type='datetime-local'
              name='startTime'
              value={eventData.startTime}
              onChange={handleChange}
              className='p-3 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='w-full mt-4 flex items-center space-x-4'>
            <label className='text-sm text-gray-700'>End </label>
            <input
              type='datetime-local'
              name='endTime'
              value={eventData.endTime}
              onChange={handleChange}
              className='p-3 border border-gray-400 border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='w-full items-center justify-between p-3'>
            <span className='text-gray-600 font-medium'>
              📍 Location<span className='text-red-500'>*</span>
            </span>
            <textarea
              name='location'
              value={eventData.location}
              onChange={handleChange}
              className='w-full flex items-center justify-between p-3 border rounded-md focus:outline-none focus:ring-2 text-gray-400 text-sm'
              placeholder='Enter a location'
              required
            />
          </div>

          <div
            className='w-full mt-1 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={() => setIsEditingDescription(true)}
          >
            <div className='w-full items-center justify-between p-3'>
              <span className='text-gray-600 font-medium'>
                ✏️ Add Description <span className='text-red-500'>*</span>
              </span>
              {isEditingDescription ? (
                <textarea
                  name='description'
                  value={eventData.description}
                  onChange={handleChange}
                  className='w-full flex items-center justify-between p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Add a brief description'
                  required
                />
              ) : (
                <span className='w-full flex items-center justify-between p-3 border rounded-md focus:outline-none focus:ring-2 text-gray-400 text-sm'>
                  Add a brief description to let attendees know what your event
                  is all about
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full p-3 rounded text-white font-semibold transition ${
              eventData.title &&
              eventData.startTime &&
              eventData.endTime &&
              eventData.description
                ? 'bg-blue-600'
                : 'bg-blue-300'
            }`}
            disabled={
              !eventData.title ||
              !eventData.startTime ||
              !eventData.endTime ||
              !eventData.description
            }
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Eventform;
