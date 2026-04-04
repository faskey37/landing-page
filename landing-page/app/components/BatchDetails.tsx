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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-left">
          Batch Details at Pune - Undri
        </h2>

        {/* Tabs + Filter row */}
        <div className="flex items-center justify-between border-b border-gray-300 mb-0">
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

        {/* Table */}
        <div className="mb-16 bg-white border border-gray-200 rounded-b-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product Title</th>
                {activeTab === 'classroom'
                  ? <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Batch Description/Batch ID</th>
                  : <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Target Exam Year</th>
                }
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product Price (INR)</th>
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
                              {row.batchId && <div className="text-xs text-gray-400 mt-0.5">({row.batchId})</div>}
                            </div>
                          </div>
                        ) : <span className="text-gray-300">–</span>}
                      </td>
                      <td className="px-5 py-4 align-top">
                        {row.price !== '–'
                          ? <span className="text-sm font-bold text-gray-900">{row.price}</span>
                          : <span className="text-gray-300">–</span>}
                      </td>
                      <td className="px-5 py-4 text-right align-top">
                        <button className="bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-bold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
                          onClick={() => window.open('https://www.careerlauncher.com', '_blank', 'noopener,noreferrer')}>
                          Enroll Now
                        </button>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                onlineBatches.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-12 text-gray-400">No products available.</td></tr>
                ) : (
                  onlineBatches.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 align-top">
                        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Product Title</div>
                        <div className="text-sm text-gray-800 font-medium">{row.title}</div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Target Exam Year</div>
                        <div className="text-sm text-gray-800">{row.year}</div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Product Price (INR)</div>
                        {row.price !== '–' ? (
                          <div className="flex items-center gap-2">
                            {row.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">{row.originalPrice}</span>
                            )}
                            <span className="text-sm font-bold text-green-600">{row.price}</span>
                          </div>
                        ) : <span className="text-gray-300">–</span>}
                      </td>
                      <td className="px-5 py-4 text-right align-top">
                        <button className="bg-[#e85222] hover:bg-[#cf4118] text-white text-sm font-bold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
                          onClick={() => window.open('https://www.careerlauncher.com', '_blank', 'noopener,noreferrer')}>
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

        {/* Why Career Launcher */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-left">
            Why Career Launcher?
          </h2>
          <div className="max-w-4xl space-y-6">
            <p className="text-gray-700 leading-relaxed">
              CL focuses on diverse segments of education across the learners of multiple age-groups. Led by a team of highly qualified professionals, including IIT-IM alumni, with a passion for excellence in education, since 1995, CL has been focusing on shaping the lives and careers of many students. Over these years, the CL brand has diversified and established itself as a recognized brand in education sector.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At CL, we 'enable individuals to realize their potential and achieve their dreams'. This is our core ideology and is firmly grounded on our focus on academic excellence, technological innovation, and domain expertise built over years. We operate across a broad spectrum of segments in the education industry, including test preparation and vocational training.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BatchDetails;