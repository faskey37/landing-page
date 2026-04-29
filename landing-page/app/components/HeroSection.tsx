// app/components/HeroSection.tsx
'use client';

import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    program: ''
  });
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | 'info' | null; message: string }>({
    type: null,
    message: ''
  });
  const [timer, setTimer] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);
  const [showDebugOtp, setShowDebugOtp] = useState(false);
  const [debugOtp, setDebugOtp] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your full name' });
      return;
    }
    
    if (!formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }
    
    if (!formData.mobile || !/^[6-9]\d{9}$/.test(formData.mobile)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid 10-digit Indian mobile number' });
      return;
    }
    
    if (!formData.program) {
      setSubmitStatus({ type: 'error', message: 'Please select a program' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    setShowDebugOtp(false);
    setShowSuccess(false);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile: formData.mobile,
          name: formData.name,
          email: formData.email,
          program: formData.program
        })
      });

      const data = await response.json();

      if (data.success) {
        setStep('otp');
        setTimer(60);
        setResendAttempts(1);
        setMaxAttemptsReached(false);
        setSubmitStatus({ type: 'success', message: 'OTP sent to your mobile number!' });
        setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
      } else {
        if (data.isTimeRestricted) {
          setSubmitStatus({ 
            type: 'error', 
            message: data.message || 'SMS service is currently unavailable. Please try again between 10 AM and 9 PM.' 
          });
        } else if (data.showOtpOnScreen) {
          setDebugOtp(data.otp);
          setShowDebugOtp(true);
          setStep('otp');
          setTimer(60);
          setSubmitStatus({ type: 'info', message: 'Please use the debug OTP below to verify' });
        } else {
          setSubmitStatus({ type: 'error', message: data.message || 'Failed to send OTP' });
        }
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid 6-digit OTP' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mobile: formData.mobile, 
          otp: otp 
        })
      });

      const data = await response.json();
      console.log('Verify Response:', data);

      if (data.success === true) {
        // Show success message inside the form area
        setShowSuccess(true);
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! Your information has been saved. We will contact you soon.' 
        });
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', mobile: '', program: '' });
          setOtp('');
          setStep('form');
          setResendAttempts(0);
          setMaxAttemptsReached(false);
          setShowDebugOtp(false);
          setDebugOtp('');
          setShowSuccess(false);
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Invalid OTP. Please try again.' });
      }
    } catch (error) {
      console.error('Verification error:', error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) {
      setSubmitStatus({ type: 'error', message: `Please wait ${timer} seconds before resending OTP` });
      return;
    }
    
    if (maxAttemptsReached || resendAttempts >= 3) {
      setSubmitStatus({ type: 'error', message: 'Maximum resend limit reached. Please try again after 1 hour.' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile })
      });

      const data = await response.json();

      if (data.success) {
        setTimer(60);
        setResendAttempts(prev => prev + 1);
        setSubmitStatus({ type: 'success', message: 'OTP resent successfully!' });
        
        if (data.showDebugOtp) {
          setDebugOtp(data.otp);
          setShowDebugOtp(true);
        }
        
        setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
      } else {
        setSubmitStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      console.error('Resend error:', error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setStep('form');
    setOtp('');
    setSubmitStatus({ type: null, message: '' });
    setShowDebugOtp(false);
    setDebugOtp('');
    setShowSuccess(false);
  };

  const fillDebugOtp = () => {
    if (debugOtp) {
      setOtp(debugOtp);
    }
  };

  return (
    <div 
      className="w-full overflow-x-hidden relative -mt-24 z-30"
      style={{
        backgroundImage: `url('https://clsite-file1.s3.amazonaws.com/106960_micrositebanner_bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor:'#FFF0EB',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-8 lg:pt-8 pb-8 md:py-12 lg:py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Left Column - Content */}
          <div className="w-full space-y-6 md:space-y-8">
            <p className="text-sm text-gray-600 font-medium">
              Career Launcher Pune (Undri)
            </p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Comprehensive Coaching for CAT, CLAT & IPMAT
            </h1>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
              Structured programs designed to build strong fundamentals, enhance problem-solving ability,
              and prepare students for competitive entrance exams with confidence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base text-gray-700">
              <div>• Personalized Mentorship</div>
              <div>• Comprehensive Study Material</div>
              <div>• Regular Mock Tests & Analysis</div>
              <div>• Experienced Faculty</div>
            </div>

            <div className="border-l-4 border-gray-300 pl-4">
              <p className="text-sm md:text-base text-gray-700">
                Our programs focus on conceptual clarity, disciplined preparation, and strategic test-taking
                — enabling students from diverse academic backgrounds to perform at their best.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4 md:p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Schedule a Free Counselling Session
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Speak with our academic advisors to understand the right preparation strategy based on your goals.
              </p>
            </div>
          </div>

          {/* Right Column - Form Area (Only this updates) */}
          <div className="w-full lg:pl-8">
            <div className="sticky top-24 flex justify-center lg:justify-end">
              <div className="form-box" style={{ width: '550px', maxWidth: '100%' }}>
                <h5 className="form-title">
                  Get FREE Counseling Session
                </h5>
                
                {showSuccess ? (
                  // Success message inside the form box - NOT replacing whole page
                  <div className="text-center mt-4">
                    <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-8 rounded-lg text-center">
                      <svg className="w-12 h-12 mx-auto mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-semibold">Thank you! Your information has been saved. We will contact you soon.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={step === 'form' ? handleSendOTP : handleVerifyOTP} className="mt-4 space-y-4">
                    {step === 'otp' && showDebugOtp && debugOtp && (
                      <div className="p-3 bg-yellow-50 border border-yellow-400 rounded-lg">
                        <p className="text-sm text-yellow-800 font-semibold">⚠️ Debug OTP Available</p>
                        <p className="text-xs text-yellow-700 mt-1">Use this OTP to complete verification:</p>
                        <div className="flex items-center gap-3 mt-2">
                          <code className="text-xl font-mono font-bold text-yellow-900 bg-yellow-100 px-3 py-1 rounded">
                            {debugOtp}
                          </code>
                          <button
                            type="button"
                            onClick={fillDebugOtp}
                            className="text-xs bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Auto-fill
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {submitStatus.type === 'error' && (
                      <div className="bg-red-50 border border-red-500 text-red-700 px-3 py-2 rounded-lg text-xs">
                        {submitStatus.message}
                      </div>
                    )}
                    
                    {submitStatus.type === 'success' && (
                      <div className="bg-green-50 border border-green-500 text-green-700 px-3 py-2 rounded-lg text-xs">
                        {submitStatus.message}
                      </div>
                    )}
                    
                    {submitStatus.type === 'info' && (
                      <div className="bg-blue-50 border border-blue-500 text-blue-700 px-3 py-2 rounded-lg text-xs">
                        {submitStatus.message}
                      </div>
                    )}
                    
                    {step === 'form' ? (
                      <>
                        <div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input w-full px-3 py-2.5 text-sm"
                            required
                          />
                        </div>
                        
                        <div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input w-full px-3 py-2.5 text-sm"
                            required
                          />
                        </div>
                        
                        <div>
                          <input
                            type="tel"
                            name="mobile"
                            placeholder="Enter Mobile Number (10 digits)"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="form-input w-full px-3 py-2.5 text-sm"
                            maxLength={10}
                            required
                          />
                        </div>
                        
                        <div>
                          <select
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            className="form-input w-full px-3 py-2.5 text-sm"
                            required
                          >
                            <option value="">Select Program</option>
                            <optgroup label="School Classes">
                              <option value="CLASS-8">CLASS-8</option>
                              <option value="CLASS-9">CLASS-9</option>
                              <option value="CLASS-10">CLASS-10</option>
                              <option value="CLASS-11">CLASS-11</option>
                              <option value="CLASS-12">CLASS-12</option>
                            </optgroup>
                            <optgroup label="Tuitions & Entrance">
                              <option value="TUITIONS">TUITIONS</option>
                              <option value="BBA/IPM">BBA/IPM</option>
                              <option value="LAW">LAW</option>
                            </optgroup>
                          </select>
                        </div>
                        
                        <button
                          type="submit"
                          className="submit-button w-full py-2.5 text-sm"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-center mb-2">
                          <p className="text-sm text-gray-700">OTP sent to <strong>{formData.mobile}</strong></p>
                          <button 
                            type="button"
                            onClick={handleBackToForm}
                            className="text-xs text-orange-500 hover:text-orange-600 mt-1"
                          >
                            ← Edit Number
                          </button>
                        </div>
                        
                        <div>
                          <input
                            type="text"
                            name="otp"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="form-input w-full text-center text-lg tracking-widest px-3 py-2.5"
                            maxLength={6}
                            required
                          />
                        </div>
                        
                        <div className="text-center">
                          {timer > 0 ? (
                            <p className="text-xs text-gray-500">Resend OTP in {timer} seconds</p>
                          ) : maxAttemptsReached || resendAttempts >= 3 ? (
                            <p className="text-xs text-red-500">Maximum resend limit reached. Please try again after 1 hour.</p>
                          ) : (
                            <button
                              type="button"
                              onClick={handleResendOTP}
                              className="text-xs text-orange-500 hover:text-orange-600"
                              disabled={isSubmitting}
                            >
                              Resend OTP ({3 - resendAttempts} attempts left)
                            </button>
                          )}
                        </div>
                        
                        <button
                          type="submit"
                          className="submit-button w-full py-2.5 text-sm"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Verifying...' : 'Verify & Submit'}
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-box {
          background-color: #ffffff;
          padding: 28px 25px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .form-box h5 {
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          text-align: left;
          color: #000000;
          margin: 0;
        }
        
        @media (min-width: 640px) {
          .form-box h5 {
            font-size: 22px;
          }
        }
        
        .form-input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #374151;
          transition: all 0.3s ease;
          background-color: #ffffff;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #e85222;
          box-shadow: 0 0 0 3px rgba(232, 82, 34, 0.1);
        }
        
        .form-input::placeholder {
          color: #9ca3af;
        }
        
        .submit-button {
          width: 100%;
          background-color: #e85222;
          color: white;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .submit-button:hover:not(:disabled) {
          background-color: #d14417;
          transform: translateY(-1px);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default HeroSection;