import React, { useState } from "react";
import { Heart, Download, Printer, CircleX } from "lucide-react";

const ResearchPaperGrid = () => {
  const [selectedPaper, setSelectedPaper] = useState(null);

  // Sample data for the papers
  const papers = Array(12)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      title: "Lorem ipsum dolor sit amet, consectetur",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
      date: "June 2023",
      isGreen: index === 5, // Make the 6th item green
    }));

  // Stats for the detail panel
  const stats = [
    { label: "Lorem ipsum", value: "80%" },
    { label: "Lorem ipsum", value: "35%" },
    { label: "Lorem ipsum", value: "45%" },
  ];

  // Tags for the detail panel
  const tags = Array(16)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      label: "Lorem ipsum",
    }));

  return (
    <div className="max-w-8xl mx-auto py-10 px-40 bg-theme-header">
      <h1 className="text-2xl font-bold mb-4">Lorem ipsum.</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Paper Grid */}
        <div className="w-full lg:w-3/5">
          <div className="flex gap-4 mb-6">
            {/* Sort dropdown */}
            <div className="relative">
              <div className="bg-theme-yellow border border-amber-400 rounded-md px-4 py-2 flex items-center cursor-pointer">
                <span className="text-sm mr-1">Sort by: Lorem ipsum</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Lorem ipsum"
                className="w-full bg-theme-yellow border border-amber-400 rounded-md px-4 py-2 pr-10 text-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Papers grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow-md ${
                  paper.isGreen
                    ? "bg-green-400 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setSelectedPaper(paper)}
              >
                <div className="p-4">
                  <div
                    className={`text-xs ${
                      paper.isGreen ? "text-green-200" : "text-gray-500"
                    } mb-1`}
                  >
                    Example of research paper
                  </div>
                  <h3 className="text-sm font-medium mb-2">{paper.title}</h3>
                  <div
                    className={`text-xs ${
                      paper.isGreen ? "text-green-100" : "text-gray-400"
                    } mb-3`}
                  >
                    {paper.date}
                  </div>

                  <div
                    className={`text-xs leading-relaxed mb-3 ${
                      paper.isGreen ? "text-green-100" : "text-gray-600"
                    }`}
                  >
                    {paper.excerpt}
                  </div>

                  <div className="text-xs font-medium">Lorem ipsum</div>
                  <div
                    className={`text-xs ${
                      paper.isGreen ? "text-green-200" : "text-gray-600"
                    } mb-1`}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Paper Details */}
        <div className="w-full lg:w-2/5">
          <div className="bg-theme-green border border-green-400 rounded-xl p-6">
            {/* Featured Image */}
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src="/api/placeholder/640/320"
                alt="Research visualization"
                className="w-full h-40 object-cover"
              />
            </div>

            {/* Paper Title */}
            <h2 className="text-xl font-bold mb-4 text-center">
              Title Of The Research Paper
            </h2>

            {/* Paper Description */}
            <p className="text-sm mb-8">
              Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, conse ctetur adipiscing elit.
            </p>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button className="p-2 rounded-full bg-white">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-white">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-white">
                <Printer className="w-5 h-5" />
              </button>
            </div>

            {/* Stats Section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-4">Lorem ipsum</h3>
              <div className="flex justify-between mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center w-30">
                    <div className="bg-white rounded-md p-2 flex justify-between items-center font-semibold">
                      <span className="text-xs">{stat.label}</span>
                      <span className="text-xs">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <h3 className="text-sm font-medium mb-4">Lorem ipsum</h3>
              <div className="grid grid-cols-3 gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center bg-white w-30 justify-between p-2 font-semibold rounded-md"
                  >
                    <span className="text-xs">{tag.label}</span>
                    <CircleX size={12} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPaperGrid;
