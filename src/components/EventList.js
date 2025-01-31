import { useEffect, useState } from 'react';
import LargeCard from './LargeCard'; // Import LargeCard component
import Navbar from './Navbar';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Fetch events from local storage when component mounts
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className='p-4'>
      <Navbar /> 
      <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-start px-4 pt-10 sm:pt-12'>
        <div className='w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Delhi NCR</h2>
          <p className='text-gray-500 mb-4'>Welcome to the tribe!</p>

          {/* Responsive Event Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {events.map((event, index) => (
              <div
                key={index}
                className='bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer'
                onClick={() => handleCardClick(event)}
              >
                {/* Event Image */}
                {event.media && (
                  <img
                    src={event.media}
                    alt='Event'
                    className='w-full h-48 object-cover'
                  />
                )}

                {/* Event Details */}
                <div className='p-4'>
                  <div className='flex items-center gap-2'>
                    <img
                      src='eventLogo.png'
                      alt={event.community}
                      className='w-6 h-6 rounded-full'
                    />
                    <p className='text-xs text-gray-500'>
                      By {event.community}
                    </p>
                  </div>

                  <h3 className='font-semibold text-lg mt-2'>{event.title}</h3>

                  {/* Event Time & Location */}
                  <p className='text-sm text-gray-600 flex items-center gap-1 mt-2'>
                    ⏰ {event.startTime}
                  </p>
                  <p className='text-sm text-gray-600 flex items-center gap-1'>
                    📍 {event.location || 'Delhi'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Show the modal when a card is clicked */}
      {selectedEvent && (
        <LargeCard event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default EventList;
