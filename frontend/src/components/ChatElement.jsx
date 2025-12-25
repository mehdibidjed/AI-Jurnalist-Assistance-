import { Bot, User } from 'lucide-react';
import React from 'react';

export const ChatMessage = ({ isAi, message }) => (
    <div className={`flex items-end gap-3 mb-8 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm
        ${isAi ? 'bg-blue-600 text-white' : 'bg-[#0A192F] text-white'}`}>
        {isAi ? <Bot size={18} /> : <User size={18} />}
      </div>
  
      {/* Message Bubble */}
      <div className={`max-w-[75%] flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
        <div className={`relative px-5 py-3.5 shadow-sm transition-all duration-300
          ${isAi 
            ? 'bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-bl-none rounded-tr-[24px]' 
            : 'bg-blue-600 text-white rounded-2xl rounded-br-none rounded-tl-[24px] shadow-blue-200'
          }`}>
          <p className="text-[14px] leading-relaxed font-medium">
            {message}
          </p>
        </div>
        
        {/* Timestamp & Status */}
        <div className="flex items-center gap-2 mt-1.5 px-1">
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tight">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {!isAi && <span className="text-[10px] text-blue-400 font-bold">✓ Sent</span>}
        </div>
      </div>
    </div>
  );

export const HistoryItem = ({ title, active }) => (
  <div className={`p-3 rounded-xl cursor-pointer transition-all mb-2 text-sm font-medium ${
    active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
  }`}>
    <div className="flex items-center gap-2 truncate">
      <span>💬</span>
      <span className="truncate">{title}</span>
    </div>
  </div>
);