'use client';

import React from 'react';

const GetInTouch = () => {
  const handleStartNow = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{ width: '100%', background: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>

        {/* Title - Mobile Responsive */}
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: 'clamp(24px, 6vw, 32px)', 
          fontWeight: 700, 
          color: '#111', 
          margin: '0 0 8px' 
        }}>
          Get in touch
        </h2>

        {/* Subtitle - Mobile Responsive */}
        <p style={{ 
          textAlign: 'center', 
          color: '#444', 
          fontSize: 'clamp(13px, 4vw, 15px)', 
          margin: '0 0 24px' 
        }}>
          Please connect for exciting offers – <strong>9226342428</strong>
        </p>

        {/* Two column layout - Mobile: column, Desktop: row */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 24,
          alignItems: 'stretch'
        }}>
          
          {/* Media query for desktop */}
          <style>{`
            @media (min-width: 768px) {
              .getintouch-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 32px !important;
                align-items: start !important;
              }
            }
          `}</style>
          
          <div className="getintouch-grid" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* ── LEFT: Map ── */}
            <div style={{ 
              borderRadius: 12, 
              overflow: 'hidden', 
              border: '1px solid #e5e7eb', 
              height: 'auto',
              minHeight: 280,
              aspectRatio: '4/3'
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

            {/* ── RIGHT: Contact Info ── */}
            <div style={{ 
              background: '#fff', 
              border: '1px solid #e5e7eb', 
              borderRadius: 12, 
              padding: '20px 16px'
            }}>

              {/* Heading */}
              <h3 style={{ 
                fontSize: 'clamp(18px, 5vw, 20px)', 
                fontWeight: 700, 
                color: '#111', 
                margin: '0 0 16px', 
                borderBottom: '1px solid #f0f0f0', 
                paddingBottom: 12 
              }}>
                CL Center@Pune – Undri :
              </h3>

              {/* Time + Name row - Mobile: column, Desktop: row */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 16,
                marginBottom: 20 
              }}>
                <div className="time-name-row" style={{ display: 'flex', gap: 20 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 12, marginBottom: 4 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      Time
                    </div>
                    <p style={{ fontWeight: 600, color: '#111', fontSize: 'clamp(14px, 4vw, 15px)', margin: 0 }}>9AM – 7PM</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 12, marginBottom: 4 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      Name
                    </div>
                    <p style={{ fontWeight: 600, color: '#111', fontSize: 'clamp(14px, 4vw, 15px)', margin: 0 }}>Mashood Khan</p>
                  </div>
                </div>
              </div>

              {/* Mobile - Column layout for contact items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Mobile */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 12, marginBottom: 4 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                    Mobile Number
                  </div>
                  <a href="tel:919226342428" style={{ color: '#e84c1e', fontWeight: 600, fontSize: 'clamp(14px, 4vw, 15px)', textDecoration: 'none', wordBreak: 'break-all' }}>
                    91-9226342428
                  </a>
                </div>

                {/* Email */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 12, marginBottom: 4 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Email Address
                  </div>
                  <a href="mailto:pune.undri@careerlauncher.com" style={{ color: '#e84c1e', fontWeight: 500, fontSize: 'clamp(13px, 3.5vw, 15px)', textDecoration: 'none', wordBreak: 'break-all' }}>
                    pune.undri@careerlauncher.com
                  </a>
                </div>

                {/* Address */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 12, marginBottom: 4 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Address
                  </div>
                  <p style={{ color: '#222', fontSize: 'clamp(13px, 3.5vw, 14px)', lineHeight: 1.5, margin: 0 }}>
                    Office No 207, 2nd Floor, Undri City Center Mall, Undri, Pune, Maharashtra 411060
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SLIM CTA Banner - Mobile Responsive ── */}
      <div style={{
        background: '#e84c1e',
        padding: '16px 20px',
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
            fontSize: 'clamp(16px, 4.5vw, 18px)', 
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
              borderRadius: 8,
              padding: '10px 28px',
              fontSize: 'clamp(13px, 3.5vw, 14px)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              minWidth: '120px'
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

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .getintouch-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .time-name-row {
            flex-direction: row !important;
          }
        }
        
        @media (max-width: 767px) {
          .getintouch-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .time-name-row {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default GetInTouch;