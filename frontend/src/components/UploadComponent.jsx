import { Upload, ArrowRight, FolderOpen } from "lucide-react";
import { useState } from "react";
// import ky from "ky";
// import request from 'superagent';
// import axios from "axios";


export default function UploadComponent() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setSelectedFile(file.name);
    }
  };

  const handleUpload = async() => {
    if(!selectedFile){
      setMessage("Please upload the file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    try{
      const res = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setMessage("File uploaded successfully");
      console.log("File Uploaded")
      console.log("Server respponse", res.data);
    }catch(err){
      console.error(err);
      setMessage("File upload Unsuccessfully");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream bg-theme-header">
      <h1 className="text-4xl font-bold mb-8">Upload Your Paper for Smart Summarization</h1>

      <div className="bg-green-500 p-6 rounded-2xl shadow-lg w-120">
        <div className="bg-theme-green border-2 border-dashed border-green-500 rounded-xl p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4 flex items-center justify-center">
            <FolderOpen size={40}/>
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="file-upload"
                  className="cursor-pointer bg-orange-200 text-black font-semibold py-2 px-4 rounded-lg flex items-center gap-2 justify-center"> Browse file <Upload size={16} />
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
                 Selected file: {selectedFile}
              </p>
            )}

          </div>  
          {/* <p className="text-gray-600 mt-2">or drop the file here</p> */}
        </div>
        <p className="text-center text-black mt-4">
        Accepted format: PDF <br/>
        Please upload a research paper or academic document for summarization.
        </p>
      </div>

      <button 
      className="cursor-pointer bg-orange-200 hover:bg-green-500 transition-colors duration-300 text-black font-bold py-3 px-6 mt-6 rounded-lg flex items-center gap-2"
      onClick={handleUpload}>
        Generate Summary <ArrowRight size={16} />
      </button>

      {message && <p className="mt-2 text-sm text-center text-red-500">{message}</p>}
    </div>
  );
}
