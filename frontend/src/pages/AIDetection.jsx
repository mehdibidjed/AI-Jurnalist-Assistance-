import React, { useState } from 'react';
import { ProgressBar, StatCard } from '../components/DetectionUI';
import { analyzeFact } from '../api/factCheck'; // Import the service we created
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

const AIDetection = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDetection = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      // API call to FastAPI backend
      const data = await analyzeFact(inputText);
      console.log(data)
      // Map your backend response keys here
      // Assuming backend returns: { score: 87, classification: 'Recommended', reasoning: '...', sources: 12 }
      setResult(data);
    } catch (err) {
      console.error("Detection Error:", err);
      alert("Failed to analyze text. Check backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-[#0A3D62] text-center mb-12">
        AI Detection
      </h1>

      {/* Search/Input Bar */}
      <div className="relative mb-16">
        <div className="bg-white rounded-3xl p-2 shadow-xl shadow-blue-900/5 flex items-center border border-gray-50 focus-within:border-blue-300 transition-all">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste news text or search a topic..."
            className="flex-grow p-5 outline-none text-gray-600 rounded-l-3xl"
          />
          <button 
            onClick={handleDetection}
            disabled={isLoading || !inputText}
            className="bg-blue-600 text-white p-5 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
          </button>
        </div>
      </div>

      {/* Analysis Result Section (Conditional Rendering) */}
      {!result && !isLoading ? (
        <div className="text-center p-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
           <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
           <p className="text-gray-400 font-medium">Enter news content above to begin AI verification</p>
        </div>
      ) : (
        <div className={`bg-white rounded-[40px] p-12 shadow-2xl shadow-blue-900/5 border border-gray-50 transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          <h2 className="text-2xl font-bold text-[#0A3D62] text-center mb-10">
            Analysis Result
          </h2>

          <ProgressBar score={result?.accuracy_score || 0} />

          {/* Classification Box */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-3">
              <span>✅</span>
              <span>Classification: {result?.classification || "Analyzing..."}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              <span className="font-bold text-emerald-700">AI Reasoning:</span> {result?.reasoning || "Processing content through neural verification engines..."}
            </p>
          </div>

          {/* Stats Grid */}
          
        </div>
      )}
    </div>
  );
};

export default AIDetection;