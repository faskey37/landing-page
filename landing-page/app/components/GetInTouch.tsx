'use client';

import React from 'react';

const GetInTouch = () => {
  const handleStartNow = () => {
    const formElement = document.querySelector('.form-box');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full font-sans">

      {/* 🔥 DESKTOP SECTION - REDUCED MAP SIZE FOR VISIBLE RADIUS */}
      <div className="hidden md:block relative min-h-[480px] lg:min-h-[520px] bg-gray-100">
        
        {/* 🌍 MAP - REDUCED SIZE WITH PADDING SO RADIUS IS VISIBLE */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15138.437870613532!2d73.9130782!3d18.4560326!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb3ad7a249db%3A0x66d1d9a8558708c5!2sCareer%20Launcher%20Pune%20Undri!5e0!3m2!1sen!2sin!4v1730967737512!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              title="Career Launcher Pune Undri Location Map"
            />
          </div>
        </div>

        {/* 🧊 RIGHT SIDE CARD - FLOATING ON TOP */}
        <div className="relative z-10 flex items-center justify-end h-full px-4 lg:px-8 py-8">
          <div className="
            w-[300px] md:w-[320px]
            bg-white/95 backdrop-blur-md
            border border-gray-100
            rounded-xl
            p-4
            text-gray-900
            shadow-xl
          ">
            {/* Header */}
            <div className="mb-3">
              <h2 className="text-base font-bold text-gray-900 mb-1.5">
                Visit Our Center
              </h2>
              <div className="w-8 h-0.5 bg-[#e85222] rounded-full"></div>
            </div>

            <p className="text-xs text-gray-600 mb-4">
              Career Launcher Pune – Undri
            </p>

            {/* Info Grid */}
            <div className="space-y-3 text-sm">
              {/* Working Hours */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide">Hours</p>
                  <p className="font-semibold text-gray-800 text-xs">Mon-Sat | 9AM – 7PM</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide">Contact</p>
                  <a
                    href="tel:919226342428"
                    className="font-semibold text-[#e85222] hover:text-[#cf4118] transition-colors text-xs"
                  >
                    +91 92263 42428
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 7L12 14L2 7"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide">Email</p>
                  <p className="text-[11px] text-gray-700 truncate">
                    pune.undri@careerlauncher.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide">Address</p>
                  <p className="text-[11px] text-gray-600 leading-tight">
                    Office 207, 2nd Fl, Undri City Center Mall, Pune
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 space-y-2">
              <a
                href="https://maps.google.com/?q=Career+Launcher+Pune+Undri"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center border border-gray-200 py-1.5 rounded-full text-[11px] font-semibold text-gray-700 hover:border-[#e85222] hover:text-[#e85222] transition-all duration-200"
              >
                Get Directions →
              </a>

              <button
                onClick={handleStartNow}
                className="w-full bg-[#e85222] hover:bg-[#cf4118] text-white py-2 rounded-full text-[11px] font-semibold transition-all duration-200 hover:shadow-md"
              >
                Book Free Counselling
              </button>
            </div>

            {/* Trust Badge */}
            <div className="mt-3 text-center">
              <p className="text-[9px] text-gray-400">
                ⭐ 10,000+ students
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VERSION */}
      <div className="md:hidden px-5 py-10 bg-gray-50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Get in Touch
          </h2>
          <div className="w-12 h-1 bg-[#e85222] rounded-full mx-auto"></div>
          <p className="text-gray-600 mt-3 text-sm">
            We're here to help you achieve your goals
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 mb-6 h-[220px] shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15138.437870613532!2d73.9130782!3d18.4560326!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb3ad7a249db%3A0x66d1d9a8558708c5!2sCareer%20Launcher%20Pune%20Undri!5e0!3m2!1sen!2sin!4v1730967737512!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            title="Career Launcher Pune Undri Location Map"
          />
        </div>

        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Working Hours</p>
                <p className="font-semibold text-gray-800">Mon - Sat | 9AM – 7PM</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Contact</p>
                <a href="tel:919226342428" className="font-semibold text-[#e85222] text-base">
                  +91 92263 42428
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Address</p>
                <p className="text-sm text-gray-700">
                  Office No 207, 2nd Floor, Undri City Center Mall, Undri, Pune - 411060
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7L12 14L2 7"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-xs">Email</p>
              <p className="text-sm text-gray-700 break-words">
                pune.undri@careerlauncher.com
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartNow}
          className="mt-6 w-full bg-[#e85222] text-white py-3.5 rounded-xl font-semibold transition-all duration-200 hover:bg-[#cf4118] hover:shadow-md"
        >
          Book Free Counselling →
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          ⭐ Trusted by 10,000+ students across India
        </p>
      </div>

      {/* 🔥 CTA BANNER */}
      <div className="bg-gradient-to-r from-[#e84c1e] to-[#c43a12] text-center py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
            Ready to Start Your Journey?
          </h3>
          <p className="text-white/90 text-sm md:text-base mb-5">
            Book your FREE counselling session and get personalized guidance
          </p>
          <button
            onClick={handleStartNow}
            className="bg-white text-[#e85222] px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
          >
            Start Now
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

    </section>
  );
};

export default GetInTouch;