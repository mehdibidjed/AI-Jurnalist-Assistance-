import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Sparkles,
  Radio,
  Globe,
  Briefcase,
  MessageSquare,
  List,
  ShieldCheck,
  Search,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Video,
  BotMessageSquare,
  House,
  Icon, 
  Shield,
} from "lucide-react";
import { Icons } from "../assets/Asset";
import {} from "lucide-react";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: <House className="w-5" /> },
    {
      name: "Chat with AI",
      path: "chat-with-ai",
      icon: <Sparkles className="w-5" />,
    },
    { name: "Camera Hub", path: "camera-hub", icon: <Radio className="w-5" /> },
    { name: "Community", path: "community", icon: <Globe className="w-5" /> },
    {
      name: "freelancer",
      path: "freelance",
      icon: <Briefcase className="w-5" />,
    },

    { name: "News List", path: "news-list", icon: <List className="w-5" /> },
    {
      name: "AI Detection",
      path: "ai-detection",
      icon: <ShieldCheck className="w-5" />,
    },
    {
      name: "Content Auth",
      path: "vi-check",
      icon: <Shield />,
    },
    {
      name: "AI Journalist",
      path: "ai-journalist",
      icon: <BotMessageSquare />,
    },
  ];

  const NavItem = ({ link }) => {
    const isActive = location.pathname === link.path;
    return (
      <Link
        to={link.path}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative
          ${
            isActive
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
              : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
          }`}
      >
        <span className="shrink-0">{link.icon}</span>
        {(!isCollapsed || mobileOpen) && (
          <span className="font-bold text-sm tracking-tight">{link.name}</span>
        )}
        {isActive && !isCollapsed && (
          <ChevronRight size={16} className="ml-auto opacity-50" />
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && !mobileOpen && (
          <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-[#0A192F] text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest z-50 pointer-events-none whitespace-nowrap">
            {link.name}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-[100]">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-3 bg-[#0A192F] text-white rounded-2xl shadow-xl"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[90] bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out
          ${
            mobileOpen
              ? "translate-x-0 w-72"
              : "-translate-x-full lg:translate-x-0"
          }
          ${isCollapsed ? "lg:w-24" : "lg:w-72"}`}
      >
        {/* Logo Section */}
        <div className="p-8 mb-4 flex items-center justify-between">
          {(!isCollapsed || mobileOpen) && (
            <Link
              to="/"
              className="text-2xl font-black text-[#0A3D62] tracking-tighter"
            >
              <img src={Icons.Logo} className="w-20"/>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-colors"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Navigation Scroll Area */}
        <div className="flex-grow overflow-y-auto px-4 space-y-1 custom-scrollbar">
          <p
            className={`px-4 mb-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] 
            ${isCollapsed && !mobileOpen ? "text-center" : ""}`}
          >
            {isCollapsed && !mobileOpen ? "•••" : "Main Menu"}
          </p>
          {navLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <button
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#0A192F] text-white font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/10
            ${isCollapsed && !mobileOpen ? "justify-center" : ""}`}
          >
            <LogOut size={20} />
            {(!isCollapsed || mobileOpen) && <span>Sign In</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[80] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
