import React from 'react';

const DashboardHome = () => {
  return (
    <div className="relative p-40 bg-green-50 rounded-lg">
      {/* Stats Bar */}
      <div className="bg-orange-100 rounded-lg shadow-sm p-4 mb-8 flex justify-between">
        <div className="text-center">
          <p className="text-sm text-gray-600">Lorem ipsum</p>
          <p className="text-2xl font-bold">1004</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Lorem ipsum</p>
          <p className="text-2xl font-bold">20</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Lorem ipsum</p>
          <p className="text-2xl font-bold">105</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap gap-6">
        {/* Checklist Section */}
        <div className="flex-1 min-w-64">
          <h2 className="text-xl font-bold mb-4">Lorem ipsum.</h2>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="mt-1 mr-2 w-5 h-5 rounded-full flex items-center justify-center border border-gray-400">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-2 w-5 h-5 rounded-full flex items-center justify-center border border-gray-400">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-2 w-5 h-5 rounded-full flex items-center justify-center border border-gray-400">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet, consetetur sadipscing elitr molestie sadipsci</p>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-2 w-5 h-5 rounded-full flex items-center justify-center border border-gray-400">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
            </div>
          </div>
          
          <div className="mt-6 bg-orange-100 rounded-lg p-3 inline-flex items-center">
            <span className="text-sm font-medium mr-2">Lorem ipsum</span>
            <div className="w-5 h-5 bg-black rounded-full"></div>
          </div>
        </div>
        
        {/* Research Paper Card */}
        <div className="bg-pink-200 rounded-lg shadow-sm p-6 max-w-72">
          <h3 className="font-bold mb-3">Example of research paper</h3>
          <p className="text-xs mb-3">Lorem ipsum dolor sit amet consetetur sadipscing elitr</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium">Lorem ipsum dolor</p>
              <p className="text-xs">Lorem ipsum</p>
            </div>
            
            <div>
              <p className="text-xs">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
            </div>
            
            <div>
              <p className="text-xs font-medium">Lorem ipsum</p>
              <p className="text-xs">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;