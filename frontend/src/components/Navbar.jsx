import {
  BotMessageSquare,
  House,
  Icon,
  List,
  MessageSquare,
  Search,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { Icons } from "../assets/Asset";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/", icon: <House /> },
    { name: "Tell Us", path: "tell-us", icon: <MessageSquare /> },
    { name: "News List", path: "news-list", icon: <List /> },
    { name: "AI Detection", path: "ai-detection", icon: <ShieldCheck /> },
    {
      name: "AI Journalist",
      path: "ai-journalist",
      icon: <BotMessageSquare />,
    },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src={Icons.Logo} alt="" className="object-cover text-sm w-28   " />
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            <span>{link.icon}</span> {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <Search />
        </button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-md">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
