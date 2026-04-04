// app/components/AboutSection.tsx
'use client';

import React from 'react';

const AboutSection = () => {
  const programs = [
    {
      title: "CLASS-8",
      description: "CLASS 8, Make your preparation convenient and complete",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-8&rt=microsite&rl=1424"
    },
    {
      title: "CLASS-9",
      description: "CLASS 9, Special programs to Fasttrack student's journey towards success",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-9&rt=microsite&rl=1424"
    },
    {
      title: "CLASS-10",
      description: "CLASS 10, Special programs to Fasttrack student's journey towards success",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-10&rt=microsite&rl=1424"
    },
    {
      title: "CLASS-11",
      description: "CLASS 11, Special programs to Fasttrack student's journey towards success",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-11&rt=microsite&rl=1424"
    },
    {
      title: "CLASS-12",
      description: "CLASS 12, Special programs to Fasttrack student's journey towards success",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-12&rt=microsite&rl=1424"
    },
    {
      title: "TUITIONS",
      description: "Over 50+ programs to make your preparation convenient and complete",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=TUITIONS&rt=microsite&rl=1424"
    },
    {
      title: "BBA/IPM",
      description: "IPM/BBA Coaching Programs, We have varieties of programs to make your preparation convenient and complete.",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=BBA/IPM&rt=microsite&rl=1424"
    },
    {
      title: "LAW",
      description: "Law Coaching Programs, Leaders in law entrance exams coaching with 6/10 Top ranks in CLAT25 | 5/10 Top ranks in AILET25. Enroll with us and ace all law entrance exams!",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=LAW&rt=microsite&rl=1424"
    }
  ];

  const handleReadMore = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About the Center Section - Left Aligned */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-left">
            About the Center: Pune - Undri
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl leading-relaxed text-left">
            CL Pune – Undri Center provides extensive training programs for students. Every program is designed in such a way that it nurtures students from scratch and prepares them systematically to pursue their dreams.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-12"></div>

        {/* Programs Offered Section - Centered */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Programs Offered at Pune – Undri
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We provide extensive training programs for students. Every program is designed in such a way that it nurtures students from scratch and prepares them systematically to pursue their dreams. Career Launcher Pune – Undri offers the following training programs.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-black">
                  {program.title}
                </h3>
                {/* Black and white icon */}
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {program.description}
              </p>
              <button 
                onClick={() => handleReadMore(program.link)}
                className="text-gray-900 font-semibold hover:text-gray-600 transition-colors flex items-center gap-2 group"
              >
                Read More 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .grid > div {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .grid > div:nth-child(1) { animation-delay: 0.1s; }
        .grid > div:nth-child(2) { animation-delay: 0.2s; }
        .grid > div:nth-child(3) { animation-delay: 0.3s; }
        .grid > div:nth-child(4) { animation-delay: 0.4s; }
        .grid > div:nth-child(5) { animation-delay: 0.5s; }
        .grid > div:nth-child(6) { animation-delay: 0.6s; }
        .grid > div:nth-child(7) { animation-delay: 0.7s; }
        .grid > div:nth-child(8) { animation-delay: 0.8s; }
      `}</style>
    </section>
  );
};

export default AboutSection;