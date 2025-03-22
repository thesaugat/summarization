import { CheckCircle, Info, ArrowBigRight } from "lucide-react";

export default function HomeData() {
  return (
    <div className="min-h-80 bg-theme-header relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-full bg-theme-green rounded-tr-[60%] rounded-tl-none z-0"></div>
      <div className="relative z-10 p-8 flex flex-col items-center">
        {/* Stats Section */}
        <div className="bg-theme-yellow border border-amber-400 p-4 rounded-xl shadow-md flex w-full max-w-3xl justify-around mb-8">
          <div className="text-center">
            <p className="font-bold">Lorem ipsum</p>
            <h2 className="text-2xl font-extrabold">1004</h2>
          </div>
          <div className="text-center">
            <p className="font-bold">Lorem ipsum</p>
            <h2 className="text-2xl font-extrabold">20</h2>
          </div>
          <div className="text-center">
            <p className="font-bold">Lorem ipsum</p>
            <h2 className="text-2xl font-extrabold">105</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8 w-full max-w-5xl">
          {/* LHS Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">Lorem ipsum.</h1>
            <ul className="space-y-8 mb-4">
              {[...Array(4)].map((_, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <CheckCircle className="text-black" size={20} />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
              ))}
            </ul>
            <button className="bg-theme-yellow border border-amber-400 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 mt-10">
              Lorem ipsum. <ArrowBigRight size={24} />
            </button>
          </div>

          {/* RHS Section */}
          <div className="flex-1 bg-theme-red border border-red-400 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">
              Example of research paper
            </h2>
            <p className="text-gray-700 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-bold">Lorem ipsum</p>
                <p className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div>
                <p className="font-bold">Lorem ipsum</p>
                <p className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
