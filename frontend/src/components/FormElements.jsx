import React from 'react';

export const FormField = ({ label, children }) => (
  <div className="flex flex-col gap-2 mb-6">
    <label className="text-[#0A3D62] font-bold text-sm ml-1">
      {label}
    </label>
    {children}
  </div>
);

export const TextArea = ({ placeholder }) => (
  <textarea
    placeholder={placeholder}
    className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all placeholder:text-gray-400"
  />
);

export const InputField = ({ placeholder, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
  />
);