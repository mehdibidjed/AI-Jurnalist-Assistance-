import React from 'react';

export const JournalistInput = ({ label, type = "text", placeholder }) => (
  <div className="mb-5">
    <label className="block text-[#0A3D62] font-bold text-sm mb-2">
      • {label}
    </label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300 text-sm"
    />
  </div>
);

export const UploadZone = () => (
  <div className="mb-8">
    <label className="block text-[#0A3D62] font-bold text-sm mb-2">• Import Files</label>
    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50/30 hover:bg-gray-50 transition-colors cursor-pointer group">
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">☁️</div>
      <p className="text-sm font-semibold text-gray-500">Drop files or click to upload</p>
      <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-wider font-bold">Documents, images, PDFs</p>
    </div>
  </div>
);