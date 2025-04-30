import { Upload, ArrowRight, FolderOpen, CheckCircle, XCircle, FileText, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileError, setFileError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = Math.max(1, 10 - Math.floor(prevProgress / 10));
          const newProgress = prevProgress + increment;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    setFileError(null);

    if (file.type !== "application/pdf") {
      setFileError("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("File size should be less than 10MB");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     triggerOverlay("Please upload a file first", false);
  //     return;
  //   }

  //   setIsLoading(true);
  //   setProgress(0);

  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   try {
  //     // Simulate network delay
  //     await new Promise(resolve => setTimeout(resolve, 3000));

  //     const res = await fetch("http://127.0.0.1:8000/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) {
  //       throw new Error("Upload failed");
  //     }

  //     setProgress(100);
  //     await new Promise(resolve => setTimeout(resolve, 500));

  //     const data = await res.json();
  //     console.log("Server response", data);
  //     triggerOverlay("Your paper has been successfully processed! The summary is ready.", true);
  //   } catch (err) {
  //     console.error(err);
  //     triggerOverlay("There was an error processing your file. Please try again.", false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleUpload = async () => {
    if (!selectedFile) {
      triggerOverlay("Please upload a file first", false);
      return;
    }

    setIsLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
        mode: 'cors',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));

      const data = await res.json();
      console.log("Server response", data);

      // Check if ml_result is not null
      if (data.ml_result !== null && data.ml_result !== "") {
        // Redirect to paper-analysis page with the data
        window.location.href = `/paper-analysis?data=${encodeURIComponent(JSON.stringify(data))}`;
      } else {
        // Show success message if no redirect
        triggerOverlay("Your paper has been successfully processed! The summary is ready.", true);
      }
    } catch (err) {
      console.error(err);
      triggerOverlay("There was an error processing your file. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setSelectedFile(null);
    setFileName(null);
    setFileError(null);
  };

  const triggerOverlay = (message, success) => {
    setOverlayMessage(message);
    setIsSuccess(success);
    setShowOverlay(true);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-32 pb-16 px-4 bg-gray-50">
      <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">Paper Summarizer AI</h1>
          <p className="text-indigo-100 mt-2 text-center">Upload your research paper for instant, smart summarization</p>
        </div>

        <div className="p-8">
          <div
            className={`border-2 border-dashed rounded-xl p-10 transition-all duration-300 
              ${dragActive
                ? 'border-indigo-500 bg-indigo-50'
                : fileError
                  ? 'border-red-300 bg-red-50'
                  : selectedFile
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              id="file-upload"
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            {selectedFile ? (
              <div className="flex flex-col items-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <FileText size={28} className="text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">File Selected</h3>
                <p className="text-green-700 font-medium mb-3">
                  {fileName}
                </p>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={resetForm}
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm px-3 py-1.5 border border-gray-300 rounded-md transition-colors duration-200"
                  >
                    <RefreshCw size={14} /> Change file
                  </button>
                </div>
              </div>
            ) : fileError ? (
              <div className="flex flex-col items-center">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <AlertCircle size={28} className="text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-red-900 mb-1">Upload Error</h3>
                <p className="text-red-700 text-center mb-3">{fileError}</p>
                <button
                  onClick={resetForm}
                  className="text-white bg-red-600 hover:bg-red-700 flex items-center gap-1 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="text-gray-400 mb-6 flex items-center justify-center">
                  <FolderOpen size={48} className={dragActive ? "text-indigo-500" : ""} />
                </div>

                <h3 className="text-xl font-medium text-gray-900 mb-3 text-center">
                  {dragActive ? "Drop your file here" : "Upload your research paper"}
                </h3>

                <p className="text-gray-500 mb-6 text-center max-w-sm mx-auto">
                  {dragActive
                    ? "Release to upload"
                    : "Drag & drop your PDF file here, or click the button below"}
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={onButtonClick}
                    className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
                  >
                    Browse Files <Upload size={16} />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium">Accepted format:</span> PDF (max 10MB)
            </p>
            <p className="text-gray-500 text-xs">
              Your document will be processed securely and privately
            </p>
          </div>
        </div>

        <div className="px-8 pb-8 pt-0">
          {isLoading ? (
            <div className="w-full">
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-indigo-700">{
                  progress < 30 ? "Uploading file..." :
                    progress < 60 ? "Processing document..." :
                      progress < 90 ? "Generating summary..." :
                        "Finalizing..."
                }</span>
                <span className="text-sm font-medium text-indigo-700">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-center mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-700"></div>
              </div>
            </div>
          ) : (
            <button
              className={`w-full cursor-pointer transition-all duration-300 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 shadow-sm ${selectedFile
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
            >
              Generate Summary <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Overlay/Modal */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setShowOverlay(false)}
        >
          <div
            className={`p-6 rounded-xl shadow-xl max-w-md mx-auto flex flex-col items-center justify-center transform transition-all duration-300 scale-100 ${isSuccess ? "bg-white border-l-4 border-green-500" : "bg-white border-l-4 border-red-500"
              }`}
            onClick={e => e.stopPropagation()}
          >
            {isSuccess ? (
              <CheckCircle size={48} className="text-green-500 mb-4" />
            ) : (
              <XCircle size={48} className="text-red-500 mb-4" />
            )}

            <h3 className={`text-xl font-bold mb-2 ${isSuccess ? "text-green-700" : "text-red-700"}`}>
              {isSuccess ? "Success!" : "Something went wrong"}
            </h3>

            <p className="text-gray-600 text-center mb-4">
              {overlayMessage}
            </p>

            <button
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${isSuccess
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              onClick={() => setShowOverlay(false)}
            >
              {isSuccess ? "Continue" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}