import React, { useState, useEffect, useRef } from 'react';
import { useRecordWebcam } from 'react-record-webcam'
  
function TestRecording() {
    const recordWebcam = useRecordWebcam({ frameRate: 60 });
    const saveFile = async () => {
      const blob = await recordWebcam.getRecording();
    };
    
  return(
    <div>
      <p>Camera status: {recordWebcam.status}</p> <br />
      <button onClick={recordWebcam.open}>Open camera</button> <br />
      <button onClick={recordWebcam.start}>Start recording</button> <br />
      <button onClick={recordWebcam.stop}>Stop recording</button> <br />
      <button onClick={recordWebcam.retake}>Retake recording</button> <br />
      <button onClick={recordWebcam.download}>Download recording</button> <br />
      <button onClick={saveFile}>Save file to server</button> <br />
      <video ref={recordWebcam.webcamRef} autoPlay muted /> <br />
      <video ref={recordWebcam.previewRef} autoPlay muted loop />
    </div>
  );
}

export default TestRecording;
