import React from 'react';

export const ProgressBar = ({ score }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-400 font-semibold text-sm">Credibility Score</span>
      <span className="text-emerald-500 font-bold text-2xl">{score}%</span>
    </div>
    <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
      <div 
        className="bg-emerald-500 h-full transition-all duration-1000 ease-out"
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

export const StatCard = ({ label, value, colorClass = "text-[#0A3D62]" }) => (
  <div className="bg-gray-50/50 rounded-2xl p-6 text-center border border-gray-100 flex-1">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
      {label}
    </p>
    <p className={`text-2xl font-black ${colorClass}`}>
      {value}
    </p>
  </div>
);