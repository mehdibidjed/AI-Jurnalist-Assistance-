import React, { useState, useEffect, useRef } from "react";
import { Send, Plus, Trash2, ShieldCheck, Bot } from "lucide-react";
import { ChatMessage } from "../components/ChatElement";
// Import your API service
import { generateResponse } from "../api/chatbot";

const ChatWithAI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      isAi: true,
      message:
        "Hello! I am your JournAi assistant. Paste any news snippet or link here, and I will analyze its credibility for you.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;

    // 1. Update UI with User Message
    setMessages((prev) => [...prev, { isAi: false, message: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      // 2. Real API Call to your FastAPI /chatbot endpoint
      const response = await generateResponse(userText);

      // 3. Map the backend response
      // Assuming your backend returns { reply: "..." } or { content: "..." }
      // Adjust 'response.reply' based on your specific JSON structure
      const aiReply =
        response.reply ||
        response.content ||
        "I have processed your request, but no specific text was returned.";

      setMessages((prev) => [...prev, { isAi: true, message: aiReply }]);
    } catch (error) {
      // 4. Error Handling in UI
      console.error("Chat API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          isAi: true,
          message:
            "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please ensure the backend server is running.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const startNewAnalysis = () => {
    if (
      window.confirm("Start a new analysis? This will clear the current chat.")
    ) {
      setMessages([
        {
          isAi: true,
          message:
            "New analysis started. How can I help you verify news today?",
        },
      ]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-74px)] bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 p-8 hidden lg:flex flex-col">
        <button
          onClick={startNewAnalysis}
          className="group flex items-center justify-between w-full px-5 py-4 bg-[#0A192F] text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all mb-10 shadow-xl shadow-blue-900/20"
        >
          <span>New Analysis</span>
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform"
          />
        </button>

        <div className="flex-grow">
          <h4 className="text-[11px] font-black text-blue-900/30 uppercase tracking-[0.2em] mb-6">
            Recent Sessions
          </h4>
          <div className="space-y-2">
            <div className="p-4 bg-blue-50/50 border border-blue-100/50 rounded-2xl text-blue-600 text-xs font-bold cursor-pointer">
              ⚡ Live Connection Active
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-grow flex flex-col relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0A3D62_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="flex-grow overflow-y-auto px-6 py-10">
          <div className="max-w-3xl mx-auto w-full">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} isAi={msg.isAi} message={msg.message} />
            ))}

            {isTyping && (
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 animate-pulse">
                  <Bot size={18} />
                </div>
                <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-10">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSend} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[30px] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white rounded-[28px] shadow-xl border border-gray-100 p-2 flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your news source here..."
                  className="flex-grow px-6 py-4 outline-none text-sm text-gray-700 font-medium placeholder:text-gray-300 bg-transparent"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-[#0A192F] text-white p-4 rounded-[22px] hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-20"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatWithAI;
