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
    <section style={{ width: '100%', background: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      
      {/* ── DESKTOP VIEW ── */}
      <div className="desktop-view" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: 32, 
          fontWeight: 700, 
          color: '#111', 
          margin: '0 0 8px' 
        }}>
          Get in touch
        </h2>

        <p style={{ 
          textAlign: 'center', 
          color: '#444', 
          fontSize: 15, 
          margin: '0 0 36px' 
        }}>
          Please connect for exciting offers – <strong>9226342428</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
          {/* Map */}
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', height: 450 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15138.437870613532!2d73.9130782!3d18.4560326!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb3ad7a249db%3A0x66d1d9a8558708c5!2sCareer%20Launcher%20Pune%20Undri!5e0!3m2!1sen!2sin!4v1730967737512!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Info Card */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '28px 24px' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 24px', borderBottom: '1px solid #f0f0f0', paddingBottom: 14 }}>
              CL Center@Pune – Undri :
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, marginBottom: 4 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Time
                </div>
                <p style={{ fontWeight: 600, color: '#111', fontSize: 15, margin: 0 }}>9AM – 7PM</p>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, marginBottom: 4 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Name
                </div>
                <p style={{ fontWeight: 600, color: '#111', fontSize: 15, margin: 0 }}>Mashood Khan</p>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, marginBottom: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                Mobile Number
              </div>
              <a href="tel:919226342428" style={{ color: '#e84c1e', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                91-9226342428
              </a>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, marginBottom: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email Address
              </div>
              <a href="mailto:pune.undri@careerlauncher.com" style={{ color: '#e84c1e', fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>
                pune.undri@careerlauncher.com
              </a>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, marginBottom: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Address
              </div>
              <p style={{ color: '#222', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Office No 207, 2nd Floor, Undri City Center Mall, Undri, Pune, Maharashtra 411060
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE VIEW (Card-based layout) ── */}
      <div className="mobile-view" style={{ padding: '24px 16px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: 26, 
          fontWeight: 700, 
          color: '#111', 
          margin: '0 0 8px' 
        }}>
          Get in touch
        </h2>

        <p style={{ 
          textAlign: 'center', 
          color: '#444', 
          fontSize: 14, 
          margin: '0 0 24px' 
        }}>
          Please connect for exciting offers – <strong>9226342428</strong>
        </p>

        {/* Map Card */}
        <div style={{ 
          borderRadius: 16, 
          overflow: 'hidden', 
          border: '1px solid #e5e7eb', 
          marginBottom: 20,
          height: 220
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15138.437870613532!2d73.9130782!3d18.4560326!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb3ad7a249db%3A0x66d1d9a8558708c5!2sCareer%20Launcher%20Pune%20Undri!5e0!3m2!1sen!2sin!4v1730967737512!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Contact Info Cards - Mobile Optimized */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Time Card */}
          <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: '#e84c1e10', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e84c1e" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#666', margin: 0 }}>Working Hours</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#111', margin: 0 }}>9AM – 7PM</p>
            </div>
          </div>

          {/* Name Card */}
          <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: '#e84c1e10', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e84c1e" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#666', margin: 0 }}>Center Head</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#111', margin: 0 }}>Mashood Khan</p>
            </div>
          </div>

          {/* Phone Card */}
          <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: '#e84c1e10', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e84c1e" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#666', margin: 0 }}>Mobile Number</p>
              <a href="tel:919226342428" style={{ fontSize: 15, fontWeight: 600, color: '#e84c1e', textDecoration: 'none' }}>91-9226342428</a>
            </div>
          </div>

          {/* Email Card */}
          <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: '#e84c1e10', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e84c1e" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#666', margin: 0 }}>Email Address</p>
              <a href="mailto:pune.undri@careerlauncher.com" style={{ fontSize: 13, fontWeight: 500, color: '#e84c1e', textDecoration: 'none', wordBreak: 'break-all' }}>
                pune.undri@careerlauncher.com
              </a>
            </div>
          </div>

          {/* Address Card */}
          <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: '#e84c1e10', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e84c1e" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#666', margin: 0 }}>Address</p>
              <p style={{ fontSize: 13, color: '#222', lineHeight: 1.5, margin: 0 }}>
                Office No 207, 2nd Floor, Undri City Center Mall, Undri, Pune, Maharashtra 411060
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA Banner (Same for both, but responsive) ── */}
      <div style={{
        background: '#e84c1e',
        padding: 'clamp(16px, 4vw, 20px) clamp(20px, 5vw, 40px)',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
        }}>
          <h3 style={{ 
            color: '#fff', 
            fontSize: 'clamp(16px, 4.5vw, 20px)', 
            fontWeight: 600, 
            margin: 0, 
            letterSpacing: '-0.3px',
            textAlign: 'center'
          }}>
            Book Your FREE Counselling Session Today!
          </h3>
          <button 
            onClick={handleStartNow}
            style={{
              background: '#fff',
              color: '#111',
              border: 'none',
              borderRadius: 30,
              padding: '12px 32px',
              fontSize: 'clamp(13px, 3.5vw, 15px)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '140px'
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseOut={e => (e.currentTarget.style.background = '#fff')}
            onTouchStart={e => (e.currentTarget.style.background = '#f5f5f5')}
            onTouchEnd={e => (e.currentTarget.style.background = '#fff')}
          >
            Start Now →
          </button>
        </div>
      </div>

      <style>{`
        /* Desktop styles */
        @media (min-width: 768px) {
          .desktop-view {
            display: block !important;
          }
          .mobile-view {
            display: none !important;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 767px) {
          .desktop-view {
            display: none !important;
          }
          .mobile-view {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};

export default GetInTouch;