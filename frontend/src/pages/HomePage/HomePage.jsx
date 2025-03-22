import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProgressCardGrid from "../../components/ProgressCardGrid";
import DashboardHome from "../../components/DashboardHome";
import HomeGallery from "../../components/HomeGallery";
import HomeData from "../../components/HomeData";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <ProgressCardGrid />
        <HomeData/>
        {/* <DashboardHome /> */}
        <HomeGallery />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
