import React from "react";
import { User, CircleDashed } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-theme-header py-4 px-6 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-gray-700 rounded-full px-5 py-2 flex items-center justify-center gap-2">
            <CircleDashed className="text-white" />
            <span className="text-white font-bold text-sm">KAISPOTRA</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <a
            href="/file-upload"
            className={`text-gray-800 font-medium ${
              isActive("/file-upload") ? "underline underline-offset-2" : ""
            }`}
          >
            Upload Paper
          </a>
          <a
            href="/paper-analysis"
            className={`text-gray-800 font-medium ${
              isActive("/paper-analysis") ? "underline underline-offset-2" : ""
            }`}
          >
            Paper Analysis
          </a>
          <a
            href="/history"
            className={`text-gray-800 font-medium ${
              isActive("/history") ? "underline underline-offset-2" : ""
            }`}
          >
            History
          </a>
        </nav>

        {/* User Profile Icon */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <User className="text-black w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
