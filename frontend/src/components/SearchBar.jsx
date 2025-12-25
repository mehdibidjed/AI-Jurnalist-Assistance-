import React from 'react';

const SearchBar = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="w-full bg-white border-b border-gray-100 py-4 px-8 animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto relative flex items-center">
        <div className="absolute left-5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          autoFocus
          type="text" 
          placeholder="Search for news, events, or articles..."
          className="w-full pl-14 pr-32 py-4 bg-gray-50 border-2 border-blue-500 rounded-2xl outline-none text-gray-700 placeholder:text-gray-300 transition-all"
        />
        <button className="absolute right-2 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;