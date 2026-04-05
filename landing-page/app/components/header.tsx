// app/components/header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle header hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleEnrollClick = () => {
    window.open('https://www.careerlauncher.com/enroll-now', '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919226342428', '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:919226342428';
  };

  return (
    <>
      {/* Header */}
      <div 
        className="w-full fixed top-0 z-50 transition-transform duration-300 bg-white"
        style={{ 
          paddingLeft: '16px',
          paddingRight: '16px',
          height: '60px', 
          borderBottom: '1px solid #e5e7eb',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img 
                src="https://clsite-file1.s3.amazonaws.com/106960_cl.png" 
                alt="Career Launcher Logo" 
                style={{ 
                  height: '35px', 
                  width: 'auto',
                  objectFit: 'contain'
                }} 
              />
            </Link>
          </div>

          {/* Mobile: Menu Button + Contacts */}
          <div className="flex items-center gap-2">
            {/* Phone Icon */}
            <button
              onClick={handlePhoneClick}
              className="p-2 rounded-full bg-gray-50 active:bg-gray-100"
              aria-label="Call"
            >
              <PhoneIcon />
            </button>
            
            {/* WhatsApp Icon */}
            <button
              onClick={handleWhatsAppClick}
              className="p-2 rounded-full bg-green-50 active:bg-green-100"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </button>
            
            {/* Enroll Button (Compact) */}
            <button
              onClick={handleEnrollClick}
              className="px-3 py-1.5 rounded-lg flex items-center gap-1"
              style={{
                backgroundColor: '#e85222',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              <ShoppingCartIcon />
              <span>Enroll</span>
            </button>
            
            {/* Menu Button - Opens Sidebar */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-1"
              aria-label="Menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${
          isSidebarOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Sidebar Panel */}
        <div 
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <img 
                src="https://clsite-file1.s3.amazonaws.com/106960_cl.png" 
                alt="Logo" 
                style={{ height: '30px', width: 'auto' }}
              />
              <span className="font-semibold text-gray-800">Menu</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                setIsSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <HomeIcon />
              <span className="font-medium">Home</span>
            </a>
            
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                setIsSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <AboutIcon />
              <span className="font-medium">About Us</span>
            </a>
            
            <a
              href="#programs"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
                setIsSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ProgramsIcon />
              <span className="font-medium">Programs</span>
            </a>
            
            <a
              href="#why-us"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
                setIsSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <WhyUsIcon />
              <span className="font-medium">Why Us</span>
            </a>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ContactIcon />
              <span className="font-medium">Contact Us</span>
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-2"></div>

          {/* Pay Fees Button in Sidebar */}
          <div className="p-4">
            <button
              onClick={() => {
                window.open('https://www.careerlauncher.com/pay-fees', '_blank', 'noopener,noreferrer');
                setIsSidebarOpen(false);
              }}
              className="w-full py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: '#64a518' }}
            >
              Pay Fees
            </button>
          </div>

          {/* Contact Info in Sidebar */}
          <div className="p-4 pt-2">
            <p className="text-xs text-gray-400 text-center">
              Career Launcher Pune - Undri
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              Office No 207, Undri City Center Mall
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

// Icons
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="#e85222" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="100" rx="22" fill="#25D366"/>
    <circle cx="50" cy="49" r="34" fill="white"/>
    <circle cx="50" cy="49" r="30" fill="#25D366"/>
    <path d="M50,19 C43,19 37,21 32,26 C27,31 24,37 24,44 C24,50 26,55 30,60 L26,74 L41,70 C45,72 47,73 50,73 C57,73 63,70 68,65 C73,60 76,54 76,47 C76,40 73,34 68,29 C63,24 57,19 50,19Z" fill="white"/>
    <path d="M50,23 C44,23 38,25 34,30 C30,35 27,40 27,46 C27,51 29,56 33,60 L29,72 L42,68 C45,70 48,71 50,71 C56,71 62,69 66,64 C70,60 73,54 73,48 C73,42 70,36 65,32 C61,27 56,23 50,23Z" fill="#25D366"/>
  </svg>
);

const ShoppingCartIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6.5M17 13l1.5 6.5M9 21h6M12 21v-4" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Sidebar Navigation Icons
const HomeIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const AboutIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ProgramsIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const WhyUsIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default Header;