import { Heart, Download, Tag, ExternalLink, ArrowRight, X, Info } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import RelatedPapersDemo from "../../components/RelatedPaper";

function PaperAnalysisPage({ fileId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [paperData, setPaperData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [relatedPapers, setRelatedPapers] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // State for individual reasoning popups
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data was passed via navigation state
        if (location.state?.data) {
          setPaperData(location.state.data); // Use the passed data
        } else {
          // Fallback to API call if no data was passed
          // const response = await fetch(`/api/papers/${fileId}`);
          // const data = await response.json();
          setPaperData(mockResponse); // Mock data (replace with actual API call)
        }
      } catch (error) {
        console.error("Error fetching paper data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state?.data]);

  useEffect(() => {
    const fetchRelatedPapers = async () => {
      if (!paperData?.ml_result?.file_id) return;

      setLoadingRelated(true);
      try {
        const response = await fetch(`http://localhost:8000/similar-papers/${paperData.ml_result.file_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRelatedPapers(data || []);
      } catch (error) {
        console.error("Error fetching related papers:", error);
        setRelatedPapers([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedPapers();
  }, [paperData]);

  // Parse keywords from the comma-separated string
  const getKeywords = () => {
    if (!paperData?.ml_result?.summary?.keywords?.answer) return [];
    return paperData.ml_result.summary.keywords.answer.split(', ');
  };

  // Parse key points from the string (converting markdown list to array)
  const getKeyPoints = () => {
    if (!paperData?.ml_result?.summary?.key_points) return [];
    return paperData.ml_result.summary.key_points
      .replace("Here are the key points extracted from the document excerpts:\n\n", "")
      .split('\n')
      .filter(point => point.startsWith('*   '))
      .map(point => point.replace('*   ', ''));
  };

  // Function to toggle specific section's reasoning popup
  const toggleReasoningPopup = (section) => {
    if (activePopup === section) {
      setActivePopup(null);
    } else {
      setActivePopup(section);
    }
  };

  // Show loading state if data is still loading
  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-green-600 font-medium">Loading paper analysis...</div>
      </div>
    );
  }

  // If data is loaded but no paper data found
  if (!paperData || !paperData.ml_result) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-red-600 font-medium">Paper data not found</div>
      </div>
    );
  }

  const { ml_result } = paperData;
  const keywords = getKeywords();
  const keyPoints = getKeyPoints();

  return (
    <div className="min-h-screen bg-white-50 relative">
      <Header />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Paper Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-4"></div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Paper Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {ml_result.title?.answer || "Untitled Paper"}
                    {ml_result.title?.reasoning && (
                      <button
                        onClick={() => toggleReasoningPopup('title')}
                        className="ml-2 p-1 inline-flex bg-green-100 rounded-full text-green-600 hover:bg-green-200 transition-colors align-middle"
                      >
                        <Info size={16} />
                      </button>
                    )}
                  </h1>
                  <div className="flex gap-2">
                    <button
                      className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart size={20} fill={isFavorite ? "#ec4899" : "none"} />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                      <Download size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mb-6 text-sm">
                  <span className="text-gray-500">Processed On: {new Date(ml_result.processed_at).toLocaleDateString()}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{ml_result.author?.answer}</span>
                </div>

                <div className="relative">
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    AI-Generated Summarization
                    {ml_result.summary?.detailed_summary?.reasoning && (
                      <button
                        onClick={() => toggleReasoningPopup('summary')}
                        className="ml-2 p-1 bg-green-100 rounded-full text-green-600 hover:bg-green-200 transition-colors"
                      >
                        <Info size={16} />
                      </button>
                    )}
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {ml_result.summary?.detailed_summary?.answer || "No summary available."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {keywords.map(tag => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                  {ml_result.summary?.keywords?.reasoning && (
                    <button
                      onClick={() => toggleReasoningPopup('keywords')}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 hover:bg-green-200 transition-colors"
                    >
                      <Info size={14} className="mr-1" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                    <ExternalLink size={16} /> Read Full Paper
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download size={16} /> Download PDF
                  </button>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    Abstract
                    {ml_result.summary?.abstract?.reasoning && (
                      <button
                        onClick={() => toggleReasoningPopup('abstract')}
                        className="ml-2 p-1 bg-green-100 rounded-full text-green-600 hover:bg-green-200 transition-colors"
                      >
                        <Info size={16} />
                      </button>
                    )}
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700">{ml_result.summary?.abstract?.answer || "No abstract available."}</p>
                  </div>
                </div>

              </div>

              {/* Right Column - Analysis */}
              <div className="flex-1 lg:border-l lg:pl-8 space-y-8">
                {/* <div>
                  <h2 className="text-xl font-semibold mb-4">Related Papers</h2>
                  <div className="space-y-3">
                    {loadingRelated ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                      </div>
                    ) : relatedPapers.length > 0 ? (
                      <>
                        {relatedPapers.map((paper, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                            <div className="flex flex-col">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h3 className="font-medium text-gray-900">{paper.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1">{paper.authors}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-2 mt-2">
                                <div className="flex flex-col">
                                  <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-700">Title</span>
                                    <span className="text-xs font-medium text-gray-700">{paper.relevance_title * 20}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${paper.relevance_title * 20}%` }}
                                    ></div>
                                  </div>
                                </div>

                                <div className="flex flex-col">
                                  <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-700">Keywords</span>
                                    <span className="text-xs font-medium text-gray-700">{paper.relevance_keywords * 20}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-yellow-500 h-2 rounded-full"
                                      style={{ width: `${paper.relevance_keywords * 20}%` }}
                                    ></div>
                                  </div>
                                </div>

                                <div className="flex flex-col">
                                  <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-700">Summary</span>
                                    <span className="text-xs font-medium text-gray-700">{paper.relevance_summary * 20}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-green-600 h-2 rounded-full"
                                      style={{ width: `${paper.relevance_summary * 20}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                                <span className="text-xs text-gray-500">Overall Relevance</span>
                                <div className="flex items-center">
                                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div
                                      className="bg-purple-600 h-2 rounded-full"
                                      style={{
                                        width: `${((paper.relevance_title + paper.relevance_keywords + paper.relevance_summary) / 3 * 20)}%`
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-600 whitespace-nowrap">
                                    {Math.round((paper.relevance_title + paper.relevance_keywords + paper.relevance_summary) / 3 * 20)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button className="text-green-600 flex items-center mt-2 text-sm font-medium hover:text-green-800 transition-colors">
                          View more related papers <ArrowRight size={16} className="ml-1" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No related papers found
                      </div>
                    )}
                  </div>
                </div> */}
                <RelatedPapersDemo papers={relatedPapers} />;


                <div>
                  <h2 className="text-xl font-semibold mb-4">Key Points</h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="prose max-w-none">
                      <p className="text-gray-700">Here are the key points extracted from the document excerpts:</p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {keyPoints.length > 0 ? (
                          keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))
                        ) : (
                          <li>No key points available</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>


                {/* <div>
                  <h2 className="text-xl font-semibold mb-4">Related Papers</h2>
                  <div className="space-y-3">
                    {loadingRelated ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                      </div>
                    ) : relatedPapers.length > 0 ? (
                      <>
                        {relatedPapers.map((paper, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">{paper.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{paper.authors}</p>
                              </div>
                              <div className="flex items-center ml-4">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: `${paper.relevance}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 whitespace-nowrap">{paper.relevance}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button className="text-green-600 flex items-center mt-2 text-sm font-medium hover:text-green-800 transition-colors">
                          View more related papers <ArrowRight size={16} className="ml-1" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No related papers found
                      </div>
                    )}
                  </div>
                </div>
             */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Slide-in Reasoning Panels */}
      {activePopup && (
        <div
          className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out"
          style={{ transform: activePopup ? 'translateX(0)' : 'translateX(100%)' }}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-green-50">
              <h2 className="text-xl font-bold text-green-800">
                {activePopup === 'title' && 'Title Analysis'}
                {activePopup === 'summary' && 'Summary Analysis'}
                {activePopup === 'abstract' && 'Abstract Analysis'}
                {activePopup === 'keywords' && 'Keywords Analysis'}
              </h2>
              <button
                onClick={() => setActivePopup(null)}
                className="p-2 rounded-full hover:bg-green-100 text-green-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {activePopup === 'title' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Result</h3>
                    <p className="text-gray-700">{ml_result.title?.answer}</p>
                  </div>

                  {ml_result.title?.sources && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Sources</h3>
                      <p className="text-gray-700">{ml_result.title?.sources}</p>
                    </div>
                  )}

                  {ml_result.title?.reasoning && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Reasoning</h3>
                      <p className="text-gray-700">{ml_result.title?.reasoning}</p>
                    </div>
                  )}
                </div>
              )}

              {activePopup === 'summary' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Result</h3>
                    <p className="text-gray-700">{ml_result.summary?.detailed_summary?.answer}</p>
                  </div>

                  {ml_result.summary?.detailed_summary?.sources && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Sources</h3>
                      <p className="text-gray-700">{ml_result.summary?.detailed_summary?.sources}</p>
                    </div>
                  )}

                  {ml_result.summary?.detailed_summary?.reasoning && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Reasoning</h3>
                      <p className="text-gray-700">{ml_result.summary?.detailed_summary?.reasoning}</p>
                    </div>
                  )}
                </div>
              )}

              {activePopup === 'abstract' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Result</h3>
                    <p className="text-gray-700">{ml_result.summary?.abstract?.answer}</p>
                  </div>

                  {ml_result.summary?.abstract?.sources && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Sources</h3>
                      <p className="text-gray-700">{ml_result.summary?.abstract?.sources}</p>
                    </div>
                  )}

                  {ml_result.summary?.abstract?.reasoning && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Reasoning</h3>
                      <p className="text-gray-700">{ml_result.summary?.abstract?.reasoning}</p>
                    </div>
                  )}
                </div>
              )}

              {activePopup === 'keywords' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Result</h3>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map(tag => (
                        <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                          <Tag size={14} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {ml_result.summary?.keywords?.sources && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Sources</h3>
                      <p className="text-gray-700">{ml_result.summary?.keywords?.sources}</p>
                    </div>
                  )}

                  {ml_result.summary?.keywords?.reasoning && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Reasoning</h3>
                      <p className="text-gray-700">{ml_result.summary?.keywords?.reasoning}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overlay for slide-in panel */}
      {activePopup && (
        <div
          className="fixed inset-0  bg-opacity-20 z-30"
          onClick={() => setActivePopup(null)}
        ></div>
      )}
    </div>
  );
}

// Default export with optional props
export default function PaperAnalysisPageWrapper(props) {
  return <PaperAnalysisPage fileId={props.fileId || "6818350af2be2f7ba8f5fc0c"} />;
}