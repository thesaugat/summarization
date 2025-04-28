import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-green-50 border-t border-green-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Project Info */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">IP</span>
              </div>
              <h3 className="font-semibold text-gray-800">iPaper</h3>
            </div>

            <p className="text-sm text-gray-600">
              A research paper analysis tool developed as a capstone project at UOW.
            </p>

            <p className="text-xs text-gray-500 mt-4">
              &copy; {currentYear} University of Wollongong
            </p>
          </div>

          {/* Links and Contact */}
          <div className="w-full md:w-1/2 flex justify-between gap-4">
            {/* Navigation */}
            <div>
              <h4 className="font-medium mb-2 text-sm text-green-800">Links</h4>
              <ul className="space-y-1">
                <li className="text-sm"><a href="/file-upload" className="text-gray-600 hover:text-green-700">Upload</a></li>
                <li className="text-sm"><a href="/paper-analysis" className="text-gray-600 hover:text-green-700">Analysis</a></li>
                <li className="text-sm"><a href="/history" className="text-gray-600 hover:text-green-700">History</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium mb-2 text-sm text-green-800">Contact</h4>
              <ul className="space-y-1">
                <li className="text-sm text-gray-600">student@uow.edu.au</li>
                <li className="text-sm text-gray-600">UOW Capstone 2025</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;