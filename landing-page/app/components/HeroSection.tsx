// app/components/HeroSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    program: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  // Check if reCAPTCHA is loaded
  useEffect(() => {
    const checkRecaptcha = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          setRecaptchaReady(true);
        });
        clearInterval(checkRecaptcha);
      }
    }, 500);
    return () => clearInterval(checkRecaptcha);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your full name' });
      return;
    }
    
    if (!formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
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

    // Check if reCAPTCHA is ready
    if (!recaptchaReady || !window.grecaptcha) {
      setSubmitStatus({ type: 'error', message: 'Security check is loading. Please wait and try again.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Execute reCAPTCHA and get token
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'submit' }
      );

      // Submit form data with reCAPTCHA token
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recaptchaToken: token,
          formData: {
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            program: formData.program,
            timestamp: new Date().toISOString()
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        // Show success message
        setShowSuccess(true);
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! Your information has been saved. We will contact you soon.' 
        });
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', mobile: '', program: '' });
          setShowSuccess(false);
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Submission failed. Please try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Load reCAPTCHA script */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      
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

            {/* Right Column - Form */}
            <div className="w-full lg:pl-8">
              <div className="sticky top-24 flex justify-center lg:justify-end">
                <div className="form-box" style={{ width: '550px', maxWidth: '100%' }}>
                  <h5 className="form-title">
                    Get FREE Counseling Session
                  </h5>
                  
                  {showSuccess ? (
                    // Success message inside the form box
                    <div className="text-center mt-4">
                      <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-8 rounded-lg text-center">
                        <svg className="w-12 h-12 mx-auto mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-semibold">Thank you! Your information has been saved. We will contact you soon.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                      
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input w-full px-3 py-2.5 text-sm"
                          required
                          disabled={isSubmitting}
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
                          disabled={isSubmitting}
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
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <select
                          name="program"
                          value={formData.program}
                          onChange={handleChange}
                          className="form-input w-full px-3 py-2.5 text-sm"
                          required
                          disabled={isSubmitting}
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
                      
                      {/* Hidden reCAPTCHA badge (v3 is invisible) */}
                      <div className="g-recaptcha" data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} data-size="invisible"></div>
                      
                      {!recaptchaReady && (
                        <p className="text-xs text-gray-500 text-center">Loading security check...</p>
                      )}
                      
                      <button
                        type="submit"
                        className="submit-button w-full py-2.5 text-sm"
                        disabled={isSubmitting || !recaptchaReady}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                      
                      <p className="text-xs text-gray-400 text-center mt-2">
                        This site is protected by reCAPTCHA and the Google 
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline"> Privacy Policy</a> and 
                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline"> Terms of Service</a> apply.
                      </p>
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
          
          .form-input:disabled {
            background-color: #f9fafb;
            cursor: not-allowed;
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
    </>
  );
};

export default HeroSection;