import { Upload, ArrowRight, FolderOpen } from "lucide-react";

export default function UploadComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream bg-theme-header">
      <h1 className="text-4xl font-bold mb-8">Lorem ipsum.</h1>

      <div className="bg-green-500 p-6 rounded-2xl shadow-lg w-120">
        <div className="bg-theme-green border-2 border-dashed border-green-500 rounded-xl p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4 flex items-center justify-center">
            <FolderOpen size={40}/>
          </div>
          <button className="bg-orange-200 text-black font-semibold py-2 px-4 rounded-lg flex items-center gap-2 mx-auto">
            Browse file <Upload size={16} />
          </button>
          <p className="text-gray-600 mt-2">or drop the file here</p>
        </div>
        <p className="text-center text-black mt-4">
          Lorem ipsum dolor sit amet, consetetur sadipscing
        </p>
      </div>

      <button className="bg-orange-200 text-black font-bold py-3 px-6 mt-6 rounded-lg flex items-center gap-2">
        Lorem ipsum. <ArrowRight size={16} />
      </button>
    </div>
  );
}
