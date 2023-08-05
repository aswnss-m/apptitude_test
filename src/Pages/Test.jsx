import React from 'react'
import TimerApp from '../components/TimerApp'
import { questions } from '../constants'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

function Test() {
  const [selectedOption, setSelectedOption] = useState('');
  const { id } = useParams();
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className='flex px-4 py-2 min-h-screen'>
<div className="grid grid-cols-4 grid-rows-5 gap-4 p-4">
    <div className="col-span-3 flex flex-col gap-2">
        <p>Question No : {1}</p>
        <p className='text-xl medium'>
            {questions[id].question}
          </p>
    </div>
    <div className="col-start-4">
        <TimerApp timerDuration={20} />
    </div>
    <div className="row-span-4 col-start-4 row-start-2">
    <p>Question Palette</p>
            <div>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>
                <button className='bg-green-500 rounded-full w-8 h-8 m-1'>1</button>

            </div>
    </div>
    <div className="col-span-3 row-span-3 col-start-1 row-start-2">
    <div className="flex flex-col gap-2 h-full">
            <label
              className={`bg-gray-300 py-2 rounded transition-all duration-500 flex-grow ${
                selectedOption === questions[id].options[0] ? 'bg-green-500' : 'hover:bg-gray-200'
              }`}
              htmlFor="option1"
            >
              <input
                type="radio"
                name="options"
                id="option1"
                className='m-1'
                value={questions[id].options[0]}
                onChange={handleOptionChange}
              />
              {questions[id].options[0]}
            </label>
            <label
              className={`bg-gray-300 py-2 rounded transition-all duration-500 flex-grow ${
                selectedOption === questions[id].options[1] ? 'bg-green-500' : 'hover:bg-gray-200'
              }`}
              htmlFor="option2"
            >
              <input
                type="radio"
                name="options"
                id="option2"
                className='m-1'
                value={questions[id].options[1]}
                onChange={handleOptionChange}
              />
              {questions[id].options[1]}
            </label>
            <label
              className={`bg-gray-300 py-2 rounded transition-all duration-500 flex-grow ${
                selectedOption === questions[id].options[2] ? 'bg-green-500' : 'hover:bg-gray-200'
              }`}
              htmlFor="option3"
            >
              <input
                type="radio"
                name="options"
                id="option3"
                className='m-1'
                value={questions[id].options[2]}
                onChange={handleOptionChange}
              />
              {questions[id].options[2]}
            </label>
            <label
              className={`bg-gray-300 py-2 rounded transition-all duration-500 flex-grow ${
                selectedOption === questions[id].options[3] ? 'bg-green-500' : 'hover:bg-gray-200'
              }`}
              htmlFor="option4"
            >
              <input
                type="radio"
                name="options"
                id="option4"
                className='m-1'
                value={questions[id].options[3]}
                onChange={handleOptionChange}
              />
              {questions[id].options[3]}
            </label>
          </div>
    </div>
    <div className="col-span-2 row-start-5">
      <button className='bg-red-400 hover:bg-red-300 w-full p-3 rounded'>
        Reset</button>
    </div>
    <div className="col-start-3 row-start-5">
      <button className='bg-green-400 hover:bg-green-300 w-full p-3 rounded'>
        Submit
      </button>
    </div>
</div>
    </div>
  )
}

export default Test