import React, { useEffect, useState } from 'react';
import TimerApp from '../components/TimerApp';
import { useNavigate } from 'react-router-dom';

function Fail() {
  const [TimerExpired, setTimerExpired] = useState(false)
  const changeTimer=()=>{setTimerExpired(true)}
  const nav = useNavigate()
  useEffect(()=>{
    if(TimerExpired){
      nav('/auth')
    }
  },[TimerExpired])
  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center'>
      <h1 className='text-5xl text-tertiary font-bold'>Exam Failed</h1>
      <p>We will not contact you.</p>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        You will be redirected in...<span style={{ marginLeft: '1px' }}><TimerApp timerDuration={5} helper={changeTimer}/></span>
      </p>
    </div>
  );
}

export default Fail;
