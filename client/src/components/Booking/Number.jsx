import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Number = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  // Validate phone number format
  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const handlePhoneSubmit = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }

    // Simulate OTP sending
    setIsPhoneSubmitted(true);
    setErrorMessage('');
    console.log('Sending OTP to', phoneNumber);
  };

  const navigate = useNavigate();
  const handleOtpSubmit = () => {
    if (otp === '123456') { // Simulate OTP verification
      setIsOtpVerified(true);
      setErrorMessage('');
      navigate('/booking/sevas');
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = () => {
    if (resendCount < 3) { // Limit resend attempts
      setResendCount((prev) => prev + 1);
      setErrorMessage('');
      console.log('Resending OTP to', phoneNumber);
    } else {
      setErrorMessage('Maximum resend attempts reached. Please try again later.');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Phone Number Validation</h2>

        <div className="space-y-4">
          {/* Phone Number Input */}
          <div>
            <label className="block text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isPhoneSubmitted && !isOtpVerified}
              className="w-full px-4 py-2 border border-orange-200 rounded-md"
            />
          </div>

          {/* OTP Input - Appears after phone number is submitted */}
          {isPhoneSubmitted && !isOtpVerified && (
            <div>
              <label className="block text-sm mb-2">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-orange-200 rounded-md"
              />
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">{errorMessage}</div>
          )}

          {/* Buttons */}
          <div className="flex justify-between">
            {!isPhoneSubmitted ? (
              <button
                onClick={handlePhoneSubmit}
                className="w-full bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
              >
                Send OTP
              </button>
            ) : !isOtpVerified ? (
              <>
                <button
                  onClick={handleResendOtp}
                  disabled={resendCount >= 3}
                  className="text-orange-500 hover:text-orange-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Resend OTP
                </button>
                <button
                  onClick={handleOtpSubmit}
                  className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
                >
                  Verify OTP
                </button>
              </>
            ) : null}
          </div>

          {/* OTP Verification Success Message */}
          {isOtpVerified && (
            <div className="text-green-600 font-bold text-center mt-4">
              OTP Verified Successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Number;
