import React, { useState } from 'react';
import TandCmodal from '../components/TandCmodal';
function Landingpage() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex h-screen items-center w-screen justify-center">
      <div className='flex justify-center items-center flex-col gap-2 w-1/2'>
        <h1 className='text-2xl font-bold'>Start Test</h1>
        <div className="info flex gap-2">
          <h3 className='bg-gray-200 p-2 rounded'>{30} Questions</h3>
          <h3 className='bg-gray-200 p-2 rounded'>{'10:00'} mins </h3>
        </div>
        <button
          className='bg-green-400 hover:bg-green-200 p-3 rounded w-1/2'
          onClick={openModal}
        >
          Start
        </button>
      </div>
      {showModal && (
        <TandCmodal onClose={closeModal} />
      )}
    </div>
  );
}

export default Landingpage;
