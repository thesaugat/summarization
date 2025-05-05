import { Heart, Download, Tag, ExternalLink, ArrowRight, X, Info } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProgressCircle from "../../components/ProgressCircle";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

function PaperAnalysisPage({ fileId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReasoningPopup, setShowReasoningPopup] = useState(false);
  const [paperData, setPaperData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Example API response data - in production, you'd fetch this
  // const mockResponse = {
  //   "message": "File uploaded and processed",
  //   "id": "6818350af2be2f7ba8f5fc0c",
  //   "ml_result": {
  //     "title": {
  //       "answer": "On Privacy and Security in Social Media – A Comprehensive Study",
  //       "sources": "International Conference on Information Security & Privacy (ICISP2015), 11-12 December 2015, \nNagpur, INDIA \nOn Privacy and Security in Social Media – A Comprehensive Study ",
  //       "reasoning": "The title is clearly stated in the text as 'On Privacy and Security in Social Media – A Comprehensive Study'."
  //     },
  //     "summary": {
  //       "detailed_summary": {
  //         "answer": "This study by Senthil Kumar N, Saravanakumar K, and Deepa K comprehensively examines privacy and security issues within social media. It highlights the extensive integration of social networks into various aspects of human life, including information sharing, news dissemination, education, business, and entertainment, leading to its characterization as the current Internet culture. The research emphasizes the critical need for security and privacy measures to protect users' undisclosed information. It addresses the challenge of analyzing user behavior in interpersonal networks for data mining purposes without compromising privacy, suggesting that information should be accessible while safeguarding user protection. The study also acknowledges the risk of trusting third parties to analyze data, as they may exploit identifying and sensitive information. It proposes ensuring the unwavering integrity of individuals' privacy when expressing affiliations within these networks. The key solution depends on a cryptographic protocol whose privacy is primarily in view of the infeasibility of discrete logarithms and the power of somewhat blinded signatures. The paper also discusses the concept of users trading personal data for financial or nonmonetary rewards, and the importance of users making informed decisions about the advantages and risks of disclosure. It identifies Location-Based Social Network Services (LBSNS) as a potential means of identifying a person's location and even that of their friends, raising further privacy concerns. A survey of 185 students, with a majority being males aged 20-35, revealed that a significant portion has extensive internet usage and familiarity with social networks, particularly Facebook. The study concludes by stressing the importance of addressing privacy concerns and implementing effective privacy settings to prevent breaches and violations on social media platforms.",
  //         "sources": "115 Senthil Kumar N. et al.  /  Procedia Computer Science   78  ( 2016 )  114 – 119 \nAccording to the authors [3], who had proposed that any sort of examination about the number of inhabitants in \nclients who express inclinations, therefore defusing protection dangers as well as vital investigation. The proposition \nis still to keep connection ready to the interpersonal organization profiles of their users, however to permit clients to \nassociate some guaranteed property estimations with their credentials, by picking each time they express credits that \nneed to uncover. In the sideline perspective of the privacy domain [1], the subject of privacy has been under scrutiny \nand ensuring the basic importance given by the particular  academic group has deemed to be vigilant. To ensure \nprivacy of clients by recognizing characteristics, not by vuln erability based anonymization.  Thus, despite the fact \nthat from an only specialized viewpoint our answer is closer to priv acy than protection in the long run, individual \ninformation of clients is ensured. \nFurther, unknown examination relating to different attributes of the general population who communicated such \nan inclination is saved with no danger for users' privacy , in light of the fact that there is no r eal way to relate such \ndata to a specific user. Besides, the above prerequisites bring out what is given by particular revelation and bit\n\ndata to a specific user. Besides, the above prerequisites bring out what is given by particular revelation and bit \nresponsibility approaches, yet an immediate utilization of such ways to deal with our case is not resolute since these \nmechanism would permit outsiders to follow the user,  subsequently breaking namelessness. The issue is in this way \nnot trifling. The key solution depe nds on a cryptographic protocol whose privacy is primarily in view of the \ninfeasibility of discrete logarithms and the power of so mewhat blinded signatures [7]. As a matter of fact, we can \nconsider Facebook that it is not just a positive relationship with an online substance additionally as center doled out \nby the social users. Maintaining privacy of the register users is the central role of the authorities and any deviation of \npolicy given would totally wreck the organizational policy governance which in turn leads to serious havoc to the \nfundamental rights of society. In social media, some of the private data are shared by the us er unknowingly or \nvoluntarily. Sometimes, private details  other than that are intentionally shared by the users are extracted from them \nextrinsically by offering them some benefits. Through the Location-Based Social Network Services (LBSNS) like \nFireEagle, Google Latitude, Nearby etc., you are able to identify the location of a person. Even  you are able to \nidentify the location of his/her friends [9].\n\non privacy concerns hinges on the social networks and jolt out the privacy breaches effectively. We had identified \nsome of the privacy concerns that the social users can undertake before they uses the social sites and embed their \nprivacy setting on the site to prevent any breach of violation. \n3.1. Predicting the behavior of social media users \nThis study goes for discovering the privacy and privacy in social network sites locales reco gnition among Social \nMedia clients [6]. A specimen of 250 understudies was chosen haphazardly from distinctive piece of the world. A \nnet of 185 polls were filled effectively and returned. Almost 78% of the respond ents were males, while about 22% \nof them were females .On the other hand, roughly 72 of respondents were in the age bunch 20-35 years of age. Be \nthat as it may, the quantity of respondents in the age gatherings \"between 28-41 practically got 19% where different \ngatherings 50 or more is right around zero. Instructive level played a high effect su bsequent to 58% are four year \ncertification and graduate degrees are 21%. The years of utilizing Internet think about the commonality of \ninterpersonal organization on the grounds that from those are utilizing the web for over 10 years are 56% and in the \nevent that we connect the use with nature of SN it indicates 51 % for decently recognizable and 49% for extremely \nwell known . Then again 90% of this study populace is utilizing Facebook and 36 % utilizing IslamTag and 62%\n\nScienceDirect\nAvailable online at www.sciencedirect.com\n International Conference on Information Security & Privacy (ICISP2015), 11-12 December 2015, \nNagpur, INDIA \nOn Privacy and Security in Social Media – A Comprehensive Study \nSenthil Kumar N*, Saravanakumar K, Deepa K \nSchool of Information Technology and Engineering, VIT University, Vellore – 632014, India \nAbstract \nSocial networks have become a part of human life. Starting from sharing information like text, photos, messages, many have \nstarted share latest news, and news related pictures in the Media domain, question papers, assignments, and workshops in \nEducation domain, online survey, marketing, and targeting customers in Business domain, and jokes, music, and videos in \nEntertainment domain. Because of its usage by Internet surfers in all possible ways, even wee would mention the social \nnetworking media as the current Internet culture. While enjoying the information sharing on Social Medias, yet it requires a gr eat \ndeal for security and privacy. The users’ information that are to be kept undisclosed, should be made private. ",
  //         "reasoning": "The summary is based on the key points, findings, and conclusions presented in the document excerpts. It covers the study's objectives, methodology, and main arguments regarding privacy and security in social media. The summary maintains an objective tone and avoids personal opinions or external information."
  //       },
  //       "key_points": "Here are the key points extracted from the document excerpts:\n\n*   The authors propose allowing users to associate certified property values with their credentials, choosing which attributes to reveal each time.\n*   The research emphasizes ensuring client privacy by recognizing characteristics, rather than relying on vulnerability-based anonymization.\n*   The study acknowledges that users often trade personal data for financial or nonmonetary rewards, participating in a \"social contract\" as long as benefits outweigh risks.\n*   The research aims to observe the impacts of intrinsic hiccups on the technical side of privacy and security measures on social media sites.\n*   Enforcing well-defined policies (strong passwords, awareness of information disclosure, antivirus software) is suggested to secure social networks.\n*   The strongest measure to protect privacy in interpersonal networks is to ensure the unflinching integrity of individual's privacy who expresses affiliation.\n*   The document identifies three categories of security attacks on social networking sites: Privacy Breach, Passive Attacks, and Active Attacks.",
  //       "abstract": {
  //         "answer": "Social networks have become a part of human life. Starting from sharing information like text, photos, messages, many have \nstarted share latest news, and news related pictures in the Media domain, question papers, assignments, and workshops in \nEducation domain, online survey, marketing, and targeting customers in Business domain, and jokes, music, and videos in \nEntertainment domain. Because of its usage by Internet surfers in all possible ways, even wee would mention the social \nnetworking media as the current Internet culture. While enjoying the information sharing on Social Medias, yet it requires a gr eat \ndeal for security and privacy. The users’ information that are to be kept undisclosed, should be made private.",
  //         "sources": "Social networks have become a part of human life. Starting from sharing information like text, photos, messages, many have \nstarted share latest news, and news related pictures in the Media domain, question papers, assignments, and workshops in \nEducation domain, online survey, marketing, and targeting customers in Business domain, and jokes, music, and videos in \nEntertainment domain. Because of its usage by Internet surfers in all possible ways, even wee would mention the social \nnetworking media as the current Internet culture. While enjoying the information sharing on Social Medias, yet it requires a gr eat \ndeal for security and privacy. The users’ information that are to be kept undisclosed, should be made private.",
  //         "reasoning": "The document contains a section labeled 'Abstract' which provides a summary of the document's content. This section is the abstract."
  //       },
  //       "keywords": {
  //         "answer": "Social media, Privacy, Policy enforcement, Security, Information disclosure, Trust, Online social networks",
  //         "sources": "Keywords: Social media; Privacy; Policy enforcement; Security;\ninformation strategies and practices furnish people with control over the revelation and utilization of their own data\nIn the connection of online social range interpersonal co mmunication, such limit regulation can be accomplished through the utilization of privacy settings\nbe affected by critical variables, for example, trust and control",
  //         "reasoning": "The keywords are extracted directly from the document excerpts. The keywords 'Social media', 'Privacy', 'Policy enforcement', and 'Security' are explicitly listed as keywords in the document. 'Information disclosure', 'Trust', and 'Online social networks' are recurring themes and concepts discussed throughout the excerpts."
  //       }
  //     },
  //     "file_id": "6818350af2be2f7ba8f5fc0c",
  //     "processed_at": "2025-05-05T03:48:45.941417"
  //   }
  // }

  // // In a real application, fetch data from API
  // useEffect(() => {
  //   // Simulate API fetch
  //   const fetchData = async () => {
  //     try {
  //       // In production, replace with actual API call:
  //       // const response = await fetch(`/api/papers/${fileId}`);
  //       // const data = await response.json();

  //       // Using mock data for now
  //       setPaperData(mockResponse);
  //     } catch (error) {
  //       console.error("Error fetching paper data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [fileId]);

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
    <div className="min-h-screen bg-white-50">
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
                  <span className="text-gray-500">ID: {ml_result.file_id}</span>
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

                <div>
                  <h2 className="text-xl font-semibold mb-4">Abstract</h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700">{ml_result.summary?.abstract?.answer || "No abstract available."}</p>
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
      {showReasoningPopup && paperData && (
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
                <h3 className="text-lg font-semibold text-green-700">Title Reasoning</h3>
                <p>{ml_result.title?.reasoning || "No reasoning provided."}</p>

                <h3 className="text-lg font-semibold text-green-700 mt-6">Summary Reasoning</h3>
                <p>{ml_result.summary?.detailed_summary?.reasoning || "No reasoning provided."}</p>

                <h3 className="text-lg font-semibold text-green-700 mt-6">Abstract Reasoning</h3>
                <p>{ml_result.summary?.abstract?.reasoning || "No reasoning provided."}</p>

                <h3 className="text-lg font-semibold text-green-700 mt-6">Keywords Reasoning</h3>
                <p>{ml_result.summary?.keywords?.reasoning || "No reasoning provided."}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Default export with optional props
export default function PaperAnalysisPageWrapper(props) {
  return <PaperAnalysisPage fileId={props.fileId || "6818350af2be2f7ba8f5fc0c"} />;
}