// import React, { useState } from "react";
import React, { useState, useRef, useEffect } from "react";
import TandCmodal from "../components/TandCmodal";
import { useNavigate } from "react-router-dom";

function Landingpage() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [cameraPermission, setCameraPermission] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fullscreenPermission, setFullscreenPermission] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

  const handleCameraPermissionChange = () => {
    if (!cameraPermission) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          console.log("Camera and microphone permissions granted");
          setCameraPermission(true);
          setCameraStream(stream);
        })
        .catch((error) => {
          console.log("Camera and microphone permissions denied:", error);
          setCameraPermission(false);
        });
    } else {
      setCameraPermission(false);
      setCameraStream(null);
    }
  };

  const handleFullScreen = () => {
    const element = document.documentElement; // Get the root element (usually <html>)

    if (element.requestFullscreen) {
      element.requestFullscreen();
      setFullscreenPermission(true);
    } else if (element.mozRequestFullScreen) {
      // For Firefox
      element.mozRequestFullScreen();
      setFullscreenPermission(true);
    } else if (element.webkitRequestFullscreen) {
      // For Chrome, Safari and Opera
      element.webkitRequestFullscreen();
      setFullscreenPermission(true);
    } else if (element.msRequestFullscreen) {
      // For Internet Explorer and Edge
      element.msRequestFullscreen();
      setFullscreenPermission(true);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const nav = useNavigate();
  const handleAgree = () => {
    if (cameraPermission && fullscreenPermission) {
      console.log("Terms accepted and camera permission granted");

      // Remove the stored attendedQuestions data from sessionStorage
      sessionStorage.removeItem("attendedQuestions");

      nav("/test/0");
    }
  };

  useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    } else if (!cameraStream && videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [cameraStream]);

  return (
    <div className="flex flex-col w-screen items-center">
      <div className="flex flex-col gap-5 text-center items-center min-h-screen justify-center w-90">
        <h1 className="text-5xl font-bold w-90">
          Discover a new level of candidate assessment
        </h1>
        <p className="text-gray w-90">
          your gateway to evaluating skills and potential. This meticulously
          crafted assessment is designed to gauge candidates' abilities across a
          spectrum of aptitudes.
        </p>
        {showModal ? (
          <></>
        ) : (
          <button
            className="btn bg-tertiary text-primary p-4 rounded-lg font-bold w-1/3"
            onClick={openModal}
          >
            Start
          </button>
        )}
        {showModal && (
          <div className="flex flex-col text-left w-10/12">
            <h2 className="text-center text-2xl font-bold underline my-4">
              Terms and Conditions
            </h2>
            <ol className="list-disc gap-2 text-lg">
              <li>
                By accessing and participating in this online proctored aptitude
                test, you agree to comply with all the terms and conditions
                outlined herein.
              </li>
              <li>
                You must grant the necessary permissions for full-screen access
                during the entire duration of the test. This is essential to
                prevent any potential cheating or unauthorized use of external
                resources.
              </li>
              <li>
                You are required to allow access to your camera throughout the
                test to ensure proper proctoring and monitoring of your
                test-taking environment.
              </li>
              <li>
                You are responsible for ensuring a stable internet connection
                during the test to avoid any interruptions that might affect the
                test experience.
              </li>
              <li>
                Any attempts to use external devices, communication tools, or
                unauthorized materials during the test will result in immediate
                disqualification.
              </li>
              <li>
                The test platform and content are the property of [Test Provider
                Name]. Unauthorized distribution, reproduction, or sharing of
                any part of the test is strictly prohibited.
              </li>
              <li>
                You agree to maintain a quiet and suitable testing environment,
                free from distractions and disruptions, to ensure a fair and
                accurate assessment.
              </li>
              <li>
                In case of technical issues during the test, you must
                immediately report them to the technical support team for
                resolution.
              </li>
              <li>
                The test results will be shared with you within a specified
                timeframe. These results are confidential and should not be
                shared or discussed with others.
              </li>
              <li>
                [Test Provider Name] reserves the right to take appropriate
                action, including cancellation of test scores and legal
                proceedings, against any individual found engaging in fraudulent
                or unethical behavior during the test.
              </li>
            </ol>
            <div className="flex flex-col gap-2 my-3">
              <span className="flex gap-2">
                <input
                  type="checkbox"
                  name="camera"
                  id="camera"
                  checked={cameraPermission}
                  onChange={handleCameraPermissionChange}
                />
                <label htmlFor="camera" className="text-xl">
                  Agree to provide camera and microphone access
                </label>
              </span>
              <span className="flex gap-2">
                <input
                  type="checkbox"
                  name="fullscreen"
                  id="fullscreen"
                  checked={fullscreenPermission}
                  onChange={handleFullScreen}
                />
                <label htmlFor="fullscreen" className="text-xl">
                  Agree to provide fullscreen access
                </label>
              </span>
            </div>
            <button
              className="w-full bg-tertiary p-2 my-5 text-md font-bold rounded-md text-primary"
              onClick={handleAgree}
            >
              I Agree
            </button>
            <button
              className="w-full  border border-tertiary p-2 text-md font-bold rounded-md "
              onClick={closeModal}
            >
              Reject
            </button>
          </div>
        )}
      </div>
      {cameraStream && (
        <div className="fixed bottom-10 right-10 w-48 h-36 border-2 border-gray-300 rounded-md overflow-hidden">
          <video
            className="w-full h-full object-cover"
            ref={videoRef}
            autoPlay
            muted
            playsInline // Added to prevent fullscreen on play
          />
        </div>
      )}
    </div>
  );
}
export default Landingpage;
