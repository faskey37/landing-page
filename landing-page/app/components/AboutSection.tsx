'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const programs = [
    {
      title: "CLASS-8",
      description: "Build strong academic foundations and develop early problem-solving skills.",
      tag: "Ideal for: Class 8 Students",
      link: "#"
    },
    {
      title: "CLASS-9",
      description: "Structured preparation programs to strengthen concepts and improve academic performance.",
      tag: "Ideal for: Class 9 Students",
      link: "#"
    },
    {
      title: "CLASS-10",
      description: "Focused preparation to excel in board exams while building competitive exam readiness.",
      tag: "Ideal for: Class 10 Students",
      link: "#"
    },
    {
      title: "CLASS-11",
      description: "Begin structured preparation for competitive exams with concept clarity and strategy.",
      tag: "Ideal for: Class 11 Students",
      link: "#"
    },
    {
      title: "CLASS-12",
      description: "Comprehensive programs for board exams along with entrance preparation support.",
      tag: "Ideal for: Class 12 Students",
      link: "#"
    },
    {
      title: "BBA/IPM",
      description: "Specialized coaching programs for IPM & BBA entrance exams.",
      tag: "Ideal for: After 12th Students",
      link: "#"
    },
    {
      title: "LAW",
      description: "Expert coaching for CLAT & AILET with proven results.",
      tag: "Ideal for: Law Aspirants",
      link: "#"
    }
  ];

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 🔥 Animation configs
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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔥 SECTION FADE */}
        <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true, margin: "-100px" }}
  className="py-16 bg-gradient-to-b from-gray-50 to-gray-200"
>

          {/* ABOUT */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              About Career Launcher Pune – Undri
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
              Career Launcher Pune – Undri offers structured coaching programs for CAT, CLAT, IPMAT, and school academics.
              Our approach focuses on building strong fundamentals, improving problem-solving ability, and guiding students
              through a disciplined and result-oriented preparation journey.
            </p>
          </div>

          {/* TRUST */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-10">
            <span>⭐ Trusted by 10,000+ Students</span>
            <span>🏆 Proven Results</span>
            <span>📍 Pune (Undri Center)</span>
          </div>

          {/* TITLE */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Programs Offered
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Explore programs designed for different academic stages and competitive exam goals.
            </p>
          </div>

          {/* 🔥 GRID WITH STAGGER */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={item}
                className="
                  bg-white rounded-2xl p-6 
                  border border-gray-100
                  shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                  hover:-translate-y-2 
                  transition-transform duration-300 ease-out
                "
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)"
                }}
              >
                {/* Accent */}
                <div className="w-10 h-1 bg-orange-500 rounded-full mb-4"></div>

                <h3 className="text-xl font-bold text-black mb-2">
                  {program.title}
                </h3>

                <p className="text-xs text-orange-600 font-medium mb-2">
                  {program.tag}
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {program.description}
                </p>

                <button
                  onClick={() => handleClick(program.link)}
                  className="text-[#e85222] font-semibold hover:underline"
                >
                  Get Details →
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* FINAL CTA */}
          <div className="text-center mt-14">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Not sure which program is right for you?
            </h3>
            <button className="bg-[#e85222] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#cf4118] transition">
              Book Free Counselling
            </button>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default AboutSection;