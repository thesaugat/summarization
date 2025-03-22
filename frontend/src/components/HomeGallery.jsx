import React from "react";
import { LucideArrowBigRight } from "lucide-react";

const GalleryCard = ({ bgColor, label, description }) => {
  return (
    <div
      className={`rounded-lg overflow-hidden ${bgColor} p-4 flex flex-col justify-between h-full`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Lorem ipsum.</h3>
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
        Lorem ipsum dolor sit amet,
        <br />
        consetetur sadipscing elitr, sed
      </h1>

      {/* Gallery Grid */}

      <div className="grid grid-cols-3 gap-4">
        {/* First row */}
        <div className="col-span-2 bg-indigo-100 rounded-lg h-48 relative">
          <GalleryCard
            bgColor="bg-indigo-100"
            label="Learn more"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et."
          />
          {/* Placeholder for person working on laptop image */}
          <div className="absolute right-2 bottom-2 w-28 h-28">
            <img
              src="/api/placeholder/112/112"
              alt="Person working on laptop"
              className="object-cover rounded"
            />
          </div>
        </div>

        {/* Second row */}
        <div className="col-span-1 row-span-2 bg-indigo-100 rounded-lg h-100 relative">
          <GalleryCard
            bgColor="bg-indigo-100"
            label="Learn more"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
          />
          {/* Placeholder for product image */}
          <div className="absolute right-2 bottom-2 w-20 h-20">
            <img
              src="/api/placeholder/80/80"
              alt="Product"
              className="object-cover rounded"
            />
          </div>
        </div>

        <div className="col-span-1 bg-indigo-100 rounded-lg h-48 relative">
          <GalleryCard
            bgColor="bg-indigo-100"
            label="Learn more"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et."
          />
          {/* Placeholder for person writing image */}
          <div className="absolute right-2 bottom-2 w-28 h-28">
            <img
              src="/api/placeholder/112/112"
              alt="Person writing"
              className="object-cover rounded"
            />
          </div>
        </div>

        <div className="col-span-1 bg-indigo-100 rounded-lg h-48 relative">
          <GalleryCard
            bgColor="bg-indigo-100"
            label="Learn more"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
          />
          {/* Placeholder for tablet image */}
          <div className="absolute right-2 bottom-2 w-20 h-20">
            <img
              src="/api/placeholder/80/80"
              alt="Tablet"
              className="object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGallery;
