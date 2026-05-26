'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
  const programs = [
    {
      title: "CLASS-8",
      description: "Build strong academic foundations and develop early problem-solving skills.",
      tag: "Ideal for: Class 8 Students",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-8&rt=microsite&rl=1424"
    },
    {
      title: "CLASS-9",
      description: "Structured preparation programs to strengthen concepts and improve academic performance.",
      tag: "Ideal for: Class 9 Students",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-9&rt=microsite&rl=1424"
    },
    {
      title: "CLASS-10",
      description: "Focused preparation to excel in board exams while building competitive exam readiness.",
      tag: "Ideal for: Class 10 Students",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-10&rt=microsite&rl=1424"
    },
    {
      title: "CLASS-11",
      description: "Begin structured preparation for competitive exams with concept clarity and strategy.",
      tag: "Ideal for: Class 11 Students",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-11&rt=microsite&rl=1424"
    },
    {
      title: "CLASS-12",
      description: "Comprehensive programs for board exams along with entrance preparation support.",
      tag: "Ideal for: Class 12 Students",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=CLASS-12&rt=microsite&rl=1424"
    },
    {
      title: "BBA/IPM",
      description: "Specialized coaching programs for IPM & BBA entrance exams.",
      tag: "Ideal for: After 12th Students",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=BBA/IPM&rt=microsite&rl=1424"
    },
    {
      title: "LAW",
      description: "Expert coaching for CLAT & AILET with proven results.",
      tag: "Ideal for: Law Aspirants",
      link: "https://www.careerlauncher.com/cl-online/product-category.jsp?prodCat=LAW&rt=microsite&rl=1424"
    }
  ];

  const LOGO_URL = "/images/logo.png";

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToForm = () => {
    const formSection = document.querySelector('.form-box');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* ABOUT - UPGRADED TEXT UI */}
          <div className="mb-12">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                About Career Launcher Pune – Undri
              </h2>
              <div className="w-16 h-1 bg-[#e85222] rounded-full"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-4xl leading-relaxed mt-5">
              Career Launcher Pune – Undri offers structured coaching programs for <span className="font-semibold text-gray-800">CAT, CLAT, IPMAT</span>, and school academics.
              Our approach focuses on building strong fundamentals, improving problem-solving ability, and guiding students
              through a disciplined and result-oriented preparation journey.
            </p>
          </div>

          {/* TRUST - UPGRADED TEXT UI */}
          <div className="flex flex-wrap gap-5 mb-12">
            <span className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-[#e85222]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Trusted by 10,000+ Students
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-[#e85222]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              Proven Results
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-[#e85222]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
              Pune (Undri Center)
            </span>
          </div>

          {/* TITLE - UPGRADED TEXT UI */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Programs Offered
              </h2>
              <div className="w-16 h-1 bg-[#e85222] rounded-full mx-auto"></div>
            </div>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto mt-5">
              Explore programs designed for different academic stages and competitive exam goals.
            </p>
          </div>

          {/* GRID - Slightly larger cards */}
          <div className="flex justify-center">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
            >
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="group w-[300px] bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
                >
                  {/* Card Header */}
                  <div className="bg-gray-50 p-5 border-b border-gray-100">
                    {/* Bookmark Icon */}
                    <div className="flex justify-end mb-3">
                      <div className="text-gray-400 opacity-60 hover:opacity-100 cursor-pointer transition">
                        <svg height={14} width={14} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
                          <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                      {program.title}
                    </h3>
                    
                    {/* Tag Badge */}
                    <span className="inline-block text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {program.tag}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 min-h-[85px]">
                      {program.description}
                    </p>

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 mb-4 pt-2 border-t border-gray-100">
                      <div className="w-9 h-9 bg-white rounded-md shadow-sm flex items-center justify-center overflow-hidden relative border border-gray-100 flex-shrink-0">
                        <Image 
                          src={LOGO_URL}
                          alt="Career Launcher Logo"
                          width={32}
                          height={32}
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Career Launcher</p>
                        <p className="text-xs text-gray-400">Pune (Undri)</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleClick(program.link)}
                      className="w-full bg-[#e85222] text-white font-semibold text-sm py-2.5 px-3 rounded-md hover:bg-[#cf4118] transition-all mt-auto"
                    >
                      Get Details →
                    </button>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-0.5 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* FINAL CTA - UPGRADED TEXT UI */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Not sure which program is right for you?
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                Our academic counselors will help you find the perfect fit
              </p>
              <button 
                onClick={scrollToForm}
                className="bg-[#e85222] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#cf4118] transition-all hover:shadow-md inline-flex items-center gap-2"
              >
                Book Free Counselling
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default AboutSection;