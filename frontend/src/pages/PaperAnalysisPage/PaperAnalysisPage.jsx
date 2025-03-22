import { Heart, Download, Combine } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CircleX } from "lucide-react";
import ProgressCircle from "../../components/ProgressCircle";

function PaperAnalysisPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-theme-header p-20 rounded-2xl shadow-lg">
        <div className="min-h-screen bg-theme-green p-6 rounded-2xl shadow-lg">
          {/* LHS Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <img
                src="/images/ai-image.jpg"
                alt="AI Chip"
                className="rounded-lg shadow-md w-full h-60 object-cover"
              />

              <h1 className="text-2xl font-bold mt-4">
                Title Of The Research Paper
              </h1>
              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
              </p>

              <div className="flex gap-4 mt-4">
                <button className="flex items-center gap-2 bg-orange-200 px-4 py-2 rounded-full w-12 h-12 justify-center">
                  <Heart size={12} />
                </button>
                <button className="flex items-center gap-2 bg-orange-200 px-4 py-2 rounded-full w-12 h-12 justify-center">
                  <Download size={12} />
                </button>
              </div>

              <div className="flex gap-4 mt-8 text-md font-normal">
                <button className="flex items-center justify-center gap-2 bg-theme-yellow border-amber-400   px-4 py-2 rounded-lg w-50">
                  <Combine size={16} /> Lorem ipsum
                </button>
                <button className="flex items-center justify-center gap-2 bg-theme-yellow border border-amber-400 px-4 py-2 rounded-lg w-50">
                  <Combine size={16} /> Lorem ipsum
                </button>
              </div>
            </div>

            {/* RHS Section */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Lorem Ipsum</h2>
              <div className="flex gap-4 mt-2 text-xs font-semibold">
                <button className="bg-white border px-3 py-1 rounded-lg flex justify-between items-center gap-6">
                  <span>Lorem ipsum</span>
                  <span>50%</span>
                </button>
                <button className="bg-white border px-3 py-1 rounded-lg flex justify-between items-center gap-6">
                  <span>Lorem ipsum</span>
                  <span>30%</span>
                </button>
                <button className="bg-white border px-3 py-1 rounded-lg flex justify-between items-center gap-6">
                  <span>Lorem ipsum</span>
                  <span>20%</span>
                </button>
              </div>

              <h2 className="text-lg font-semibold mt-6">Lorem Ipsum</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from({ length: 20 }, (_, i) => (
                  <button className="bg-white border px-3 py-1 rounded-lg flex justify-between items-center gap-6 text-xs ">
                    <span>Lorem ipsum</span>
                    <CircleX size={16} />
                  </button>
                ))}
              </div>

              <div className="flex gap-20 mt-20">
                {Array.from({ length: 3 }, (_, i) => (
                  <ProgressCircle percentage={70} label="Lorem Ipsum" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaperAnalysisPage;
