import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileVideo,
  FileImage,
  ShieldAlert,
  CheckCircle2,
  Loader2,
  X,
  Film,
  Image as ImageIcon,
} from "lucide-react";

const MediaForensics = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  // --- Event Handlers ---

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    // Add validation logic here (e.g., file type, size check < 500MB)
    // For now, we accept it and start simulation
    setFile(selectedFile);
    setResult(null);
    startSimulation();
  };

  const startSimulation = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      // Mock Result: Randomly decide if it's Real or Deepfake for demo
      const isDeepfake = Math.random() < 0.5;
      setResult({
        isDeepfake: isDeepfake,
        score: isDeepfake ? 92 : 98,
        label: isDeepfake
          ? "High Probability of Manipulation"
          : "Content Appears Authentic",
        details: isDeepfake
          ? "Artifacts consistent with GAN-based face generation detected in keyframes."
          : "No signs of digital tampering or synthetic generation across standard analysis benchmarks.",
      });
    }, 3000);
  };

  const resetUpload = () => {
    setFile(null);
    setResult(null);
  };

  // Helper to get file icon based on type
  const getFileIcon = () => {
    if (!file) return null;
    return file.type.startsWith("video") ? (
      <Film size={40} />
    ) : (
      <ImageIcon size={40} />
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header - Consistent JournAi Style */}
      <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-5xl font-black text-[#0A3D62] mb-4 tracking-tight">
          Media Forensics Hub
        </h1>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-blue-200"></div>
          <p className="text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px]">
            Deepfake & Manipulation Detection
          </p>
          <div className="h-px w-8 bg-blue-200"></div>
        </div>
        <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
          Upload images or video footage to verify authenticity and detect
          synthetic manipulation using our advanced AI models.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden relative animate-in fade-in zoom-in duration-500">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#0A3D62_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="p-8 md:p-16 relative z-10">
          {!file ? (
            /* ---------------- State 1: Upload Zone ---------------- */
            <form
              onDragEnter={handleDrag}
              onSubmit={(e) => e.preventDefault()}
              className="relative"
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                multiple={false}
                onChange={handleChange}
                accept="image/png, image/jpeg, video/mp4"
              />

              <div
                className={`border-4 border-dashed rounded-[32px] p-12 md:p-20 flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-pointer
                   ${
                     dragActive
                       ? "border-blue-500 bg-blue-50/50 scale-[0.99]"
                       : "border-gray-200 bg-gray-50/30 hover:bg-gray-50 hover:border-blue-300"
                   }`}
                onClick={() => inputRef.current.click()}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex gap-6 mb-8">
                  {/* Icons adapted to JournAi light theme colors */}
                  <div
                    className={`p-5 rounded-3xl transition-colors ${
                      dragActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-white text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50"
                    } shadow-sm`}
                  >
                    <FileImage size={40} />
                  </div>
                  <div
                    className={`p-5 rounded-3xl transition-colors ${
                      dragActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-white text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50"
                    } shadow-sm`}
                  >
                    <FileVideo size={40} />
                  </div>
                </div>

                <h3 className="text-3xl font-black text-[#0A3D62] mb-4">
                  Drop media to analyze
                </h3>
                <p className="text-gray-500 font-bold text-lg mb-2">
                  Supports JPG, PNG, MP4 • Max 500MB
                </p>
                <p className="text-sm text-gray-400 mb-10 font-medium uppercase tracking-wider">
                  Detect synthetic manipulation
                </p>

                {/* Button matching the "Sign In" style */}
                <button
                  type="button"
                  className="bg-[#0A192F] text-white px-12 py-5 rounded-[20px] font-bold flex items-center gap-3 hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-900/20 relative z-20 pointer-events-none group-hover:pointer-events-auto"
                >
                  <UploadCloud size={22} /> Select File
                </button>
              </div>
              {dragActive && (
                <div
                  className="absolute inset-0 z-0 pointer-events-none"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                ></div>
              )}
            </form>
          ) : (
            /* ---------------- State 2: Analysis & Result ---------------- */
            <div className="animate-in fade-in duration-500">
              {/* Header with Reset Button */}
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    {getFileIcon()}
                  </div>
                  <div>
                    <p className="text-[#0A3D62] font-bold truncate max-w-[200px] md:max-w-md">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400 font-medium uppercase">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {!isAnalyzing && (
                  <button
                    onClick={resetUpload}
                    className="p-2 hover:bg-gray-100 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>

              {isAnalyzing ? (
                /* Loading State */
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2
                    size={60}
                    className="text-blue-500 animate-spin mb-8"
                  />
                  <h3 className="text-2xl font-bold text-[#0A3D62] mb-2 animate-pulse">
                    Analyzing Media Structure...
                  </h3>
                  <p className="text-gray-400 font-medium">
                    Running neural detection models across frames.
                  </p>
                </div>
              ) : (
                /* Result State */
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center animate-in slide-in-from-bottom-8 duration-700">
                  {/* Visual Placeholder for the media */}
                  <div className="md:col-span-2 bg-gray-900 rounded-[32px] h-64 md:h-80 flex items-center justify-center relative overflow-hidden shadow-inner group">
                    {/* In a real app, you'd display the actual image or video player here */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 to-transparent"></div>
                    {getFileIcon()}
                    <p className="absolute bottom-6 text-white/80 font-bold text-sm uppercase tracking-widest">
                      Media Preview
                    </p>
                  </div>

                  {/* Score & Details */}
                  <div className="md:col-span-3">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-6 shadow-sm
                                ${
                                  result.isDeepfake
                                    ? "bg-red-50 text-red-600 border border-red-100"
                                    : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                }`}
                    >
                      {result.isDeepfake ? (
                        <ShieldAlert size={18} />
                      ) : (
                        <CheckCircle2 size={18} />
                      )}
                      {result.label}
                    </div>

                    <div className="mb-8">
                      <div className="flex items-end gap-4 mb-2">
                        <span
                          className={`text-7xl font-black leading-none ${
                            result.isDeepfake
                              ? "text-red-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {result.score}%
                        </span>
                        <span className="text-gray-400 font-bold text-xl mb-2">
                          Confidence Score
                        </span>
                      </div>
                      {/* Simple Progress Bar */}
                      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            result.isDeepfake ? "bg-red-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${result.score}%` }}
                        ></div>
                      </div>
                    </div>

                    <div
                      className={`p-6 rounded-3xl ${
                        result.isDeepfake
                          ? "bg-red-50/50 border border-red-100 text-red-800"
                          : "bg-emerald-50/50 border border-emerald-100 text-emerald-800"
                      }`}
                    >
                      <p className="font-bold mb-2 uppercase text-xs tracking-widest opacity-70">
                        Analysis Summary
                      </p>
                      <p className="text-lg font-medium leading-relaxed">
                        {result.details}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaForensics;
