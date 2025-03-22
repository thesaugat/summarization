import React from "react";
import ResearchPaperGrid from "../../components/ResearchPaperGrid";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const HistoryPage = () => {
  return (
    <>
      <Header/>
      <div className="">
        <ResearchPaperGrid />
      </div>
      <Footer/>
    </>
  );
};

export default HistoryPage;
