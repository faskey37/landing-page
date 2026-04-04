// app/components/header.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const Header = () => {
  const handleEnrollClick = () => {
    window.open('https://www.careerlauncher.com/enroll-now', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full" style={{ backgroundColor: '#ffffff', paddingLeft: '80px', paddingRight: '80px', height: '60px', borderBottom: '1px solid #e5e7eb' }}>
      <div className="flex justify-between items-center h-full">
        
        {/* Left side - Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <div className="flex items-baseline">
              <img 
                src="https://clsite-file1.s3.amazonaws.com/106960_cl.png" 
                alt="Career Launcher Logo" 
                style={{ 
                  height: '40px', 
                  width: 'auto',
                  objectFit: 'contain'
                }} 
              />
            </div>
          </Link>
        </div>

        {/* Right side - Phone numbers and Enroll button with cart icon */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            {/* First phone with solid orange icon */}
            <div className="flex items-center space-x-2">
              <PhoneIcon />
              <span className="text-gray-700 text-sm font-medium">9226342428</span>
            </div>
            
            {/* Second phone with WhatsApp icon */}
            <div className="flex items-center space-x-2">
              <WhatsAppIcon />
              <span className="text-gray-700 text-sm font-medium">9226342428</span>
            </div>
          </div>
          
          {/* Enroll Now button as link */}
          <a
            href="#why-us"
            target="_blank"
            rel="noopener noreferrer"
            className="enroll-button flex items-center gap-2"
            style={{
              border: '1px solid #e85222',
              borderRadius: '5px',
              lineHeight: '32px',
              padding: '0 12px',
              marginTop: '5px',
              backgroundColor: 'transparent',
              color: '#e85222',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
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
          </a>
        </div>
      </div>
    </div>
  );
};

// Solid Orange Phone Icon (filled)
const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="#e85222" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

// Official WhatsApp Icon
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

// Shopping Cart Icon
const ShoppingCartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#e85222' }}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6.5M17 13l1.5 6.5M9 21h6M12 21v-4" />
  </svg>
);

export default Header;