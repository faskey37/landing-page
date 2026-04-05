'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const footerSections = [
    {
      title: 'Contact Us',
      links: ['Corporate Contacts', 'Customer Support']
    },
    {
      title: 'Company',
      links: ['About Us', 'Our Results', 'Our Centers', 'Partner with us', 'Careers at CL', 'Board of Directors', 'Management Team', 'Media Coverage']
    },
    {
      title: 'Follow us on Social',
      links: ['Discord', 'Facebook', 'Instagram', 'Linkedin', 'Quora', 'Twitter', 'YouTube', 'MBA Blog', 'Law Blog', 'IPM Blog', 'CUET Blog']
    },
    {
      title: 'Popular Products',
      links: ['MBA', 'LAW', 'IPM', 'CUET', 'Tuitions', 'UPSC', 'Study Abroad']
    }
  ];

  return (
    <footer style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#1a2133' }}>

      {/* ── DESKTOP VIEW (hidden on mobile) ── */}
      <div className="desktop-footer" style={{ background: '#1e2a3a', padding: '48px 40px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48 }}>
          
          {/* Brand column - Desktop */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <img 
                src="https://www.careerlauncher.com/images/logo-white.png" 
                alt="Career Launcher Logo" 
                style={{ height: '45px', width: 'auto' }}
              />
            </div>
            <p style={{ color: '#8899aa', fontSize: 14, margin: '0 0 16px' }}>
              India&nbsp;&nbsp;|&nbsp;&nbsp;Dubai&nbsp;&nbsp;|&nbsp;&nbsp;Singapore
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#111c2b', border: '1px solid #2d3f55', borderRadius: 8, padding: '8px 16px', textDecoration: 'none', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3.5L13.5 12 3 20.5V3.5Z" fill="#00d084"/>
                  <path d="M3 3.5L13.5 12 8 17.5 3 20.5V3.5Z" fill="#0096ff" opacity="0.7"/>
                  <path d="M13.5 12L20 8 21 12 20 16 13.5 12Z" fill="#ffcc00"/>
                  <path d="M3 20.5L8 17.5 13.5 12 20 16 3 20.5Z" fill="#ff3366" opacity="0.9"/>
                </svg>
                <span style={{ color: '#cdd5e0', fontSize: 12 }}>Google Play</span>
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#111c2b', border: '1px solid #2d3f55', borderRadius: 8, padding: '8px 16px', textDecoration: 'none', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span style={{ color: '#cdd5e0', fontSize: 12 }}>App Store</span>
              </a>
            </div>
          </div>

          {/* Links columns - Desktop */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 20px' }}>{section.title}</h4>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link href="#" style={{ color: '#8899aa', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}>
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE VIEW (accordion style) ── */}
      <div className="mobile-footer" style={{ background: '#1e2a3a', padding: '24px 16px' }}>
        {/* Brand - Mobile */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img 
            src="https://www.careerlauncher.com/images/logo-white.png" 
            alt="Career Launcher Logo" 
            style={{ height: '38px', width: 'auto', marginBottom: 12 }}
          />
          <p style={{ color: '#8899aa', fontSize: 13, margin: '0 0 16px' }}>
            India | Dubai | Singapore
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#111c2b', border: '1px solid #2d3f55', borderRadius: 8, padding: '6px 12px', textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 3.5L13.5 12 3 20.5V3.5Z" fill="#00d084"/>
                <path d="M3 3.5L13.5 12 8 17.5 3 20.5V3.5Z" fill="#0096ff" opacity="0.7"/>
                <path d="M13.5 12L20 8 21 12 20 16 13.5 12Z" fill="#ffcc00"/>
                <path d="M3 20.5L8 17.5 13.5 12 20 16 3 20.5Z" fill="#ff3366" opacity="0.9"/>
              </svg>
              <span style={{ color: '#cdd5e0', fontSize: 10 }}>Play Store</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#111c2b', border: '1px solid #2d3f55', borderRadius: 8, padding: '6px 12px', textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span style={{ color: '#cdd5e0', fontSize: 10 }}>App Store</span>
            </a>
          </div>
        </div>

        {/* Accordion Sections - Mobile */}
        {footerSections.map((section) => (
          <div key={section.title} style={{ marginBottom: 12, borderBottom: '1px solid #2d3f55' }}>
            <button
              onClick={() => toggleSection(section.title)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600
              }}
            >
              {section.title}
              <span style={{ 
                transform: openSections[section.title] ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                display: 'inline-block'
              }}>
                ▼
              </span>
            </button>
            {openSections[section.title] && (
              <div style={{ paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {section.links.map((link) => (
                  <Link key={link} href="#" style={{ color: '#8899aa', fontSize: 14, textDecoration: 'none', display: 'block', padding: '4px 0' }}>
                    {link}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── BOTTOM SECTION (Business & Academic Verticals) ── */}
      <div style={{ background: '#141d2b', padding: '32px 20px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          
          {/* Desktop Verticals */}
          <div className="desktop-verticals" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, paddingBottom: 32 }}>
            {/* Business Verticals */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 10px' }}>Business Verticals</h4>
              <div style={{ width: 48, height: 2, background: '#e84c1e', marginBottom: 20 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px 24px' }}>
                {[
                  { name: 'GK Publications', sub: 'Books & Publication' },
                  { name: 'Kestone', sub: 'Marketing Services' },
                  { name: 'WAIN-Connect', sub: 'Academia-Industry Network' },
                ].map(item => (
                  <div key={item.name}>
                    <Link href="#" style={{ color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'block', marginBottom: 2 }}>
                      {item.name}
                    </Link>
                    <span style={{ color: '#6b7f99', fontSize: 12 }}>{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Verticals */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 10px' }}>Academic Verticals</h4>
              <div style={{ width: 48, height: 2, background: '#e84c1e', marginBottom: 20 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px 24px' }}>
                {[
                  { name: 'Law Entrance', sub: 'Coaching for CLAT AILET LSAT' },
                  { name: 'GATE Entrance', sub: 'Coaching for GATE IES PSU' },
                  { name: 'Futuremap', sub: 'Career Guidance' },
                ].map(item => (
                  <div key={item.name}>
                    <Link href="#" style={{ color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'block', marginBottom: 2 }}>
                      {item.name}
                    </Link>
                    <span style={{ color: '#6b7f99', fontSize: 12 }}>{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Verticals (Stacked) */}
          <div className="mobile-verticals" style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 28 }}>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>Business Verticals</h4>
              <div style={{ width: 40, height: 2, background: '#e84c1e', marginBottom: 16 }} />
              {[
                { name: 'GK Publications', sub: 'Books & Publication' },
                { name: 'Kestone', sub: 'Marketing Services' },
                { name: 'WAIN-Connect', sub: 'Academia-Industry Network' },
              ].map(item => (
                <div key={item.name} style={{ marginBottom: 16 }}>
                  <Link href="#" style={{ color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'block', marginBottom: 4 }}>
                    {item.name}
                  </Link>
                  <span style={{ color: '#6b7f99', fontSize: 12 }}>{item.sub}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>Academic Verticals</h4>
              <div style={{ width: 40, height: 2, background: '#e84c1e', marginBottom: 16 }} />
              {[
                { name: 'Law Entrance', sub: 'Coaching for CLAT AILET LSAT' },
                { name: 'GATE Entrance', sub: 'Coaching for GATE IES PSU' },
                { name: 'Futuremap', sub: 'Career Guidance' },
              ].map(item => (
                <div key={item.name} style={{ marginBottom: 16 }}>
                  <Link href="#" style={{ color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'block', marginBottom: 4 }}>
                    {item.name}
                  </Link>
                  <span style={{ color: '#6b7f99', fontSize: 12 }}>{item.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div style={{ 
            borderTop: '1px solid #232f42', 
            padding: '16px 0', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            textAlign: 'center'
          }}>
            <Link href="#" style={{ color: '#8899aa', fontSize: 12, textDecoration: 'none' }}>
              Privacy Policy &amp; Terms of Sale
            </Link>
            <span style={{ color: '#8899aa', fontSize: 12 }}>© CL Educate Ltd</span>
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop styles */
        @media (min-width: 768px) {
          .mobile-footer, .mobile-verticals {
            display: none !important;
          }
          .desktop-footer, .desktop-verticals {
            display: block !important;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 767px) {
          .desktop-footer, .desktop-verticals {
            display: none !important;
          }
          .mobile-footer, .mobile-verticals {
            display: block !important;
          }
        }
        
        a:hover {
          color: #e84c1e !important;
        }
        
       
      `}</style>
    </footer>
  );
};

export default Footer;