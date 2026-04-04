'use client';

import React from 'react';

const GetInTouch = () => {
  return (
    <section style={{ width: '100%', background: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>

        {/* Title */}
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, color: '#111', margin: '0 0 8px' }}>
          Get in touch
        </h2>

        {/* Subtitle */}
        <p style={{ textAlign: 'center', color: '#444', fontSize: 15, margin: '0 0 36px' }}>
          Please connect for exciting offers – <strong>9226342428</strong>
        </p>

        {/* Two column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>

          {/* ── LEFT: Map ── */}
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e5e7eb', height: 480 }}>
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
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '32px 28px' }}>

            {/* Heading */}
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 24px', borderBottom: '1px solid #f0f0f0', paddingBottom: 14 }}>
              CL Center@Pune – Undri :
            </h3>

            {/* Time + Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
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

            {/* Mobile */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, marginBottom: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                Mobile Number
              </div>
              <a href="tel:919226342428" style={{ color: '#e84c1e', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                91-9226342428
              </a>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, marginBottom: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email Address
              </div>
              <a href="mailto:pune.undri@careerlauncher.com" style={{ color: '#e84c1e', fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>
                pune.undri@careerlauncher.com
              </a>
            </div>

            {/* Address */}
            <div style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 13, marginBottom: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Address
              </div>
              <p style={{ color: '#222', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Office No 207, 2nd Floor, Undri City Center Mall, Undri,<br />
                Pune, Maharashtra 411060
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SLIM CTA Banner ── */}
      <div style={{
        background: '#e84c1e',
        padding: '12px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: '-0.3px' }}>
            Book Your FREE Counselling Session Today!
          </h3>
          <button style={{
            background: '#fff',
            color: '#111',
            border: 'none',
            borderRadius: 6,
            padding: '6px 24px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.15s',
            whiteSpace: 'nowrap',
          }}
            onMouseOver={e => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseOut={e => (e.currentTarget.style.background = '#fff')}
          >
            Start Now
          </button>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .git-grid { grid-template-columns: 1fr !important; }
          .git-map { height: 300px !important; }
        }
      `}</style>
    </section>
  );
};

export default GetInTouch;