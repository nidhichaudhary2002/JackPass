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
    mediaType: null, // Track whether it's an image or video
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
      const mediaType = file.type.split('/')[0]; // 'image' or 'video'

      if (mediaType === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const aspectRatio = 4 / 5;
            let newWidth = img.width;
            let newHeight = img.height;
            if (img.width / img.height > aspectRatio) {
              newWidth = img.height * aspectRatio;
            } else {
              newHeight = img.width / aspectRatio;
            }
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            const resizedImage = canvas.toDataURL('image/jpeg');
            setPreviewMedia(resizedImage);
            setEventData((prevState) => ({
              ...prevState,
              media: resizedImage,
              mediaType: 'image',
            }));
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      } else if (mediaType === 'video') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewMedia(reader.result);
          setEventData((prevState) => ({
            ...prevState,
            media: reader.result,
            mediaType: 'video',
          }));
        };
        reader.readAsDataURL(file);
      }
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
      mediaType: null,
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

          <div className='relative bg-gradient-to-b from-gray-200 to-white rounded-lg p-6 flex flex-col items-center w-full h-80 sm:h-64 xs:h-48'>
            {eventData.mediaType === 'video' ? (
              <video
                id='previewVideo'
                src={previewMedia}
                className='absolute top-0 left-0 w-full h-full object-cover rounded-lg'
                alt='Event'
                controls
              />
            ) : (
              <img
                id='previewImage'
                src={previewMedia || '/image_13406954.png'}
                className='absolute top-0 left-0 w-full h-full object-cover rounded-lg'
                alt='Event'
              />
            )}

            <label
              htmlFor='photoUpload'
              className='absolute bottom-4 px-4 py-2 bg-gray-200 text-gray-600 rounded cursor-pointer text-sm z-10'
            >
              {eventData.media
                ? eventData.mediaType === 'video'
                  ? '🎬 Replace Video'
                  : '📸 Replace Photo'
                : '📸 Add Media'}
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
          <div className='w-full mt-4 flex flex-col md:flex-row md:space-x-4'>
            <div className='w-full md:w-1/2 flex items-center space-x-4'>
              <label className='text-sm text-gray-700'>Start </label>
              <input
                type='datetime-local'
                name='startTime'
                value={eventData.startTime}
                onChange={handleChange}
                className='p-3 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                required
              />
            </div>

            <div className='w-full md:w-1/2 flex items-center space-x-4 mt-4 md:mt-0'>
              <label className='text-sm text-gray-700'>End </label>
              <input
                type='datetime-local'
                name='endTime'
                value={eventData.endTime}
                onChange={handleChange}
                className='p-3 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                required
              />
            </div>
          </div>

          <div className='w-full items-center justify-between p-3'>
            <span className='text-gray-600 font-medium'>
              📍 Location<span className='text-red-500'>*</span>
            </span>
            <textarea
              name='location'
              value={eventData.location}
              onChange={handleChange}
              className='w-full flex items-center justify-between p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
