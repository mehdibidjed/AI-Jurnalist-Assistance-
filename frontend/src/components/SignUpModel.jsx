import React, { useState } from 'react';
import { 
  X, User, Mail, Lock, ShieldCheck, 
  UploadCloud, CheckCircle2 
} from 'lucide-react';

const SignUpModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-[#0A192F]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-[#0A3D62] mb-2 tracking-tight">Sign Up</h2>
            <p className="text-sm text-gray-400 font-medium">Create your JournAi account</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            
            {/* Full Name Input */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <User size={18} />
              </span>
              <input 
                type="text"
                placeholder="Enter your full name"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Mail size={18} />
              </span>
              <input 
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={18} />
              </span>
              <input 
                type="password"
                placeholder="Create a password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <ShieldCheck size={18} />
              </span>
              <input 
                type="password"
                placeholder="Confirm your password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              />
            </div>

            {/* Journalist ID Upload Section */}
            <div className="pt-2">
              <label className="block text-[11px] font-black text-[#0A3D62] uppercase tracking-widest mb-3 ml-1">
                Journalist Identity Card
              </label>
              <div className="border-2 border-dashed border-gray-100 rounded-3xl p-6 bg-gray-50/50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-500 group-hover:scale-110 transition-transform mb-3">
                  <UploadCloud size={24} />
                </div>
                <p className="text-sm font-bold text-[#0A3D62] mb-1">Upload ID Card</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">PNG, JPG up to 10MB</p>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 text-center leading-relaxed">
                Upload your valid journalist press card or media credential
              </p>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer pt-2 px-1">
              <div className="relative">
                <input type="checkbox" className="peer hidden" />
                <div className="w-5 h-5 border-2 border-gray-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                   <CheckCircle2 size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                I agree to the <span className="text-blue-600 font-bold hover:underline">Terms & Conditions</span>
              </span>
            </label>

            {/* Action Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-[20px] shadow-xl shadow-blue-900/10 transition-all transform active:scale-[0.98] mt-4 uppercase tracking-widest text-xs">
              Create Account
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 font-bold pt-4">
              Already have an account? <span className="text-blue-600 cursor-pointer hover:underline">Sign In</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal; 