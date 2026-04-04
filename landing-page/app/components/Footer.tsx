'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#1a2133' }}>

      {/* ── Top section ── */}
      <div style={{ background: '#1e2a3a', padding: '48px 40px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 40 }}>

          {/* Brand column */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              
              <div>
                <img src="https://www.careerlauncher.com/images/logo-white.png" alt="Career Launcher Logo" />
              </div>
            </div>

            <p style={{ color: '#8899aa', fontSize: 13, margin: '0 0 14px' }}>
              India&nbsp;&nbsp;|&nbsp;&nbsp;Dubai&nbsp;&nbsp;|&nbsp;&nbsp;Singapore
            </p>

            {/* App store badges */}
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#111c2b', border: '1px solid #2d3f55', borderRadius: 6, padding: '5px 10px', textDecoration: 'none' }}>
                {/* Play Store icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3.5L13.5 12 3 20.5V3.5Z" fill="#00d084"/>
                  <path d="M3 3.5L13.5 12 8 17.5 3 20.5V3.5Z" fill="#0096ff" opacity="0.7"/>
                  <path d="M13.5 12L20 8 21 12 20 16 13.5 12Z" fill="#ffcc00"/>
                  <path d="M3 20.5L8 17.5 13.5 12 20 16 3 20.5Z" fill="#ff3366" opacity="0.9"/>
                </svg>
                <span style={{ color: '#cdd5e0', fontSize: 11 }}>Google Play</span>
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#111c2b', border: '1px solid #2d3f55', borderRadius: 6, padding: '5px 10px', textDecoration: 'none' }}>
                {/* App Store icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span style={{ color: '#cdd5e0', fontSize: 11 }}>App Store</span>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>

            {/* Contact Us */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 16px' }}>Contact Us</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Corporate Contacts', 'Customer Support'].map(l => (
                  <li key={l}><Link href="#" style={{ color: '#8899aa', fontSize: 13, textDecoration: 'none' }}>{l}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company — 2 sub-columns */}
            <div style={{ gridColumn: 'span 1' }}>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 16px' }}>Company</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                {['About Us', 'Our Results', 'Our Centers', 'Partner with us', 'Careers at CL', 'Board of Directors', 'Management Team', 'Media Coverage'].map(l => (
                  <Link key={l} href="#" style={{ color: '#8899aa', fontSize: 13, textDecoration: 'none', display: 'block' }}>{l}</Link>
                ))}
              </div>
            </div>

            {/* Follow us — 2 sub-columns */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 16px' }}>Follow us on Social</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                {['Discord', 'Facebook', 'Instagram', 'Linkedin', 'Quora', 'Twitter', 'YouTube', 'MBA Blog', 'Law Blog', 'IPM Blog', 'CUET Blog', ''].map((l, i) => (
                  l ? <Link key={i} href="#" style={{ color: '#8899aa', fontSize: 13, textDecoration: 'none', display: 'block' }}>{l}</Link>
                    : <span key={i} />
                ))}
              </div>
            </div>

            {/* Popular Products — 2 sub-columns */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 16px' }}>Popular Products</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                {['MBA', 'LAW', 'IPM', 'CUET', 'Tuitions', 'UPSC', 'Study Abroad', ''].map((l, i) => (
                  l ? <Link key={i} href="#" style={{ color: '#8899aa', fontSize: 13, textDecoration: 'none', display: 'block' }}>{l}</Link>
                    : <span key={i} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom section ── */}
      <div style={{ background: '#141d2b', padding: '36px 40px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, paddingBottom: 32 }}>

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
                    <Link href="#" style={{ color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'block', marginBottom: 2 }}>{item.name}</Link>
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
                    <Link href="#" style={{ color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'block', marginBottom: 2 }}>{item.name}</Link>
                    <span style={{ color: '#6b7f99', fontSize: 12 }}>{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Copyright bar */}
          <div style={{ borderTop: '1px solid #232f42', padding: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <Link href="#" style={{ color: '#8899aa', fontSize: 13, textDecoration: 'none' }}>Privacy Policy &amp; Terms of Sale</Link>
            <span style={{ color: '#8899aa', fontSize: 13 }}>© CL Educate Ltd</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;