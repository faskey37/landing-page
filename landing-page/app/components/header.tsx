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
  <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#e85222"/>
    <path d="M13.62 17.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V27c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#25D366"/>
    <path d="M20 9C14.48 9 10 13.48 10 19c0 1.87.52 3.62 1.42 5.12L10 30l6.04-1.38A10.94 10.94 0 0 0 20 29c5.52 0 10-4.48 10-10S25.52 9 20 9Z" fill="white"/>
    <path d="M20 11C15.58 11 12 14.58 12 19c0 1.67.47 3.23 1.28 4.56L12.2 27l3.54-1.06A7.94 7.94 0 0 0 20 27c4.42 0 8-3.58 8-8s-3.58-8-8-8Z" fill="#25D366"/>
    <path d="M16.5 15.5c-.2-.2-.5-.2-.7 0-.3.3-1 1-1 2.3 0 1.3.9 2.6 1.7 3.5 1.5 1.8 3.5 3.2 5.8 3.8.8.2 1.5.1 2-.2.6-.4.9-1 .9-1.4v-.9c0-.2-.1-.3-.3-.4l-1.5-.7c-.2-.1-.4 0-.5.1l-.6.7c-.1.1-.3.2-.4.1-1-.4-2.5-1.5-3.3-2.8-.1-.2 0-.3.1-.4l.5-.6c.1-.2.1-.4 0-.5l-.7-1.5c0-.1-.1-.2-.2-.2l-.8.6Z" fill="white"/>
  </svg>
);

const WhatsAppIconSmall = () => (
  <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#25D366"/>
    <path d="M20 9C14.48 9 10 13.48 10 19c0 1.87.52 3.62 1.42 5.12L10 30l6.04-1.38A10.94 10.94 0 0 0 20 29c5.52 0 10-4.48 10-10S25.52 9 20 9Z" fill="white"/>
    <path d="M20 11C15.58 11 12 14.58 12 19c0 1.67.47 3.23 1.28 4.56L12.2 27l3.54-1.06A7.94 7.94 0 0 0 20 27c4.42 0 8-3.58 8-8s-3.58-8-8-8Z" fill="#25D366"/>
    <path d="M16.5 15.5c-.2-.2-.5-.2-.7 0-.3.3-1 1-1 2.3 0 1.3.9 2.6 1.7 3.5 1.5 1.8 3.5 3.2 5.8 3.8.8.2 1.5.1 2-.2.6-.4.9-1 .9-1.4v-.9c0-.2-.1-.3-.3-.4l-1.5-.7c-.2-.1-.4 0-.5.1l-.6.7c-.1.1-.3.2-.4.1-1-.4-2.5-1.5-3.3-2.8-.1-.2 0-.3.1-.4l.5-.6c.1-.2.1-.4 0-.5l-.7-1.5c0-.1-.1-.2-.2-.2l-.8.6Z" fill="white"/>
  </svg>
);

// Small Icons for Mobile

const PhoneIconSmall = () => (
  <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#e85222"/>
    <path d="M13.62 17.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V27c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/>
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