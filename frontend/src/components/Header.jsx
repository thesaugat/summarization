import React, { useState } from "react";
import { BookOpen, CircleDashed, FileText, History, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  // Navigation items with icons for better visual cues
  const navItems = [
    { path: "/file-upload", label: "Upload Paper", icon: <FileText size={18} /> },
    // { path: "/paper-analysis", label: "Paper Analysis", icon: <BookOpen size={18} /> },
    { path: "/history", label: "History", icon: <History size={18} /> }
  ];

  return (
    <header className="w-full bg-theme-header py-3 px-6 border-b border-gray-100 shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full px-5 py-2 flex items-center justify-center gap-2">
            <CircleDashed className="text-white" />
            <span className="text-white font-bold text-sm md:text-base">iPaper</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 ease-in-out cursor-pointer 
                ${isActive(item.path)
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-green-600"}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-20 transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col p-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ease-in-out cursor-pointer 
                ${isActive(item.path)
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-green-600"}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;