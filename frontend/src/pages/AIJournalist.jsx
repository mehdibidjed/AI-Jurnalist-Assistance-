import React from 'react';
import { JournalistInput, UploadZone } from '../components/JournalistUI';

const AIJournalist = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-4xl font-extrabold text-[#0A3D62]">AI Journalist</h1>
          <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            Auth Required
          </span>
        </div>
        <p className="text-gray-400 font-medium">Create professional articles powered by AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Form Details */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 shadow-2xl shadow-blue-900/5 border border-gray-50">
          <h3 className="text-xl font-bold text-[#0A3D62] mb-8">Article Details</h3>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <JournalistInput label="Event Name" placeholder="Enter the event or topic name..." />
            <JournalistInput label="Event Details" placeholder="Enter the event or topic details..." />
            <JournalistInput label="Event Date" type="date" />
            <JournalistInput label="Author Name" placeholder="Your name..." />
            <JournalistInput label="Publication Date" type="date" />
            
            <UploadZone />

            <button className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
               Generate Article
            </button>
          </form>
        </div>

        {/* Right Column: Article Summary Card */}
        <div className="bg-[#1B263B] rounded-[40px] p-8 text-white shadow-2xl sticky top-24">
          <h3 className="text-xl font-bold mb-8">Article Summary</h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Title</p>
              <p className="text-sm font-medium text-gray-300 italic">Awaiting generation...</p>
            </div>
            
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
              <p className="text-lg font-bold">—</p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Editor</p>
              <p className="text-lg font-bold">—</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-10">
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Fill in the article details and click <span className="text-blue-400 font-bold">"Generate Article"</span> to create a professional news piece. You'll be able to review and edit before publishing.
              </p>
            </div>

            <button className="w-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold py-4 rounded-xl mt-4 opacity-50 cursor-not-allowed">
              Apply / Publish
            </button>
          </div>
        </div>

      </div>

      {/* Social Icons Footer */}
      <div className="mt-24 flex flex-col items-center gap-4">
        <div className="flex gap-6 text-gray-400">
           <span className="hover:text-blue-600 cursor-pointer">𝕏</span>
           <span className="hover:text-blue-700 cursor-pointer">in</span>
           <span className="hover:text-blue-500 cursor-pointer">f</span>
           <span className="hover:text-pink-500 cursor-pointer">📸</span>
           <span className="hover:text-red-600 cursor-pointer">🎬</span>
        </div>
        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">Follow us on</p>
      </div>
    </div>
  );
};

export default AIJournalist;