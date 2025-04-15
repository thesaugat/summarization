import { useState } from "react";
// import reactLogo from "../assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaperAnalysisPage from "./pages/PaperAnalysisPage/PaperAnalysisPage";
import HistoryPage from "./pages/History/HistoryPage";
import FileUploadPage from "./pages/FileUploadPage/FileUploadPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/file-upload" element={<FileUploadPage />} />
        <Route path="/paper-analysis" element={<PaperAnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
