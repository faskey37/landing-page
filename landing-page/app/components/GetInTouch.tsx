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
    <section className="w-full font-sans">

      {/* 🔥 DESKTOP SECTION */}
      <div className="hidden md:block relative h-[560px] lg:h-[620px] overflow-hidden">

        {/* 🌍 MAP WITH PADDING */}
        <div className="absolute inset-0 p-4 md:p-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15138.437870613532!2d73.9130782!3d18.4560326!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb3ad7a249db%3A0x66d1d9a8558708c5!2sCareer%20Launcher%20Pune%20Undri!5e0!3m2!1sen!2sin!4v1730967737512!5m2!1sen!2sin"
            className="w-full h-full border-0 rounded-2xl"
            loading="lazy"
          />
        </div>

        {/* 🌫️ LIGHT GRADIENT (NON-BLOCKING) */}
        <div className="absolute right-0 top-0 h-full w-[40%] bg-gradient-to-l from-white/70 to-transparent pointer-events-none" />

        {/* 🧊 RIGHT SIDE CARD */}
        <div className="relative z-10 flex items-center justify-end h-full px-6 lg:px-16">

          <div className="
            w-[320px] md:w-[360px]
            bg-white/80 backdrop-blur-xl
            border border-gray-200
            rounded-2xl
            p-6 md:p-7
            text-gray-900
            shadow-[0_30px_80px_rgba(0,0,0,0.15)]
          ">

            <h2 className="text-xl font-semibold mb-2">
              Visit Our Center
            </h2>

            <p className="text-sm text-gray-600 mb-5">
              Career Launcher Pune – Undri
            </p>

            <div className="space-y-4 text-sm">

              <div>
                <p className="text-gray-500 text-xs">Working Hours</p>
                <p className="font-medium">9 AM – 7 PM</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Contact</p>
                <a
                  href="tel:919226342428"
                  className="font-semibold text-orange-500 hover:text-orange-600 transition"
                >
                  +91 92263 42428
                </a>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Email</p>
                <p className="text-sm break-words">
                  pune.undri@careerlauncher.com
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Address</p>
                <p className="text-sm leading-relaxed">
                  Office No 207, 2nd Floor, Undri City Center Mall, Undri, Pune
                </p>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="mt-6 space-y-3">

              <a
                href="https://maps.google.com/?q=Career+Launcher+Pune+Undri"
                target="_blank"
                className="block text-center border border-gray-300 py-2.5 rounded-full text-sm hover:bg-gray-100 transition"
              >
                Get Directions
              </a>

              <button
                onClick={handleStartNow}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition"
              >
                Book Free Counselling
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* 📱 MOBILE VERSION */}
      <div className="md:hidden px-4 py-8">

        <h2 className="text-2xl font-semibold text-center mb-2">
          Get in Touch
        </h2>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Call us for assistance – <strong>9226342428</strong>
        </p>

        <div className="rounded-xl overflow-hidden border mb-6 h-[220px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15138.437870613532!2d73.9130782!3d18.4560326!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb3ad7a249db%3A0x66d1d9a8558708c5!2sCareer%20Launcher%20Pune%20Undri!5e0!3m2!1sen!2sin!4v1730967737512!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

        <div className="space-y-3 text-sm">

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-500 text-xs">Working Hours</p>
            <p className="font-medium">9AM – 7PM</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-500 text-xs">Contact</p>
            <a href="tel:919226342428" className="text-orange-500 font-semibold">
              +91 92263 42428
            </a>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-500 text-xs">Address</p>
            <p className="text-sm">
              Undri City Center Mall, Pune
            </p>
          </div>

        </div>

        <button
          onClick={handleStartNow}
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-full font-semibold"
        >
          Book Free Counselling
        </button>
      </div>

      {/* 🔥 CTA BANNER */}
      <div className="bg-[#e84c1e] text-center py-6 px-4">
        <h3 className="text-white text-lg font-semibold mb-3">
          Book Your FREE Counselling Session Today!
        </h3>
        <button
          onClick={handleStartNow}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Start Now →
        </button>
      </div>

    </section>
  );
};

export default GetInTouch;