// app/components/navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', hash: 'home' },
    { name: 'About Us', hash: 'about' },
    { name: 'Programs', hash: 'about' },
    { name: 'Why Us', hash: 'why-us' },
    { name: 'Contact us', hash: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header
      
      for (let i = 0; i < navItems.length; i++) {
        const section = document.getElementById(navItems[i].hash);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[i].hash);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const element = document.getElementById(hash);
    if (element) {
      const headerHeight = 60; // Only header height
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(hash);
    }
  };

  const handlePayFees = () => {
    window.open('https://www.careerlauncher.com/payonline/getPayment-new.jsp', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="w-full" style={{ backgroundColor: '#052c65' }}>
      <div style={{ paddingLeft: '80px', paddingRight: '80px' }}>
        <div className="flex justify-between items-center h-14">
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.hash}`}
                  onClick={(e) => handleScrollToSection(e, item.hash)}
                  className={`px-4 py-1.5 rounded text-sm font-medium transition-all cursor-pointer ${
                    activeSection === item.hash
                      ? 'bg-[#e85222] text-white'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Pay Fees Button */}
          <div className="hidden md:block">
            <button
              onClick={handlePayFees}
              className="px-5 py-1.5 rounded text-sm font-medium transition-colors text-white"
              style={{ backgroundColor: '#64a518' }}
            >
              Pay Fees
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.hash}`}
                  onClick={(e) => {
                    handleScrollToSection(e, item.hash);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded text-sm cursor-pointer ${
                    activeSection === item.hash
                      ? 'bg-[#e85222] text-white'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              {/* Pay Fees button in mobile menu */}
              <div className="pt-2">
                <button
                  onClick={handlePayFees}
                  className="px-5 py-2 rounded text-sm text-white w-full text-center"
                  style={{ backgroundColor: '#64a518' }}
                >
                  Pay Fees
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default Navbar;