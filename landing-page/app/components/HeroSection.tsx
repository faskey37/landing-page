// app/components/HeroSection.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

interface FormData {
  name: string;
  email: string;
  mobile: string;
  program: string;
}

interface SubmitStatus {
  type: 'success' | 'error' | 'info' | null;
  message: string;
}

const HeroSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    program: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number | null>(null);
  const submissionCountRef = useRef(0);
  const lastSubmissionTimeRef = useRef(0);

  // Rate limiting: Max 3 submissions per minute from same session
  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const timeWindow = 60000; // 1 minute
    
    // Reset counter if time window has passed
    if (now - lastSubmissionTimeRef.current > timeWindow) {
      submissionCountRef.current = 0;
    }
    
    if (submissionCountRef.current >= 3) {
      const timeLeft = Math.ceil((timeWindow - (now - lastSubmissionTimeRef.current)) / 1000);
      setRateLimitRemaining(timeLeft);
      return false;
    }
    
    return true;
  }, []);

  const updateRateLimit = useCallback(() => {
    const now = Date.now();
    if (now - lastSubmissionTimeRef.current > 60000) {
      submissionCountRef.current = 1;
    } else {
      submissionCountRef.current++;
    }
    lastSubmissionTimeRef.current = now;
    setRateLimitRemaining(null);
  }, []);

  // Initialize reCAPTCHA v3
  useEffect(() => {
    let isMounted = true;
    
    const checkRecaptcha = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          if (isMounted) {
            console.log('[reCAPTCHA] v3 ready');
            setRecaptchaReady(true);
          }
        });
        clearInterval(checkRecaptcha);
      }
    }, 500);
    
    const timeout = setTimeout(() => {
      if (isMounted && !recaptchaReady) {
        console.warn('[reCAPTCHA] Load timeout, continuing anyway');
        setRecaptchaReady(true);
      }
      clearInterval(checkRecaptcha);
    }, 10000);
    
    return () => {
      isMounted = false;
      clearInterval(checkRecaptcha);
      clearTimeout(timeout);
    };
  }, [recaptchaReady]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-format mobile number (only digits, max 10)
    if (name === 'mobile') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear status when user starts typing
    if (submitStatus.type !== null) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const validateForm = (): boolean => {
    // Name validation
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your full name' });
      return false;
    }
    
    if (formData.name.trim().length < 2) {
      setSubmitStatus({ type: 'error', message: 'Name must be at least 2 characters' });
      return false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your email address' });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }
    
    // Mobile validation (Indian numbers)
    if (!formData.mobile) {
      setSubmitStatus({ type: 'error', message: 'Please enter your mobile number' });
      return false;
    }
    
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8, or 9' });
      return false;
    }
    
    // Program validation
    if (!formData.program) {
      setSubmitStatus({ type: 'error', message: 'Please select a program' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous status
    setSubmitStatus({ type: null, message: '' });
    
    // Check rate limit
    if (!checkRateLimit()) {
      setSubmitStatus({ 
        type: 'error', 
        message: `Too many submission attempts. Please wait ${rateLimitRemaining} seconds before trying again.` 
      });
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Check reCAPTCHA readiness
    if (!recaptchaReady || !window.grecaptcha) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Security check is initializing. Please wait a moment and try again.' 
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Execute reCAPTCHA v3
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'submit' }
      );
      
      if (!token) {
        throw new Error('Failed to generate security token');
      }
      
      // Submit to API
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recaptchaToken: token,
          formData: {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            mobile: formData.mobile,
            program: formData.program,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || window.location.href
          }
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Update rate limit counter on successful submission
        updateRateLimit();
        
        // Show success UI
        setShowSuccess(true);
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! Your information has been saved. We will contact you soon.' 
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          mobile: '',
          program: ''
        });
        
        // Reset success message after delay
        setTimeout(() => {
          setShowSuccess(false);
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      } else {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('[Form] Submission error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* reCAPTCHA v3 Script */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
        onError={() => {
          console.error('[reCAPTCHA] Failed to load script');
          setRecaptchaReady(true); // Fallback to allow form submission
        }}
      />
      
      <div 
        className="w-full overflow-x-hidden relative -mt-24 z-30"
        style={{
          backgroundImage: `url('https://clsite-file1.s3.amazonaws.com/106960_micrositebanner_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#FFF0EB',
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
                <div>✓ Personalized Mentorship</div>
                <div>✓ Comprehensive Study Material</div>
                <div>✓ Regular Mock Tests & Analysis</div>
                <div>✓ Experienced Faculty</div>
              </div>

              <div className="border-l-4 border-orange-200 pl-4">
                <p className="text-sm md:text-base text-gray-700">
                  Our programs focus on conceptual clarity, disciplined preparation, and strategic test-taking
                  — enabling students from diverse academic backgrounds to perform at their best.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-4 md:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  🎓 Schedule a Free Counselling Session
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Speak with our academic advisors to understand the right preparation strategy based on your goals.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:pl-8">
              <div className="sticky top-24 flex justify-center lg:justify-end">
                <div className="form-box">
                  <h5 className="form-title">
                    Get FREE Counseling Session
                  </h5>
                  
                  {showSuccess ? (
                    <div className="text-center mt-4">
                      <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-8 rounded-lg text-center">
                        <svg className="w-12 h-12 mx-auto mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-semibold">Thank you! Your information has been saved.</p>
                        <p className="text-xs mt-2">We will contact you within 24 hours.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      {/* Status Messages */}
                      {submitStatus.type === 'error' && (
                        <div className="bg-red-50 border border-red-500 text-red-700 px-3 py-2 rounded-lg text-xs" role="alert">
                          {submitStatus.message}
                        </div>
                      )}
                      
                      {submitStatus.type === 'success' && (
                        <div className="bg-green-50 border border-green-500 text-green-700 px-3 py-2 rounded-lg text-xs" role="alert">
                          {submitStatus.message}
                        </div>
                      )}
                      
                      {/* Rate Limit Warning */}
                      {rateLimitRemaining !== null && (
                        <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 px-3 py-2 rounded-lg text-xs" role="alert">
                          ⏳ Please wait {rateLimitRemaining} seconds before submitting again.
                        </div>
                      )}
                      
                      {/* Name Field */}
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input w-full px-3 py-2.5 text-sm"
                          disabled={isSubmitting}
                          aria-label="Full name"
                          autoComplete="name"
                        />
                      </div>
                      
                      {/* Email Field */}
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input w-full px-3 py-2.5 text-sm"
                          disabled={isSubmitting}
                          aria-label="Email address"
                          autoComplete="email"
                        />
                      </div>
                      
                      {/* Mobile Field */}
                      <div>
                        <input
                          type="tel"
                          name="mobile"
                          placeholder="Mobile Number (10 digits) *"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="form-input w-full px-3 py-2.5 text-sm"
                          maxLength={10}
                          disabled={isSubmitting}
                          aria-label="Mobile number"
                          autoComplete="tel"
                        />
                      </div>
                      
                      {/* Program Select */}
                      <div>
                        <select
                          name="program"
                          value={formData.program}
                          onChange={handleChange}
                          className="form-input w-full px-3 py-2.5 text-sm"
                          disabled={isSubmitting}
                          aria-label="Select program"
                        >
                          <option value="">Select Program *</option>
                          <optgroup label="School Classes">
                            <option value="CLASS-8">Class 8</option>
                            <option value="CLASS-9">Class 9</option>
                            <option value="CLASS-10">Class 10</option>
                            <option value="CLASS-11">Class 11</option>
                            <option value="CLASS-12">Class 12</option>
                          </optgroup>
                          <optgroup label="Entrance Preparation">
                            <option value="TUITIONS">Tuitions</option>
                            <option value="BBA/IPM">BBA / IPM</option>
                            <option value="LAW">Law (CLAT)</option>
                          </optgroup>
                        </select>
                      </div>
                      
                      {/* reCAPTCHA Badge */}
                      <div className="g-recaptcha" data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} data-size="invisible"></div>
                      
                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="submit-button w-full py-2.5 text-sm font-semibold"
                        disabled={isSubmitting || (rateLimitRemaining !== null)}
                        aria-label="Submit form"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          'Submit'
                        )}
                      </button>
                      
                      {/* Loading Indicator for reCAPTCHA */}
                      {!recaptchaReady && !isSubmitting && (
                        <p className="text-xs text-gray-400 text-center">
                          🔒 Loading security check...
                        </p>
                      )}
                      
                      {/* Privacy Notice */}
                      <p className="text-xs text-gray-400 text-center mt-2">
                        This site is protected by reCAPTCHA and the Google 
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline mx-1">Privacy Policy</a> 
                        and 
                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline mx-1">Terms of Service</a> 
                        apply.
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
            box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1);
            width: 550px;
            max-width: 100%;
            transition: transform 0.2s ease;
          }
          
          .form-box:hover {
            transform: translateY(-2px);
          }
          
          .form-title {
            font-size: 20px;
            font-weight: 700;
            line-height: 1.3;
            text-align: left;
            color: #1a1a1a;
            margin: 0;
            position: relative;
            padding-bottom: 12px;
          }
          
          .form-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background-color: #e85222;
            border-radius: 2px;
          }
          
          @media (min-width: 640px) {
            .form-title {
              font-size: 22px;
            }
          }
          
          .form-input {
            width: 100%;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            color: #374151;
            transition: all 0.2s ease;
            background-color: #ffffff;
            font-size: 14px;
          }
          
          .form-input:focus {
            outline: none;
            border-color: #e85222;
            box-shadow: 0 0 0 3px rgba(232, 82, 34, 0.1);
          }
          
          .form-input::placeholder {
            color: #9ca3af;
            font-size: 13px;
          }
          
          .form-input:disabled {
            background-color: #f9fafb;
            cursor: not-allowed;
            opacity: 0.7;
          }
          
          .submit-button {
            width: 100%;
            background-color: #e85222;
            color: white;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
            padding: 10px 16px;
          }
          
          .submit-button:hover:not(:disabled) {
            background-color: #d14417;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(232, 82, 34, 0.3);
          }
          
          .submit-button:active:not(:disabled) {
            transform: translateY(0);
          }
          
          .submit-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          /* Spinner animation */
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default HeroSection;