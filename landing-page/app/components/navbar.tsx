// app/components/navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', hash: 'home' },
    { name: 'About Us', hash: 'about' },
    { name: 'Programs', hash: 'programs' },
    { name: 'Why Us', hash: 'why-us' },
    { name: 'Contact us', hash: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      
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
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const element = document.getElementById(hash);
    if (element) {
      const headerHeight = 60;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(hash);
    }
  };

  const handlePayFees = () => {
    window.open('https://www.careerlauncher.com/pay-fees', '_blank', 'noopener,noreferrer');
  };

  // Desktop only navbar
  return (
    <nav className="hidden md:block w-full" style={{ backgroundColor: '#052c65', marginTop: '60px' }}>
      <div style={{ paddingLeft: '80px', paddingRight: '80px' }}>
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-2">
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

          <div>
            <button
              onClick={handlePayFees}
              className="px-5 py-1.5 rounded text-sm font-medium transition-colors text-white"
              style={{ backgroundColor: '#64a518' }}
            >
              Pay Fees
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;