import React, { useState } from 'react';
import { JournalistInput, UploadZone } from '../components/JournalistUI';
import { Wand2, CheckCircle, Copy, Download, RefreshCcw, FileText, Share2 } from 'lucide-react';
import { generateArticle } from '../api/content';

const AIJournalist = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  // 1. State to manage form inputs
  const [formData, setFormData] = useState({
    eventName: '',
    eventDetails: '',
    eventDate: '',
    authorName: '',
    publicationDate: ''
  });

  // 2. Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Dynamic API Call
  const handleGenerate = async () => {
    if (!formData.eventDetails) {
      alert("Please enter event details for the AI to process.");
      return;
    }

    setIsGenerating(true);
    try {
      // Using 'eventDetails' as the prompt for your API
      const response = await generateArticle(formData.eventDetails, "neutral");
      
      setGeneratedContent({
        title: response.title || "Generated Article Draft",
        body: response.article_text || response.content || "No content returned from API.",
        editor: "JournAi v4.2 Core",
        date: new Date().toLocaleDateString()
      });
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-[#0A3D62] mb-4 tracking-tight">AI Journalist</h1>
        <div className="flex items-center justify-center gap-2">
           <div className="h-px w-8 bg-blue-200"></div>
           <p className="text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px]">Digital Newsroom v2.0</p>
           <div className="h-px w-8 bg-blue-200"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
               <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0A3D62]">Draft Configuration</h3>
          </div>
          
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <JournalistInput 
              label="Event Name" 
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              placeholder="Enter the event or topic name..." 
            />
            <JournalistInput 
              label="Event Details" 
              name="eventDetails"
              value={formData.eventDetails}
              onChange={handleInputChange}
              placeholder="Enter the event or topic details..." 
            />
            <div className="grid grid-cols-2 gap-4">
               <JournalistInput 
                label="Event Date" 
                name="eventDate"
                type="date" 
                value={formData.eventDate}
                onChange={handleInputChange}
               />
               <JournalistInput 
                label="Author Name" 
                name="authorName"
                value={formData.authorName}
                onChange={handleInputChange}
                placeholder="Your name..." 
               />
            </div>
            <JournalistInput 
                label="Publication Date" 
                name="publicationDate"
                type="date" 
                value={formData.publicationDate}
                onChange={handleInputChange}
            />
            
            <div className="py-6">
               <UploadZone />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold py-5 rounded-[20px] transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isGenerating ? <RefreshCcw className="animate-spin" size={20} /> : <Wand2 size={20} />}
              {isGenerating ? "Synthesizing..." : "Generate Full Draft"}
            </button>
          </form>
        </div>

        {/* Right Column: Editorial Output */}
        <div className="lg:col-span-7 sticky top-24">
          <div className={`bg-white rounded-[32px] min-h-[700px] flex flex-col shadow-2xl transition-all duration-500 border-2 
            ${generatedContent ? 'border-blue-500/20' : 'border-dashed border-gray-200'}`}>
            
            {!generatedContent && !isGenerating ? (
              <div className="flex-grow flex flex-col items-center justify-center p-20 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-100">
                   <FileText size={40} className="text-gray-200" />
                </div>
                <h4 className="text-2xl font-bold text-[#0A3D62] mb-3">Empty Newsroom</h4>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  Configure your article details on the left. The AI will generate a structured, professional draft here.
                </p>
              </div>
            ) : isGenerating ? (
              <div className="flex-grow flex flex-col items-center justify-center p-20">
                 <div className="w-full space-y-6">
                    <div className="h-10 bg-gray-50 rounded-xl animate-pulse w-4/5"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-50 rounded-lg animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-50 rounded-lg animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-50 rounded-lg animate-pulse w-2/3"></div>
                    </div>
                 </div>
                 <p className="mt-12 text-blue-500 font-black text-xs uppercase tracking-[0.4em] animate-bounce">Generating Content...</p>
              </div>
            ) : (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center px-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-[10px] font-black text-[#0A3D62] uppercase tracking-[0.1em]">Verified AI Draft</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors">
                        <Copy size={14} /> Copy
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors">
                        <Share2 size={14} /> Share
                    </button>
                  </div>
                </div>

                <div className="p-12 md:p-16 flex-grow">
                  <h2 className="text-4xl font-black text-[#0A3D62] leading-[1.1] mb-8">
                    {generatedContent.title}
                  </h2>
                  
                  <div className="flex items-center gap-8 mb-10 pb-8 border-b border-gray-100">
                    <div>
                      <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Editor Instance</p>
                      <p className="text-sm font-bold text-blue-600">{generatedContent.editor}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Publication Date</p>
                      <p className="text-sm font-bold text-gray-700">{generatedContent.date}</p>
                    </div>
                  </div>

                  <div className="prose prose-blue max-w-none">
                    <p className="text-gray-600 text-lg leading-relaxed font-medium mb-6">
                      <span className="text-6xl font-black float-left mr-4 mt-2 text-[#0A3D62] leading-[0.8]">
                        {generatedContent.body.charAt(0)}
                      </span>
                      {generatedContent.body.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="p-10 bg-gray-50/50 border-t border-gray-100 rounded-b-[32px]">
                  <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-100 uppercase tracking-widest text-sm">
                    <CheckCircle size={20} /> Confirm & Publish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIJournalist;