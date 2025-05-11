import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-500 to-blue-600 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Paper Analysis AI</h1>
              <p className="text-xl text-white mb-8">Upload your research paper for instant summaries and intelligent analysis</p>
              <a href="/file-upload">
                <button className="bg-white text-blue-600 font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  Upload Paper
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon="📄"
                title="Upload PDF"
                description="Upload your research paper in PDF format (max 50MB)"
              />
              <FeatureCard
                icon="🤖"
                title="AI Processing"
                description="Our AI analyzes and extracts key information securely"
              />
              <FeatureCard
                icon="📊"
                title="Get Summary"
                description="Review an intelligent summary with key points and similar paper recommendations"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Ready to try iPaper?</h3>
                  <p className="text-gray-600">Process your first research paper in seconds</p>
                </div>
                <a href="/file-upload">
                  <button className="bg-green-500 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                    Start Analysing
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Example Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Example Summaries</h2>
              <a href="/history">
                <button className="bg-blue-500 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                  View History
                </button>
              </a>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <ExampleCard
                title="Scalable Clustering of News Search Results"
                date="May 5, 2025"
                tags={["clustering", "search results", "news documents"]}
              />
              <ExampleCard
                title="Monolithic vs. Microservice Architecture"
                date="May 6, 2025"
                tags={["Monolithic architecture", "Microservice architecture"]}
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

// Component for feature cards
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Component for example summary cards
const ExampleCard = ({ title, date, tags }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">Summarized on {date}</p>
      <p className="text-gray-600 mb-4">
        This paper discusses important findings and methodology in the field...
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Related Papers</h4>
        <p className="text-xs text-gray-500">3 similar papers found based on content analysis</p>
      </div>
    </div>
  );
};

export default HomePage;