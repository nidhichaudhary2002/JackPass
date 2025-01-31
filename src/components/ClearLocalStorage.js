import React from 'react';

function ClearLocalStorageButton() {
  const clearStorage = () => {
    localStorage.clear();
    alert('Local storage has been cleared!');
  };

  return (
    <button
      onClick={clearStorage}
      className='w-full mt-4 bg-red-500 text-white p-2 rounded'
    >
      Clear Local Storage
    </button>
  );
}

export default ClearLocalStorageButton;
