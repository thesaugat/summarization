import React, { useEffect, useState } from "react";
import { Heart, Download, ArrowRight, Calendar, Clock, Search, Filter, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaperHistoryPage = () => {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPapers = async () => {
      try {
        // const res = await fetch("http://127.0.0.1:8000/fetch_papers");
        // const data = await res.json();
        const data = {
          "papers": [
            {
              "_id": "1",
              "file_name": "Quantum Computing Advances.pdf",
              "created_at": "2023-05-15T10:30:00Z",
              "preprocessed_text": {
                "title": "Recent Advances in Quantum Computing",
                "abstract": "This paper explores the latest developments in quantum computing, focusing on qubit stability and error correction techniques. We present a novel approach to quantum gate operations that reduces decoherence by 40% compared to existing methods.",
                "keywords": ["quantum computing", "qubits", "error correction", "quantum gates"]
              }
            },
            {
              "_id": "2",
              "file_name": "Neural Networks Review.docx",
              "created_at": "2023-04-22T14:15:00Z",
              "preprocessed_text": {
                "title": "A Comprehensive Review of Deep Neural Network Architectures",
                "abstract": "We survey the most influential neural network architectures from the past decade, analyzing their strengths, weaknesses, and applications. Special attention is given to transformer models and their impact on natural language processing.",
                "keywords": ["neural networks", "deep learning", "transformers", "NLP"]
              }
            },
            {
              "_id": "3",
              "file_name": "Climate Change Models.pdf",
              "created_at": "2023-06-10T09:45:00Z",
              "preprocessed_text": {
                "title": "Improved Climate Change Prediction Models Using Machine Learning",
                "abstract": "Our research demonstrates how machine learning techniques can enhance traditional climate models by incorporating satellite data and ocean current patterns, achieving 15% greater accuracy in temperature predictions.",
                "keywords": ["climate change", "machine learning", "prediction models"]
              }
            },
            {
              "_id": "4",
              "file_name": "CRISPR Applications.pdf",
              "created_at": "2023-03-05T16:20:00Z",
              "preprocessed_text": {
                "title": "Emerging Medical Applications of CRISPR Technology",
                "abstract": "This paper reviews current and potential future medical applications of CRISPR gene editing, including treatments for genetic disorders, cancer therapies, and antiviral applications with case studies from recent clinical trials.",
                "keywords": ["CRISPR", "gene editing", "medical applications"]
              }
            },
            {
              "_id": "5",
              "file_name": "Blockchain Security.docx",
              "created_at": "2023-07-01T11:10:00Z",
              "preprocessed_text": {
                "title": "Security Vulnerabilities in Blockchain Implementations",
                "abstract": "We identify and analyze three major classes of security vulnerabilities present in current blockchain systems, proposing mitigation strategies that maintain decentralization while improving resistance to 51% attacks.",
                "keywords": ["blockchain", "security", "cryptography"]
              }
            },
            {
              "_id": "6",
              "file_name": "Battery Tech Innovations.pdf",
              "created_at": "2023-02-18T13:25:00Z",
              "preprocessed_text": {
                "title": "Innovations in Solid-State Battery Technology",
                "abstract": "Presenting a breakthrough in solid-state battery design that achieves 30% greater energy density while reducing charging time by half. The paper details the materials science behind these improvements.",
                "keywords": ["batteries", "energy storage", "materials science"]
              }
            }
          ]
        }

        setPapers(data.papers);
        if (data.papers.length > 0) {
          setSelectedPaper(data.papers[0]);
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
    // In a real app, this would navigate to the paper analysis page
    navigate(`/paper-analysis/${paper._id}`);
  };

  const filteredPapers = papers.filter(paper =>
    paper.preprocessed_text?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.file_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50">
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
              {filteredPapers.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No papers found</h3>
                  <p className="text-gray-500 mb-4">You haven't uploaded any papers yet or your search returned no results.</p>
                  <button
                    onClick={() => navigate('/file-upload')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Upload a Paper
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredPapers.map((paper) => (
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
                            {paper.preprocessed_text?.title || "Untitled Paper"}
                          </h3>
                          <div className="flex gap-1">
                            <button className="text-gray-400 hover:text-pink-500 transition-colors">
                              <Heart size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Calendar size={14} className="mr-1" />
                          <span>Summarized on {formatDate(paper.created_at || new Date())}</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {truncateText(paper.preprocessed_text?.abstract)}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {paper.preprocessed_text?.keywords?.slice(0, 2).map((keyword, idx) => (
                              <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                                {keyword}
                              </span>
                            )) || (
                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                                  No keywords
                                </span>
                              )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              viewPaperDetails(paper);
                            }}
                            className="text-green-600 hover:text-green-800 text-xs font-medium flex items-center"
                          >
                            Details <ArrowRight size={14} className="ml-1" />
                          </button>
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
                      {selectedPaper.preprocessed_text?.title || "Untitled Paper"}
                    </h2>

                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <Clock size={14} className="mr-1" />
                      <span>Processed {formatDate(selectedPaper.created_at)}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">{selectedPaper.file_name}</span>
                    </div>

                    <div className="border-t border-b border-gray-100 py-4 my-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">AI-Generated Summary</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {selectedPaper.preprocessed_text?.abstract || "No summary available for this paper."}
                      </p>
                    </div>

                    <div className="mb-5">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Key Topics</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPaper.preprocessed_text?.keywords?.map((keyword, idx) => (
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

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Relevance Metrics</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Innovation", value: "78%" },
                          { label: "Methodology", value: "85%" },
                          { label: "Impact", value: "62%" }
                        ].map((metric, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                            <div className="text-sm font-semibold text-gray-800">{metric.value}</div>
                          </div>
                        ))}
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