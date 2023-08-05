import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TandCmodal = ({ onClose }) => {
    const [cameraPermission, setCameraPermission] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const nav = useNavigate();
    const handleCameraPermissionChange = () => {
        if (!cameraPermission) {
            // Code to request camera permission goes here
            // You can use browser APIs like navigator.mediaDevices.getUserMedia()
            // to request camera access
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(() => {
                    console.log('Camera permission granted');
                    setCameraPermission(true);
                })
                .catch((error) => {
                    console.log('Camera permission denied:', error);
                    setCameraPermission(false);
                });
        } else {
            setCameraPermission(false);
        }
    };

    const handleAcceptTerms = () => {
        if (cameraPermission && termsAccepted) {
            nav('/test/0');
            console.log('Terms accepted and camera permission granted');
        } else if (!cameraPermission) {
            // Display a message or take appropriate action if camera permission is not granted
            console.log('Please grant camera permission to accept the terms');
        } else if (!termsAccepted) {
            // Display a message or take appropriate action if terms are not accepted
            console.log('Please accept the terms and conditions');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
                <p className="mb-4">
                    These are the terms and conditions for the online aptitude test. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus, justo eu malesuada tincidunt, felis libero varius neque, in volutpat tortor nulla sit amet libero.
                </p>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="cameraPermissionCheckbox"
                        className="mr-2"
                        checked={cameraPermission}
                        onChange={handleCameraPermissionChange}
                    />
                    <label htmlFor="cameraPermissionCheckbox">Grant camera permission</label>
                </div>
                {cameraPermission && (
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="termsCheckbox"
                            className="mr-2"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                        />
                        <label htmlFor="termsCheckbox">I agree to the terms and conditions</label>
                    </div>
                )}
                <div className="flex items-center">
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${(!cameraPermission || !termsAccepted) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={handleAcceptTerms}
                        disabled={!cameraPermission || !termsAccepted}
                    >
                        Accept
                    </button>
                    <button className="ml-2 text-gray-500" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TandCmodal;
