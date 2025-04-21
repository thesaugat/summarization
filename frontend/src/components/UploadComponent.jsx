import { Upload, ArrowRight, FolderOpen, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export default function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      triggerOverlay("Please upload the file.", false);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      console.log("Server response", data);
      triggerOverlay("File uploaded successfully!", true);
    } catch (err) {
      console.error(err);
      triggerOverlay("File upload unsuccessful.", false);
    }
  };

  const triggerOverlay = (message, success) => {
    setOverlayMessage(message);
    setIsSuccess(success);
    setShowOverlay(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream bg-theme-header relative">
      <h1 className="text-4xl font-bold mb-8">Upload Your Paper for Smart Summarization</h1>

      <div className="bg-green-500 p-6 rounded-2xl shadow-lg w-120">
        <div className="bg-theme-green border-2 border-dashed border-green-500 rounded-xl p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4 flex items-center justify-center">
            <FolderOpen size={40} />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="file-upload"
              className="cursor-pointer bg-orange-200 text-black font-semibold py-2 px-4 rounded-lg flex items-center gap-2 justify-center">
              Browse file <Upload size={16} />
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </label>
            {selectedFile && (
              <p className="text-red-700 font-medium text-sm mt-3">
                Selected file: {fileName}
              </p>
            )}
          </div>
        </div>
        <p className="text-center text-black mt-4">
          Accepted format: PDF <br />
          Please upload a research paper or academic document for summarization.
        </p>
      </div>

      <button
        className="cursor-pointer bg-orange-200 hover:bg-green-500 transition-colors duration-300 text-black font-bold py-3 px-6 mt-6 rounded-lg flex items-center gap-2"
        onClick={handleUpload}>
        Generate Summary <ArrowRight size={16} />
      </button>

      {showOverlay && (
        <div className="fixed inset-0 bg-gray bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
        <div className={`p-6 rounded-xl shadow-lg text-center h-50 w-100 flex flex-col items-center justify-center ${isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
        {isSuccess ? <CheckCircle size={40} className="text-green-600 mb-2" /> : <XCircle size={48} className="text-red-600 mb-4 mx-auto" />}
          
            <p className="text-lg font-medium">{overlayMessage}</p>
            <button
              className="mt-4 bg-white border rounded px-4 py-1 hover:bg-gray-100 w-30 cursor-pointer"
              onClick={() => setShowOverlay(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}