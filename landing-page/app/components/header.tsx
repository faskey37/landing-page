// app/components/header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    window.open('#why-us', '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919226342428', '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:919226342428';
  };

  return (
    <>
      {/* Header - Higher z-index than navbar */}
      <div 
        className="w-full fixed top-0 z-50 transition-transform duration-300"
        style={{ 
          backgroundColor: '#ffffff', 
          paddingLeft: '16px',
          paddingRight: '16px',
          height: '60px', 
          borderBottom: '1px solid #e5e7eb',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center h-full" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img 
                src="https://clsite-file1.s3.amazonaws.com/106960_cl.png" 
                alt="Career Launcher Logo" 
                style={{ 
                  height: '40px', 
                  width: 'auto',
                  objectFit: 'contain'
                }} 
              />
            </Link>
          </div>

          {/* Right side - Desktop */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Phone */}
              <div 
                onClick={handlePhoneClick}
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <PhoneIcon />
                <span className="text-gray-700 text-sm font-medium hidden sm:inline">9226342428</span>
              </div>
              
              {/* WhatsApp */}
              <div 
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <WhatsAppIcon />
                <span className="text-gray-700 text-sm font-medium hidden sm:inline">9226342428</span>
              </div>
            </div>
            
            {/* Enroll Now button */}
            <button
              onClick={handleEnrollClick}
              className="enroll-button flex items-center gap-2"
              style={{
                border: '1px solid #e85222',
                borderRadius: '5px',
                lineHeight: '32px',
                padding: '0 12px',
                backgroundColor: 'transparent',
                color: '#e85222',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e85222';
                e.currentTarget.style.color = '#fff';
                const cartIcon = e.currentTarget.querySelector('svg');
                if (cartIcon) cartIcon.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#e85222';
                const cartIcon = e.currentTarget.querySelector('svg');
                if (cartIcon) cartIcon.style.color = '#e85222';
              }}
            >
              <ShoppingCartIcon />
              <span>Enroll now</span>
            </button>
          </div>
        </div>

        {/* Mobile View - Contacts VISIBLE */}
        <div className="md:hidden flex justify-between items-center h-full">
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

          {/* Mobile Contacts - VISIBLE NOW */}
          <div className="flex items-center gap-2">
            {/* Phone Icon - Visible */}
            <button
              onClick={handlePhoneClick}
              className="p-2 rounded-full bg-gray-50 active:bg-gray-100"
              aria-label="Call"
            >
              <PhoneIconSmall />
            </button>
            
            {/* WhatsApp Icon - Visible */}
            <button
              onClick={handleWhatsAppClick}
              className="p-2 rounded-full bg-green-50 active:bg-green-100"
              aria-label="WhatsApp"
            >
              <WhatsAppIconSmall />
            </button>
            
            {/* Enroll Button - Visible (compact) */}
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
              <ShoppingCartIconWhite />
              <span>Enroll</span>
            </button>
            
            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-1"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Only for additional links */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            style={{ top: '60px' }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed left-0 right-0 bg-white z-40 md:hidden shadow-lg" style={{ top: '60px' }}>
            <div className="p-4 space-y-3">
              {/* Quick Links Header */}
              <div className="pb-2">
                <p className="text-xs text-gray-400 text-center">Quick Links</p>
              </div>
              
              {/* Navigation Links */}
              <div className="space-y-2">
                <a href="#home" className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                <a href="#about" className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
                <a href="#programs" className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Programs</a>
                <a href="#why-us" className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Why Us</a>
                <a href="#contact" className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-100 my-2"></div>
              
              {/* Contact Info */}
              <div className="pt-1">
                <p className="text-xs text-gray-400 text-center">
                  Career Launcher Pune - Undri
                </p>
                <p className="text-xs text-gray-400 text-center mt-1">
                  Office No 207, Undri City Center Mall, Pune
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

// Regular Icons for Desktop
const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="#e85222" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="100" rx="22" fill="#25D366"/>
    <circle cx="50" cy="49" r="34" fill="white"/>
    <circle cx="50" cy="49" r="30" fill="#25D366"/>
    <path d="M50,19 C43,19 37,21 32,26 C27,31 24,37 24,44 C24,50 26,55 30,60 L26,74 L41,70 C45,72 47,73 50,73 C57,73 63,70 68,65 C73,60 76,54 76,47 C76,40 73,34 68,29 C63,24 57,19 50,19Z" fill="white"/>
    <path d="M50,23 C44,23 38,25 34,30 C30,35 27,40 27,46 C27,51 29,56 33,60 L29,72 L42,68 C45,70 48,71 50,71 C56,71 62,69 66,64 C70,60 73,54 73,48 C73,42 70,36 65,32 C61,27 56,23 50,23Z" fill="#25D366"/>
    <path d="M40,34 C39,33 37,33 36,34 C35,35 33,37 33,40 C33,43 35,46 37,49 C41,54 47,59 55,62 C58,63 61,63 63,62 C65,60 66,58 66,56 C66,55 65,54 64,54 L61,52 C60,52 58,52 57,53 L56,54 C55,55 54,55 53,54 C51,53 48,51 45,47 C43,44 42,42 43,40 L44,39 C45,38 45,37 44,36 L40,34Z" fill="white"/>
  </svg>
);

// Small Icons for Mobile
const PhoneIconSmall = () => (
  <svg className="w-5 h-5" fill="#e85222" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const WhatsAppIconSmall = () => (
  <svg width="22" height="22" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="100" rx="22" fill="#25D366"/>
    <circle cx="50" cy="49" r="34" fill="white"/>
    <circle cx="50" cy="49" r="30" fill="#25D366"/>
    <path d="M50,19 C43,19 37,21 32,26 C27,31 24,37 24,44 C24,50 26,55 30,60 L26,74 L41,70 C45,72 47,73 50,73 C57,73 63,70 68,65 C73,60 76,54 76,47 C76,40 73,34 68,29 C63,24 57,19 50,19Z" fill="white"/>
    <path d="M50,23 C44,23 38,25 34,30 C30,35 27,40 27,46 C27,51 29,56 33,60 L29,72 L42,68 C45,70 48,71 50,71 C56,71 62,69 66,64 C70,60 73,54 73,48 C73,42 70,36 65,32 C61,27 56,23 50,23Z" fill="#25D366"/>
  </svg>
);

const ShoppingCartIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#e85222' }}>
    <g stroke="#e85222" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M12 16 L20 16 L26 46 L62 46 L68 24 L26 24"/>
      <line x1="32" y1="24" x2="34" y2="46"/>
      <line x1="42" y1="24" x2="42" y2="46"/>
      <line x1="52" y1="24" x2="50" y2="46"/>
      <line x1="26" y1="31" x2="66" y2="31"/>
      <line x1="27" y1="38" x2="64" y2="38"/>
      <circle cx="32" cy="56" r="5"/>
      <circle cx="56" cy="56" r="5"/>
    </g>
  </svg>
);

const ShoppingCartIconWhite = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M12 16 L20 16 L26 46 L62 46 L68 24 L26 24"/>
      <line x1="32" y1="24" x2="34" y2="46"/>
      <line x1="42" y1="24" x2="42" y2="46"/>
      <line x1="52" y1="24" x2="50" y2="46"/>
      <line x1="26" y1="31" x2="66" y2="31"/>
      <line x1="27" y1="38" x2="64" y2="38"/>
      <circle cx="32" cy="56" r="5"/>
      <circle cx="56" cy="56" r="5"/>
    </g>
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default Header;