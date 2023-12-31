import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import TimerApp from '../components/TimerApp';
import { questions } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useRecordWebcam } from 'react-record-webcam';


function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [attendedQuestions, setAttendedQuestions] = useState(new Set());
  const [qids, setQIds] = useState(new Set());
  const { id } = useParams();
  const [TimerExpired, setTimerExpired] = useState(false)
  const changeTimer=()=>{setTimerExpired(true)}
  const nav = useNavigate();
   

    const recordWebcam = useRecordWebcam({ frameRate: 60 });
    const startRecording=()=>{
      if(recordWebcam.status==='CLOSED'){
        recordWebcam.open();
      }
    }

    const stopRecording=()=>{
      if(recordWebcam.status==='RECORDING'){
        recordWebcam.stop();
        recordWebcam.download();
      }
      if(recordWebcam.status==='OPEN'){
        recordWebcam.close();
      }
    }
    useEffect(() => {
      startRecording();
      console.log(recordWebcam.status);
    }, []);

  // Retrieve attended questions from session storage and add event listeners
  useEffect(() => {
    const attendedQuestionsList = JSON.parse(sessionStorage.getItem('attendedQuestions')) || [];
    const attendedSet = new Set(attendedQuestionsList.map(answer => answer.questionId));
    setAttendedQuestions(attendedSet);
    setQIds(new Set(attendedSet));

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // nav('/test/fail');
      }
    };

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        // nav('/test/fail');
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      
    };
  }, [id, nav]);

// Time expired handler
  useEffect(()=>{
    if(TimerExpired){
      nav('/auth')
    }
  },[TimerExpired])

  // Handle option selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Handle question change
  const handleQuestionChange = (index) => {
    setCurrentQuestion(index);
    setSelectedOption('');
  };
  
  // Handle answer submission
  const handleAnswerSubmit = () => {
    if (selectedOption !== '') {
      const questionId = parseInt(id);
      const answer = {
        questionId: questionId,
        selectedOption: selectedOption
      };
      
      const newQIds = new Set(qids);
      newQIds.add(questionId);
      setQIds(newQIds);

      const attendedQuestionsList = JSON.parse(sessionStorage.getItem('attendedQuestions')) || [];
      attendedQuestionsList.push(answer);
      sessionStorage.setItem('attendedQuestions', JSON.stringify(attendedQuestionsList));

      setAttendedQuestions(new Set(attendedQuestionsList.map(answer => answer.questionId)));
      setSelectedOption('');

      const nextQuestion = currentQuestion + 1;
      const totalQuestions = questions.length;
      if (nextQuestion < totalQuestions) {
        setCurrentQuestion(nextQuestion);
        nav(`/test/${nextQuestion}`);
      } else {
        const allQuestionsAnswered = attendedQuestions.size === totalQuestions - 1;
        if (allQuestionsAnswered) {
          stopRecording();
          nav('/test/success');
        }
      }
    }
  };

 
 
  return (
    <div className='flex px-4 py-2 min-h-screen'>
      <div className="grid grid-cols-4 grid-rows-5 gap-4 p-4">
        <div className="col-span-3 flex flex-col gap-2">
          <p>Question No: {parseInt(id) + 1}</p>
          <p className='text-xl medium'>
            {questions[id].question}
          </p>
        </div>
        <div className="col-start-4">
          <TimerApp timerDuration={600} helper={changeTimer}/>
        </div>
        <div className="row-span-4 col-start-4 row-start-2">
          <p>Question Palette</p>
          <div>
            {questions.map((q, index) => (
              <button
                key={index}
                className={`rounded-full text-primary w-8 h-8 m-1 ${
                  qids.has(index) ? 'bg-tertiary' : 'bg-secondary'
                }`}
                onClick={() => handleQuestionChange(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-3 row-span-3 col-start-1 row-start-2">
          <div className="flex flex-col gap-2 h-full">
            {questions[id].options.map((option, index) => (
              <label
                key={index}
                className={`bg-gray-300 py-2 rounded transition-all duration-500 flex-grow ${
                  selectedOption === option
                    ? 'bg-tertiary text-primary'
                    : 'hover:bg[#fdfdfd]'
                }`}
                htmlFor={`option${index}`}
              >
                <input
                  type="radio"
                  name="options"
                  id={`option${index}`}
                  className='m-1'
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="col-span-2 row-start-5">
          <button className='border border-tertiary w-full p-3 rounded' onClick={()=>{
            // remove the selected option
            setSelectedOption('');
          }}>
            Clear
          </button>
        </div>
        <div className="col-start-3 row-start-5">
          <button
            className='bg-tertiary font-bold text-primary hover:bg-green-300 w-full p-3 rounded'
            onClick={handleAnswerSubmit}
          >
            Submit
          </button>
        </div>
        <div className="col-start-4 row-span-2 col-span-2 row-start-3 w-full h-full bg-red-900">
        <video ref={recordWebcam.webcamRef} autoPlay muted /> <br />
        </div>
      </div>
    </div>
  );
}

export default Test;
