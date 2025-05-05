import React, { useState, useEffect } from "react";
import { Heart, Download, ArrowRight, Calendar, Clock, Search, FileText } from "lucide-react";
import { useNavigate } from 'react-router-dom';


const PaperHistoryPage = () => {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/files-list");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setPapers(data);
        if (data.length > 0) {
          setSelectedPaper(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch papers: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "No content available";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const viewPaperDetails = (paper) => {
    // Pass the currently selected paper to the analysis page
    console.info(paper.ml_result.title.answer)
    // navigate('/paper-analysis', { state: { paper } });
    navigate('/paper-analysis', { state: { data: paper } });
  };

  const getKeywords = (paper) => {
    const keywordsStr = paper?.ml_result?.summary?.keywords?.answer || "";
    return keywordsStr ? keywordsStr.split(", ") : [];
  };

  const getPaperTitle = (paper) => {
    return paper?.ml_result?.title?.answer || "Untitled Paper";
  };

  const getSummary = (paper) => {
    return paper?.ml_result?.summary?.detailed_summary?.answer || "No summary available.";
  };

  const filteredPapers = papers.filter(paper =>
    getPaperTitle(paper).toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.file_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort papers based on selected sort option
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    switch (sortOption) {
      case "recent":
        return new Date(b.ml_result?.processed_at || b.upload_date) - new Date(a.ml_result?.processed_at || a.upload_date);
      case "oldest":
        return new Date(a.summary?.processed_at || a.upload_date) - new Date(b.ml_result?.processed_at || b.upload_date);
      case "alphabetical": ml_result
        return getPaperTitle(a).localeCompare(getPaperTitle(b));
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Your Summarized Papers</h1>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Paper List */}
            <div className="w-full lg:w-3/5">
              {sortedPapers.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No papers found</h3>
                  <p className="text-gray-500 mb-4">You haven't uploaded any papers yet or your search returned no results.</p>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Upload a Paper
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sortedPapers.map((paper) => (
                    <div
                      key={paper._id}
                      className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${selectedPaper?._id === paper._id
                        ? "ring-2 ring-green-500 shadow-md"
                        : "hover:shadow-md"
                        }`}
                      onClick={() => setSelectedPaper(paper)}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-base font-medium text-gray-900">
                            {getPaperTitle(paper)}
                          </h3>
                          <div className="flex gap-1">
                            <button className="text-gray-400 hover:text-pink-500 transition-colors">
                              <Heart size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Calendar size={14} className="mr-1" />
                          <span>Summarized on {formatDate(paper.ml_result?.processed_at || paper.upload_date)}</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {truncateText(getSummary(paper))}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {getKeywords(paper).slice(0, 2).map((keyword, idx) => (
                              <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                                {keyword}
                              </span>
                            )) || (
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                                  No keywords
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Paper Summary */}
            {selectedPaper && (
              <div className="w-full lg:w-2/5">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {getPaperTitle(selectedPaper)}
                    </h2>

                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <span className="font-medium">{selectedPaper.file_name.split('_').pop()}</span>
                    </div>

                    <div className="border-t border-b border-gray-100 py-4 my-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">AI-Generated Summary</h3>
                      <div className="h-90 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <p className="text-sm text-gray-600">
                          {getSummary(selectedPaper)}
                        </p>
                      </div>
                    </div>

                    <div className="mb-5">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Key Topics</h3>
                      <div className="flex flex-wrap gap-2">
                        {getKeywords(selectedPaper).map((keyword, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                            {keyword}
                          </span>
                        )) || (
                            <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                              No keywords available
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => viewPaperDetails(selectedPaper)}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex justify-center items-center"
                      >
                        View Full Analysis
                      </button>
                      <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperHistoryPage;