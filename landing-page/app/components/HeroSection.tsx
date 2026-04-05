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
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [timer, setTimer] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

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
    
    if (!formData.mobile || formData.mobile.length !== 10) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please enter a valid 10-digit mobile number' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile })
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
        setSubmitStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
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
      const verifyResponse = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile, otp })
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        setSubmitStatus({ type: 'error', message: verifyData.message });
        setIsSubmitting(false);
        return;
      }

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          verified: true,
          verified_at: new Date().toISOString(),
          timestamp: new Date().toISOString()
        }),
      });

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! Your information has been saved. We will contact you soon.' 
      });
      
      setTimeout(() => {
        setFormData({ name: '', email: '', mobile: '', program: '' });
        setOtp('');
        setStep('form');
        setSubmitStatus({ type: null, message: '' });
        setResendAttempts(0);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again.' 
      });
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
      setSubmitStatus({ type: 'error', message: 'Maximum resend limit reached (3 attempts). Please try again after 1 hour.' });
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
        setTimer(30);
        setResendAttempts(prev => prev + 1);
        
        if (data.remainingAttempts === 0) {
          setMaxAttemptsReached(true);
        }
        
        setSubmitStatus({ 
          type: 'success', 
          message: data.message || 'OTP resent successfully!' 
        });
        setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
      } else {
        setSubmitStatus({ type: 'error', message: data.message });
        if (data.limitExceeded) {
          setMaxAttemptsReached(true);
        }
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setStep('form');
    setOtp('');
    setSubmitStatus({ type: null, message: '' });
  };

  return (
    <div 
      className="w-full overflow-x-hidden"
      style={{
        backgroundImage: `url('https://clsite-file1.s3.amazonaws.com/106960_micrositebanner_bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Mobile: Single column, Desktop: Two columns */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Left Column - Content */}
          <div className="w-full space-y-6 md:space-y-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Career Launcher Pune Undri
            </h1>
            
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Career Launcher Pune provides expert coaching classes for CAT, CLAT, IPMAT, and other entrance exams like XAT, SNAP, NMAT, CET, AILET, BBA, SET, and MHECET.
            </p>

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                Why Choose Career Launcher for Tuitions, CAT, CLAT & IPMAT Coaching?
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                At Career Launcher Pune, our coaching classes focus on building strong fundamentals, improving aptitude, and enhancing test-taking strategies. Our experienced mentors provide personalized attention, ensuring students get their doubts cleared instantly and develop confidence in solving complex problems.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                Can Only Toppers Crack Competitive Exams? The Truth About CAT, CLAT & IPMAT Success
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Many students believe that only toppers can crack competitive exams like CAT, CLAT, and IPMAT, but the truth is that success depends on dedication, smart learning strategies, and consistent practice. Just like in sports, where training and strategy determine performance, <strong className="font-semibold text-gray-900">cracking competitive exams requires effective time management, problem-solving skills, and the right preparation techniques</strong>.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                If you want to <strong className="font-semibold text-gray-900">crack CAT, CLAT, or IPMAT</strong>, focus on <strong className="font-semibold text-gray-900">concept clarity, regular mock tests, and strategic study plans</strong> rather than just rote learning. With the right guidance and a disciplined approach, <strong className="font-semibold text-gray-900">any student can achieve top scores</strong> and secure admission to prestigious institutions.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 md:p-6 rounded-r-lg">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                Get Expert Coaching for CAT, CLAT & IPMAT
              </h3>
              <p className="text-sm md:text-base text-gray-700">
                Looking for expert coaching? Get personalized study plans, mock tests, and expert mentorship to boost your preparation!
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:pl-8">
            <div className="sticky top-24">
              <div className="form-box bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
                  <h5 className="form-title text-xl sm:text-2xl">
                    Get FREE Counseling Session
                  </h5>
                </div>
                
                {submitStatus.type === 'success' && submitStatus.message.includes('Thank you') ? (
                  <div className="p-4 sm:p-6 text-center">
                    <div className="bg-green-50 border border-green-500 text-green-700 px-3 sm:px-4 py-6 sm:py-8 rounded-lg text-center">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm sm:text-lg font-semibold">{submitStatus.message}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={step === 'form' ? handleSendOTP : handleVerifyOTP} className="p-4 sm:p-6 pt-2 space-y-4 sm:space-y-5">
                    {submitStatus.type === 'error' && (
                      <div className="bg-red-50 border border-red-500 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                        {submitStatus.message}
                      </div>
                    )}
                    
                    {submitStatus.type === 'success' && step === 'otp' && (
                      <div className="bg-green-50 border border-green-500 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
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
                            className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
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
                            className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
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
                            className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                            maxLength={10}
                            required
                          />
                        </div>
                        
                        <div>
                          <select
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
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
                          className="submit-button w-full py-2 sm:py-3 text-sm sm:text-base"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-center mb-3 sm:mb-4">
                          <p className="text-sm sm:text-base text-gray-700">OTP sent to <strong>{formData.mobile}</strong></p>
                          <button 
                            type="button"
                            onClick={handleBackToForm}
                            className="text-xs sm:text-sm text-orange-500 hover:text-orange-600 mt-2"
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
                            className="form-input w-full text-center text-lg sm:text-xl tracking-widest px-3 sm:px-4 py-2 sm:py-3"
                            maxLength={6}
                            required
                          />
                        </div>
                        
                        <div className="text-center">
                          {timer > 0 ? (
                            <p className="text-xs sm:text-sm text-gray-500">Resend OTP in {timer} seconds</p>
                          ) : maxAttemptsReached || resendAttempts >= 3 ? (
                            <p className="text-xs sm:text-sm text-red-500">Maximum resend limit reached. Please try again after 1 hour.</p>
                          ) : (
                            <button
                              type="button"
                              onClick={handleResendOTP}
                              className="text-xs sm:text-sm text-orange-500 hover:text-orange-600"
                              disabled={isSubmitting}
                            >
                              Resend OTP ({3 - resendAttempts} attempts left)
                            </button>
                          )}
                        </div>
                        
                        <button
                          type="submit"
                          className="submit-button w-full py-2 sm:py-3 text-sm sm:text-base"
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
        .form-box h5 {
          font-size: 20px;
          font-weight: 600;
          line-height: 28px;
          text-align: left;
          color: #000000;
        }
        
        @media (min-width: 640px) {
          .form-box h5 {
            font-size: 24px;
            line-height: 32px;
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