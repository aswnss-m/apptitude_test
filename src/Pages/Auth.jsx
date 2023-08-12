import React, { useState } from 'react';
import { emails } from '../constants';

function Auth() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

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
    <div className="flex flex-col items-center justify-center h-screen p-3">
      <h1 className='text-2xl font-bold text-center mb-4'>Login</h1>
      <form className='flex flex-col gap-2 lg:w-1/3 md:w-1/2 w-full'>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className='bg-gray-200 p-2 border rounded border-secondary'
          value={email}
          // make this the primary focus
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className='bg-tertiary text-primary p-2 rounded medium transition-all duration-500'
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="reset"
          className='border-secondary border rounded medium p-2 transition-all duration-500'
          onClick={() => setEmail('')}
        >
          Reset
        </button>
      </form>
      <p className='my-4 text-gray text-sm '>Please login with the credentials provided in the registered mail</p>
    </div>
  );
}

export default Auth;
