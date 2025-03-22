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
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
        </div>

        {/* Three link columns in a row */}
        <div className="w-full md:w-3/5 flex flex-row justify-between mt-6 md:mt-0 gap-10">
          {/* First Link Column */}
          <div className="flex-1">
            <h4 className="font-medium mb-3 text-sm">Lorem ipsum</h4>
            <ul className="space-y-2">
              <li className="text-sm">Link 1</li>
              <li className="text-sm">Link 2</li>
              <li className="text-sm">Link 3</li>
            </ul>
          </div>

          {/* Second Link Column */}
          <div className="flex-1">
            <h4 className="font-medium mb-3 text-sm">Lorem ipsum</h4>
            <ul className="space-y-2">
              <li className="text-sm">Link 1</li>
              <li className="text-sm">Link 2</li>
              <li className="text-sm">Link 3</li>
            </ul>
          </div>

          {/* Third Link Column */}
          <div className="flex-1">
            <h4 className="font-medium mb-3 text-sm">Lorem ipsum</h4>
            <ul className="space-y-2">
              <li className="text-sm">Link 1</li>
              <li className="text-sm">Link 2</li>
              <li className="text-sm">Link 3</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
