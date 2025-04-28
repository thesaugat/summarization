import { Heart, Download, Tag, ExternalLink, ArrowRight, X, Info } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProgressCircle from "../../components/ProgressCircle";
import { useState } from "react";

function PaperAnalysisPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReasoningPopup, setShowReasoningPopup] = useState(false);

  const relatedPapers = [
    {
      title: "Efficient Vision Transformers via Patch Merging",
      authors: "Zhang, Li et al.",
      relevance: 83
    },
    {
      title: "Dynamic Routing Between Capsules",
      authors: "Hinton, Sabour et al.",
      relevance: 67
    },
    {
      title: "Attention is All You Need in Computer Vision",
      authors: "Patel, Johnson et al.",
      relevance: 58
    }
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <Header />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Paper Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-4"></div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Paper Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Advanced Neural Architecture for Computer Vision
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
                  <span className="text-gray-500">Published: Mar 2025</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">Citations: 124</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">Impact Factor: 8.3</span>
                </div>

                <div className="mb-6">
                  <img
                    src="/api/placeholder/800/300"
                    alt="Paper visualization"
                    className="rounded-lg shadow-sm w-full object-cover mb-4"
                  />
                </div>

                <div className="relative">
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    AI-Generated Summarization
                    <button
                      onClick={() => setShowReasoningPopup(true)}
                      className="ml-2 p-1 bg-green-100 rounded-full text-green-600 hover:bg-green-200 transition-colors"
                    >
                      <Info size={16} />
                    </button>
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    This research introduces a breakthrough in computer vision by combining attention mechanisms with sparse convolutions. The authors demonstrate a 35% reduction in computational requirements while achieving superior performance across benchmarks. Key applications include medical imaging analysis, autonomous driving systems, and facial recognition technology. The most significant innovation is the adaptive attention module that dynamically allocates computational resources based on image complexity.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['Neural Networks', 'Computer Vision', 'Attention Mechanisms', 'Sparse Convolution'].map(tag => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                    <ExternalLink size={16} /> Read Full Paper
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download size={16} /> Download PDF
                  </button>
                </div>
              </div>

              {/* Right Column - Analysis */}
              <div className="flex-1 lg:border-l lg:pl-8 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Impact Metrics</h2>
                  <div className="grid grid-cols-3 gap-6">
                    <ProgressCircle percentage={87} label="Innovation" />
                    <ProgressCircle percentage={92} label="Methodology" />
                    <ProgressCircle percentage={78} label="Practical Impact" />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Related Papers</h2>
                  <div className="space-y-3">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Reasoning Popup */}
      {showReasoningPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Summarization Reasoning</h2>
                <button
                  onClick={() => setShowReasoningPopup(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-green-700">Key Information Extraction</h3>
                <p>The summarization identified these key elements from the paper:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The core technological innovation: combination of attention mechanisms with sparse convolutions</li>
                  <li>Quantifiable performance improvement: 35% reduction in computational requirements</li>
                  <li>Benchmark assessment: achieved superior performance across standard benchmarks</li>
                  <li>Application domains: medical imaging, autonomous driving, facial recognition</li>
                  <li>Standout feature: adaptive attention module for dynamic resource allocation</li>
                </ul>

                <h3 className="text-lg font-semibold text-green-700 mt-6">Summarization Methodology</h3>
                <p>The AI system followed these steps to generate the summary:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Identified the primary research contribution and core technological approach</li>
                  <li>Extracted quantifiable metrics and performance claims</li>
                  <li>Located practical applications mentioned throughout the paper</li>
                  <li>Determined the most novel or significant innovation described</li>
                  <li>Synthesized these elements into a concise summary that maintains technical accuracy while being accessible</li>
                </ol>

                <h3 className="text-lg font-semibold text-green-700 mt-6">Confidence Assessment</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Confidence:</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-green-600 h-2 rounded-full w-4/5"></div>
                      </div>
                      <span>80%</span>
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    The model has high confidence in the accuracy of this summarization based on consistent
                    information found throughout multiple sections of the paper, including the abstract,
                    methodology, and results sections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaperAnalysisPage;