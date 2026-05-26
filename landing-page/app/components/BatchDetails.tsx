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

        {/* Title Section - Upgraded */}
        <div className="mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Choose the Right Program for Your Goal
          </h2>
          <div className="w-12 h-1 bg-[#e85222] rounded-full mb-3"></div>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">
            Explore our comprehensive classroom and online programs designed specifically for 
            <span className="font-semibold text-gray-800"> CAT, CLAT & IPMAT</span> preparation. 
            Find the perfect batch that matches your learning style and schedule.
          </p>
        </div>

        {/* ======================================== */}
        {/* DESKTOP VIEW (Table layout) */}
        {/* ======================================== */}
        <div className="hidden md:block">
          {/* Tabs - Upgraded */}
          <div className="flex items-center justify-between border-b border-gray-200 mb-6">
            <div className="flex gap-1">
              {(['classroom', 'online'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setActiveFilter('all'); }}
                  className={`px-6 py-3 text-sm font-semibold transition-all duration-200 rounded-t-lg ${
                    activeTab === tab
                      ? 'bg-white text-[#e85222] border-b-2 border-[#e85222] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab === 'classroom' ? '🏛️ Classroom Programs' : '💻 Online Programs'}
                </button>
              ))}
            </div>

            {/* Filter - Upgraded */}
            <div className="flex items-center gap-4 pb-2">
              <span className="text-sm text-gray-500 font-medium">Filter by:</span>
              <div className="flex items-center gap-5">
                {([['all', 'All Programs'], ['after12', 'After 12th'], ['lst', 'LST']] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setActiveFilter(val)}
                    className={`text-sm font-medium transition-all duration-200 ${
                      activeFilter === val 
                        ? 'text-[#e85222]' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Table - Upgraded styling */}
          <div className="mb-16 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Program</th>
                    {activeTab === 'classroom'
                      ? <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule Details</th>
                      : <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Target Year</th>
                    }
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Investment</th>
                    <th className="px-5 py-4 w-32" />
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'classroom' ? (
                    (filtered as typeof classroomBatches).length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-12 text-gray-400">No programs available in this category.</td></tr>
                    ) : (
                      (filtered as typeof classroomBatches).map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors">
                          <td className="px-5 py-4">
                            <div className="text-sm font-semibold text-gray-800">{row.title}</div>
                           </td>
                          <td className="px-5 py-4">
                            {row.batch !== '–' ? (
                              <div className="flex items-start gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                </svg>
                                <div>
                                  <div className="text-sm text-gray-700">{row.batch}</div>
                                  {row.batchId && <div className="text-xs text-gray-400 mt-0.5">Batch ID: {row.batchId}</div>}
                                </div>
                              </div>
                            ) : <span className="text-sm text-gray-300">To be announced</span>}
                           </td>
                          <td className="px-5 py-4">
                            {row.price !== '–'
                              ? <span className="text-sm font-bold text-gray-900">{row.price}</span>
                              : <span className="text-sm text-gray-400 italic">Contact for pricing</span>}
                           </td>
                          <td className="px-5 py-4 text-right">
                            <button 
                              onClick={() => handleEnroll(row.title)}
                              className="bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-md whitespace-nowrap"
                            >
                              Enroll Now →
                            </button>
                           </td>
                        </tr>
                      ))
                    )
                  ) : (
                    onlineBatches.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-12 text-gray-400">No online programs available.</td></tr>
                    ) : (
                      onlineBatches.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors">
                          <td className="px-5 py-4">
                            <div className="text-sm font-semibold text-gray-800">{row.title}</div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                              📅 {row.year}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {row.price !== '–' ? (
                              <div className="flex items-center gap-2 flex-wrap">
                                {row.originalPrice && <span className="text-xs text-gray-400 line-through">{row.originalPrice}</span>}
                                <span className="text-sm font-bold text-green-600">{row.price}</span>
                              </div>
                            ) : <span className="text-sm text-gray-400 italic">Contact for pricing</span>}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button 
                              onClick={() => handleEnroll(row.title)}
                              className="bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-md whitespace-nowrap"
                            >
                              Enroll Now →
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
          {/* Mobile Tabs */}
          <div className="flex mb-5 bg-gray-100 rounded-xl p-1">
            {(['classroom', 'online'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setActiveFilter('all'); }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#e85222] text-white shadow-sm'
                    : 'text-gray-600 bg-transparent'
                }`}
              >
                {tab === 'classroom' ? '🏛️ Classroom' : '💻 Online'}
              </button>
            ))}
          </div>

          {/* Mobile Filter */}
          {activeTab === 'classroom' && (
            <div className="mb-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {([['all', 'All Programs'], ['after12', 'After 12th'], ['lst', 'LST']] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setActiveFilter(val)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      activeFilter === val
                        ? 'bg-[#e85222] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Cards - Upgraded styling */}
          <div className="space-y-4 mb-12">
            {activeTab === 'classroom' ? (
              (filtered as typeof classroomBatches).length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-white rounded-xl">No programs available.</div>
              ) : (
                (filtered as typeof classroomBatches).map((row, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-base font-bold text-gray-800 flex-1 pr-2 leading-tight">{row.title}</h3>
                      {row.price !== '–' ? (
                        <span className="text-lg font-bold text-[#e85222]">{row.price}</span>
                      ) : (
                        <span className="text-sm font-medium text-gray-400">Price on Request</span>
                      )}
                    </div>
                    
                    {/* Schedule Info - Upgraded */}
                    {row.batch !== '–' && (
                      <div className="mb-4 p-3 bg-orange-50 rounded-xl">
                        <div className="flex items-start gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-[#e85222] uppercase tracking-wide">Schedule</p>
                            <p className="text-sm text-gray-700 mt-1 leading-relaxed">{row.batch}</p>
                            {row.batchId && <p className="text-xs text-gray-400 mt-1">Batch ID: {row.batchId}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Enroll Button */}
                    <button 
                      onClick={() => handleEnroll(row.title)}
                      className="w-full bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 mt-2 hover:shadow-md"
                    >
                      Enroll Now →
                    </button>
                  </div>
                ))
              )
            ) : (
              onlineBatches.map((row, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-bold text-gray-800 flex-1 pr-2 leading-tight">{row.title}</h3>
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
                  
                  {/* Year Info - Upgraded */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                      </svg>
                      <div>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Target Exam Year</p>
                        <p className="text-sm font-semibold text-gray-800 mt-1">{row.year}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enroll Button */}
                  <button 
                    onClick={() => handleEnroll(row.title)}
                    className="w-full bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 mt-2 hover:shadow-md"
                  >
                    Enroll Now →
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Why Career Launcher - Upgraded */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Why Career Launcher?
            </h2>
            <div className="w-12 h-1 bg-[#e85222] rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#e85222]/10 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">25+ Years of Excellence</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Led by IIT-IIM alumni with a passion for excellence in education since 1995, CL has been shaping lives and careers of countless students across India.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#e85222]/10 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Proven Track Record</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Thousands of successful students who have achieved their dreams of entering top universities and professional careers through our guidance.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#e85222]/10 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Innovative Methodology</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Focus on academic excellence, technological innovation, and domain expertise built over decades of educational leadership.
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#e85222]/10 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e85222" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Holistic Development</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We 'enable individuals to realize their potential and achieve their dreams' through comprehensive test preparation and vocational training.
              </p>
            </div>
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