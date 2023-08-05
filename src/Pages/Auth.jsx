import React, { useState } from 'react';
import { emails } from '../constants';

function Auth() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    if (emails.some((item) => item.email === email)) {
      sessionStorage.setItem('email', email);
      window.location.reload();
    } else {
      alert('Email not found');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-3">
      <div className='flex flex-col gap-2 lg:w-1/3 md:w-1/2 w-full'>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className='bg-gray-200 p-2 border rounded border-black'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          className='bg-green-400 p-2 rounded medium hover:bg-green-200 transition-all duration-500'
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          className='bg-red-400 rounded medium hover:bg-red-300 transition-all duration-500'
          onClick={() => setEmail('')}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Auth;
