'use client';

import React, { useState } from 'react';

const classroomBatches = [
  { title: 'IPM Express Classroom (2026)', batch: 'SUN, MON, TUE, WED, THU, FRI, SAT (10:00 - 14:00)', batchId: '390405', price: '₹ 35400', category: 'after12' },
  { title: 'IPM Plus (2027)', batch: 'Saturday(10:00 - 14:00), Sunday(10:00 - 14:00)', batchId: '390406', price: '₹ 70000', category: 'after12' },
  { title: 'IPM Plus (2028)', batch: 'Saturday(10:00 - 13:00), Sunday(10:00 - 13:00)', batchId: '384078', price: '₹ 70000', category: 'after12' },
  { title: 'LST Plus (2027)', batch: 'Saturday(10:00 - 14:00), Sunday(10:00 - 14:00)', batchId: '390408', price: '₹ 72135', category: 'lst' },
  { title: 'LST Span (2028)', batch: 'Saturday(10:00 - 14:00), Sunday(10:00 - 14:00)', batchId: '391013', price: '₹ 121085', category: 'lst' },
  { title: 'Class VIIIth Tuition Program (2025)', batch: '–', batchId: '', price: '–', category: 'all' },
  { title: 'Class IX Classroom Program (2026)', batch: '–', batchId: '', price: '–', category: 'all' },
  { title: 'Class X Classroom Tuition (2026)', batch: '–', batchId: '', price: '–', category: 'all' },
];

const onlineBatches = [
  { title: 'Secrets Behind Faster Calculations - IPM/BBA', year: '2026', price: '₹ 2000', originalPrice: null },
  { title: 'GRE Self Paced Program', year: '2025', price: '₹ 15000', originalPrice: null },
  { title: 'CLAT 2028 Online Classes', year: '2028', price: '₹ 120000', originalPrice: '₹ 145000' },
  { title: 'LAW 2028 Online Classes', year: '2028', price: '₹ 135000', originalPrice: '₹ 160000' },
  { title: 'Boards + CUET Online 2025', year: '2025', price: '–', originalPrice: null },
  { title: 'CUET Span Online (2026)', year: '2026', price: '–', originalPrice: null },
];

const BatchDetails = () => {
  const [activeTab, setActiveTab] = useState<'classroom' | 'online'>('classroom');
  const [activeFilter, setActiveFilter] = useState<'all' | 'after12' | 'lst'>('all');

  const batches = activeTab === 'classroom' ? classroomBatches : onlineBatches;
  const filtered = activeTab === 'classroom'
    ? (batches as typeof classroomBatches).filter(b =>
        activeFilter === 'all' ? true : b.category === activeFilter
      )
    : batches;

  const handleEnroll = (title: string) => {
    window.open('https://www.careerlauncher.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 md:mb-8 text-left">
          Batch Details at Pune - Undri
        </h2>

        {/* ======================================== */}
        {/* DESKTOP VIEW (Table layout) */}
        {/* ======================================== */}
        <div className="hidden md:block">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-gray-300 mb-6">
            <div className="flex">
              {(['classroom', 'online'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setActiveFilter('all'); }}
                  className={`px-6 py-3 text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? 'border-b-2 border-[#e85222] text-[#e85222]'
                      : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                  }`}
                >
                  {tab === 'classroom' ? 'Classroom Product' : 'Online Product'}
                </button>
              ))}
            </div>

            {/* Filter */}
            <div className="flex items-center gap-4 pb-2">
              <span className="text-sm text-gray-500 font-medium">Select Product Category</span>
              <div className="flex items-center gap-4">
                {([['all', 'All'], ['after12', 'AFTER-12'], ['lst', 'LST']] as const).map(([val, label]) => (
                  <label
                    key={val}
                    className="flex items-center gap-1.5 cursor-pointer text-sm"
                    style={{ color: activeFilter === val ? '#e85222' : '#666', fontWeight: activeFilter === val ? 600 : 400 }}
                    onClick={() => setActiveFilter(val)}
                  >
                    <span style={{
                      width: 14, height: 14, borderRadius: '50%', flexShrink: 0, display: 'inline-block',
                      border: `2px solid ${activeFilter === val ? '#e85222' : '#aaa'}`,
                      background: activeFilter === val ? '#e85222' : 'transparent',
                    }} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="mb-16 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product Title</th>
                    {activeTab === 'classroom'
                      ? <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Batch Description</th>
                      : <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Target Year</th>
                    }
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price (INR)</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'classroom' ? (
                    (filtered as typeof classroomBatches).length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-12 text-gray-400">No products available.</td></tr>
                    ) : (
                      (filtered as typeof classroomBatches).map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4 text-sm text-gray-800 font-medium align-top">{row.title}</td>
                          <td className="px-5 py-4 text-sm text-gray-700 align-top">
                            {row.batch !== '–' ? (
                              <div className="flex items-start gap-1.5">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                </svg>
                                <div>
                                  <div>{row.batch}</div>
                                  {row.batchId && <div className="text-xs text-gray-400 mt-0.5">ID: {row.batchId}</div>}
                                </div>
                              </div>
                            ) : <span className="text-gray-300">–</span>}
                          </td>
                          <td className="px-5 py-4 align-top">
                            {row.price !== '–'
                              ? <span className="text-sm font-bold text-gray-900">{row.price}</span>
                              : <span className="text-gray-400">Contact for Price</span>}
                          </td>
                          <td className="px-5 py-4 text-right align-top">
                            <button 
                              onClick={() => handleEnroll(row.title)}
                              className="bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
                            >
                              Enroll Now
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                  ) : (
                    onlineBatches.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-12 text-gray-400">No products available.Online</td></tr>
                    ) : (
                      onlineBatches.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4 text-sm text-gray-800 font-medium">{row.title}</td>
                          <td className="px-5 py-4 text-sm text-gray-700">{row.year}</td>
                          <td className="px-5 py-4">
                            {row.price !== '–' ? (
                              <div className="flex items-center gap-2 flex-wrap">
                                {row.originalPrice && <span className="text-xs text-gray-400 line-through">{row.originalPrice}</span>}
                                <span className="text-sm font-bold text-green-600">{row.price}</span>
                              </div>
                            ) : <span className="text-gray-400">Contact for Price</span>}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button 
                              onClick={() => handleEnroll(row.title)}
                              className="bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
                            >
                              Enroll Now
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ======================================== */}
        {/* MOBILE VIEW (Clean card layout) */}
        {/* ======================================== */}
        <div className="md:hidden">
          {/* Mobile Tabs - Full width */}
          <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
            {(['classroom', 'online'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setActiveFilter('all'); }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-[#e85222] text-white shadow-sm'
                    : 'text-gray-600 bg-transparent'
                }`}
              >
                {tab === 'classroom' ? 'Classroom' : 'Online'}
              </button>
            ))}
          </div>

          {/* Mobile Filter - Chip buttons */}
          {activeTab === 'classroom' && (
            <div className="mb-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {([['all', 'All Programs'], ['after12', 'After 12th'], ['lst', 'LST']] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setActiveFilter(val)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      activeFilter === val
                        ? 'bg-[#e85222] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Cards - Enroll button VISIBLE with orange background */}
          <div className="space-y-3 mb-12">
            {activeTab === 'classroom' ? (
              (filtered as typeof classroomBatches).length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-white rounded-xl">No products available.</div>
              ) : (
                (filtered as typeof classroomBatches).map((row, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    {/* Header with title and price */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-base font-bold text-gray-800 flex-1 pr-2">{row.title}</h3>
                      {row.price !== '–' ? (
                        <span className="text-lg font-bold text-[#e85222]">{row.price}</span>
                      ) : (
                        <span className="text-sm font-medium text-gray-400">Price on Request</span>
                      )}
                    </div>
                    
                    {/* Schedule Info */}
                    {row.batch !== '–' && (
                      <div className="mb-3 p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-start gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium">Schedule</p>
                            <p className="text-sm text-gray-700 mt-0.5">{row.batch}</p>
                            {row.batchId && <p className="text-xs text-gray-400 mt-1">Batch ID: {row.batchId}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Enroll Button - VISIBLE with orange background */}
                    <button 
                      onClick={() => handleEnroll(row.title)}
                      className="w-full bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-semibold py-3 rounded-xl transition-colors mt-2"
                    >
                      Enroll Now →
                    </button>
                  </div>
                ))
              )
            ) : (
              onlineBatches.map((row, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-bold text-gray-800 flex-1 pr-2">{row.title}</h3>
                    {row.price !== '–' ? (
                      <div className="text-right">
                        {row.originalPrice && (
                          <span className="text-xs text-gray-400 line-through block">{row.originalPrice}</span>
                        )}
                        <span className="text-lg font-bold text-green-600">{row.price}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-gray-400">Price on Request</span>
                    )}
                  </div>
                  
                  {/* Year Info */}
                  <div className="mb-3 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Target Exam Year</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">{row.year}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enroll Button - VISIBLE with orange background */}
                  <button 
                    onClick={() => handleEnroll(row.title)}
                    className="w-full bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-semibold py-3 rounded-xl transition-colors mt-2"
                  >
                    Enroll Now →
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Why Career Launcher */}
        <div className="mt-8 md:mt-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-6 text-left">
            Why Career Launcher?
          </h2>
          <div className="space-y-4 md:space-y-6">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              CL focuses on diverse segments of education across the learners of multiple age-groups. Led by a team of highly qualified professionals, including IIT-IM alumni, with a passion for excellence in education, since 1995, CL has been focusing on shaping the lives and careers of many students. Over these years, the CL brand has diversified and established itself as a recognized brand in education sector.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              At CL, we 'enable individuals to realize their potential and achieve their dreams'. This is our core ideology and is firmly grounded on our focus on academic excellence, technological innovation, and domain expertise built over years. We operate across a broad spectrum of segments in the education industry, including test preparation and vocational training.
            </p>
          </div>
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default BatchDetails;