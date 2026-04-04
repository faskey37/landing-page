// app/components/HeroSection.tsx
'use client';

import React, { useState } from 'react';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    program: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div 
      className="bg-gray-50"
      style={{
        backgroundImage: `url('https://clsite-file1.s3.amazonaws.com/106960_micrositebanner_bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Career Launcher Pune Undri
            </h1>
            
            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              Career Launcher Pune provides expert coaching classes for CAT, CLAT, IPMAT, and other entrance exams like XAT, SNAP, NMAT, CET, AILET, BBA, SET, and MHECET.
            </p>

            {/* Why Choose Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Choose Career Launcher for Tuitions, CAT, CLAT & IPMAT Coaching?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At Career Launcher Pune, our coaching classes focus on building strong fundamentals, improving aptitude, and enhancing test-taking strategies. Our experienced mentors provide personalized attention, ensuring students get their doubts cleared instantly and develop confidence in solving complex problems.
              </p>
            </div>

            {/* Truth Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Can Only Toppers Crack Competitive Exams? The Truth About CAT, CLAT & IPMAT Success
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Many students believe that only toppers can crack competitive exams like CAT, CLAT, and IPMAT, but the truth is that success depends on dedication, smart learning strategies, and consistent practice. Just like in sports, where training and strategy determine performance, <strong className="font-semibold text-gray-900">cracking competitive exams requires effective time management, problem-solving skills, and the right preparation techniques</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you want to <strong className="font-semibold text-gray-900">crack CAT, CLAT, or IPMAT</strong>, focus on <strong className="font-semibold text-gray-900">concept clarity, regular mock tests, and strategic study plans</strong> rather than just rote learning. With the right guidance and a disciplined approach, <strong className="font-semibold text-gray-900">any student can achieve top scores</strong> and secure admission to prestigious institutions.
              </p>
            </div>

            {/* Expert Coaching CTA */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Get Expert Coaching for CAT, CLAT & IPMAT
              </h3>
              <p className="text-gray-700">
                Looking for expert coaching? Get personalized study plans, mock tests, and expert mentorship to boost your preparation!
              </p>
            </div>
          </div>

          {/* Right Column - Sticky Form */}
          <div className="lg:pl-8">
            <div className="sticky top-24">
              <div className="form-box bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 pt-6 pb-2">
                  <h5 className="form-title">
                    Get FREE Counseling Session
                  </h5>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
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
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="form-input"
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
                    className="submit-button"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-box h5 {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          text-align: left;
          color: var(--color-secondary, #000000);
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          color: #374151;
          transition: all 0.3s ease;
          background-color: #ffffff;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--color-secondary, #e85222);
          box-shadow: 0 0 0 3px rgba(232, 82, 34, 0.1);
        }
        
        .form-input::placeholder {
          color: #9ca3af;
        }
        
        .submit-button {
          width: 100%;
          background-color: var(--color-secondary, #e85222);
          color: white;
          font-weight: 600;
          padding: 12px 16px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
        }
        
        .submit-button:hover {
          background-color: #d14417;
          transform: translateY(-1px);
        }
        
        .submit-button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default HeroSection;