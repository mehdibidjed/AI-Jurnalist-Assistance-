import {
  BotMessageSquare,
  Briefcase,
  Globe,
  House,
  Icon,
  List,
  MessageSquare,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";
import { Icons } from "../assets/Asset";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
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
      name: "AI Journalist",
      path: "ai-journalist",
      icon: <BotMessageSquare />,
    },
  ];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b border-gray-50">
        <Link to="/" className="flex items-center">
          <img src={Icons.Logo} className="w-20" />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-1 text-xs font-semibold transition-colors
                ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Search Toggle Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-2 rounded-full transition-colors ${
              isSearchOpen
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Search />
          </button>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all shadow-md">
            Sign In
          </button>
        </div>
      </nav>

      {/* Search Bar (Renders below navbar when active) */}
      <SearchBar isOpen={isSearchOpen} />
    </header>
  );
};

export default Navbar;
