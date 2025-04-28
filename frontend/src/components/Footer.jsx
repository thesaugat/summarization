import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-theme-footer p-6">
      <div className="max-w-6xl mx-auto flex flex-wrap">
        {/* Logo and Company Description - 1st column */}
        <div className="w-full md:w-2/5 pr-8">
          {/* Oval logo placeholder */}
          <div className="w-24 h-8 bg-amber-700 rounded-full mb-4 flex items-center justify-center">
            <span className="text-white text-xs">COMPANY</span>
          </div>

          <p className="text-sm text-gray-800 mt-8">
          Whether you're a student, researcher, or academic professional, our tool helps you upload papers, extract structured data, and receive AI-driven feedback on how your work aligns with existing literature — making your research journey smoother and smarter.
          </p>
        </div>

        {/* Three link columns in a row */}
        <div className="w-full md:w-3/5 flex flex-row justify-between mt-6 md:mt-0 gap-10">
          {/* First Link Column */}
          <div className="flex-1">
            <h4 className="font-medium mb-3 text-sm">Quick links</h4>
            <ul className="space-y-2">
              <li className="text-sm font-extralight"><a href="/file-upload">Upload paper</a> </li>
              <li className="text-sm font-extralight"><a href="/paper-analysis">Paper analysis</a></li>
              <li className="text-sm font-extralight"><a href="/history">History</a></li>
            </ul>
          </div>

          {/* Second Link Column */}
          <div className="flex-1">
            <h4 className="font-medium mb-3 text-sm">About</h4>
            <ul className="space-y-2">
              <li className="text-sm font-extralight">About us</li>
              
            </ul>
          </div>

          {/* Third Link Column */}
          <div className="flex-1">
            <h4 className="font-medium mb-3 text-sm">Contact us</h4>
            <ul className="space-y-2">
              <li className="text-sm font-extralight">Mob: +61 1282381286</li>
              <li className="text-sm font-extralight">support@ipaper.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
