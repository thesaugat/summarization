import { CheckCircle, Info, ArrowBigRight } from "lucide-react";

export default function HomeData() {

  const keyPoints = ["Upload your academic paper in PDF format for processing.", "The application extracts structured data using parsing algorithms.", "Performs content analysis using advanced NLP techniques.", "Generates insights on similarity, relevance, and originality metrics."];

  return (
    <div className="min-h-80 bg-theme-header relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-full bg-theme-green rounded-tr-[60%] rounded-tl-none z-0"></div>
      <div className="relative z-10 p-8 flex flex-col items-center">
        {/* Stats Section */}
        <div className="bg-theme-yellow border border-amber-400 p-4 rounded-xl shadow-md flex w-full max-w-3xl justify-around mb-8">
          <div className="text-center">
            <p className="font-bold">Total Papers</p>
            <h2 className="text-2xl font-extrabold">5000+</h2>
          </div>
          <div className="text-center">
            <p className="font-bold">Total Users</p>
            <h2 className="text-2xl font-extrabold">1000+</h2>
          </div>
          <div className="text-center">
            <p className="font-bold">User Rating</p>
            <h2 className="text-2xl font-extrabold">4.5+</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8 w-full max-w-5xl">
          {/* LHS Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">Smart Paper Analysis</h1>
            <ul className="space-y-8 mb-4">
              {/* {[...Array(4)].map((_, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <CheckCircle className="text-black" size={20} />

                  </li>
              ))} */}

              {
                keyPoints.map((keyPoint, index) => (
                  <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <CheckCircle className="text-black" size={20} />
                  {keyPoint}
                  </li>
                ))
              }

            </ul>
            <button className="bg-theme-yellow border border-amber-400 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 mt-10">
              Analyse Paper <ArrowBigRight size={24} />
            </button>
          </div>

          {/* RHS Section */}
          <div className="flex-1 bg-theme-red border border-red-400 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">
              Loop holes in fiancial returns.
            </h2>
            <p className="text-gray-700 mb-2">
              Once the paper is uploaded data extraction tales place.
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-bold">Data separation</p>
                <p className="text-gray-700 text-sm text-justify">
                  The extraced data is then segregated into different headings.Title, Subtitle, Summary, Conclusion is separated from the text. These paragraphs then are analysed by LLM and putforth for the prediction for the similarity score of the paper compared to the other papers in the database.
                </p>
              </div>
              <div>
                <p className="font-bold">Key words</p>
                <p className="text-gray-700 text-sm text-justify">
                Financial markets, investment analysis, risk management, capital structure, corporate finance, asset allocation, market volatility, portfolio optimization, economic forecasting, stock valuation, interest rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

