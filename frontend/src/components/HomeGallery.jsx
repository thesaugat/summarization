import React from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

import { LucideArrowBigRight } from "lucide-react";

const GalleryCard = ({ bgColor, label, description }) => {
  return (
    <div
      className={`rounded-lg overflow-hidden ${bgColor} p-4 flex flex-col justify-between h-full`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Pro Tip</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </div>

      <button className="text-xs font-semibold bg-theme-yellow border border-amber-400 w-30 h-8 flex rounded-lg justify-center items-center gap-2">
        <span>{label}</span>
        <LucideArrowBigRight />
      </button>
    </div>
  );
};

const HomeGallery = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Need clarity? 
        <br />
        Check out our quick lessons.
      </h1>

      {/* Gallery Grid */}

      <div className="grid grid-cols-3 gap-4">
        {/* First row */}
        <div className="col-span-2 bg-indigo-100 rounded-lg h-48 relative">
          <GalleryCard
            bgColor="bg-indigo-100"
            label="Learn more"
            description="Discover how our platform simplifies paper analysis using AI-powered tools that save you time and deliver deep insights."
          />
          {/* Placeholder for person working on laptop image */}
          <div className="absolute right-2 bottom-2 w-28 h-28">
            {/* <img
              src={img1}
              alt="Person working on laptop"
              className="object-cover rounded"
            /> */}
          </div>
        </div>

        {/* Second row */}
        <div className="col-span-1 row-span-2 bg-indigo-100 rounded-lg h-100 relative">
          <GalleryCard
            bgColor="bg-indigo-100"
            label="Learn more"
            description="Learn how our app uses ML models to intelligently break down your paper into sections like abstract, methodology, and references."
          />
          {/* Placeholder for product image */}
          <div className="absolute right-2 bottom-2 w-20 h-20">
            {/* <img
              src={img3}
              alt="Product"
              className="object-cover rounded"
            /> */}
          </div>
        </div>

        <div className="col-span-1 bg-indigo-100 rounded-lg h-48 relative">
          <GalleryCard
            bgColor="bg-indigo-100"
            label="Learn more"
            description="See how to upload your research paper and what results you’ll get — from data extraction to similarity analysis."
          />
          {/* Placeholder for person writing image */}
          <div className="absolute right-2 bottom-2 w-28 h-28">
            {/* <img
              src={img2}
              alt="Person writing"
              className="object-cover rounded"
            /> */}
          </div>
        </div>

        <div className="col-span-1 bg-indigo-100 rounded-lg h-48 relative">
          <GalleryCard
            bgColor="bg-indigo-100"
            label="Learn more"
            description="Explore upcoming updates like advanced citation checks, visual summaries, and multi-paper comparison."
          />
          {/* Placeholder for tablet image */}
          <div className="absolute right-2 bottom-2 w-20 h-20">
            {/* <img
              src={img3}
              alt="Tablet"
              className="object-cover rounded"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGallery;
