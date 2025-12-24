import React from 'react';
import { ProgressBar, StatCard } from '../components/DetectionUI';

const AIDetection = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-[#0A3D62] text-center mb-12">
        AI Detection
      </h1>

      {/* Search/Input Bar */}
      <div className="relative mb-16">
        <div className="bg-white rounded-3xl p-2 shadow-xl shadow-blue-900/5 flex items-center border border-gray-50">
          <input 
            type="text" 
            placeholder="Paste news text or search a topic..."
            className="flex-grow p-5 outline-none text-gray-600 rounded-l-3xl"
          />
          <button className="bg-blue-600 text-white p-5 rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            🛡️
          </button>
        </div>
      </div>

      {/* Analysis Result Card */}
      <div className="bg-white rounded-[40px] p-12 shadow-2xl shadow-blue-900/5 border border-gray-50">
        <h2 className="text-2xl font-bold text-[#0A3D62] text-center mb-10">
          Analysis Result
        </h2>

        <ProgressBar score={87} />

        {/* Classification Box */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-3">
            <span>✅</span>
            <span>Classification: Recommended</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            <span className="font-bold text-emerald-700">AI Reasoning:</span> This content has been cross-referenced with multiple trusted sources and fact-checked against our database. The information is accurate, well-sourced, and meets journalistic standards. No misleading claims detected.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col md:flex-row gap-6">
          <StatCard label="Sources Verified" value="12" />
          <StatCard label="Fact Check Score" value="9.2/10" />
          <StatCard label="Bias Detection" value="Low" colorClass="text-emerald-500" />
        </div>
      </div>

      {/* Social Footer */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <div className="flex gap-6 grayscale opacity-40 hover:grayscale-0 transition-all">
            <span className="cursor-pointer">𝕏</span>
            <span className="cursor-pointer">in</span>
            <span className="cursor-pointer">f</span>
            <span className="cursor-pointer">📸</span>
            <span className="cursor-pointer">🎬</span>
        </div>
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
          Follow us on
        </p>
      </div>
    </div>
  );
};

export default AIDetection;