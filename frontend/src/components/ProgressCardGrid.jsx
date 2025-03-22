import React from "react";

const ProgressCard = ({ color, items }) => {
  // Map color names to background and accent colors
  const colorMap = {
    pink: { bg: "bg-theme-red", accent: "bg-red-300" },
    green: { bg: "bg-theme-green", accent: "bg-green-300" },
    orange: { bg: "bg-theme-yellow", accent: "bg-yellow-400" },
    purple: { bg: "bg-theme-purple", accent: "bg-purple-300" },
  };

  const { bg, accent } = colorMap[color];

  return (
    <div className={`${bg} p-6 rounded-3xl shadow-md w-64`}>
      <div className="mb-4">
        <h3 className="font-bold text-lg">Lorem ipsum.</h3>
        <p className="text-sm">
          Lorem ipsum dolor sit amet,
          <br />
          consetetur sadipscing elitr, sed
        </p>
      </div>

      {items.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-1">
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center mr-2 ${accent}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                />
              </svg>
            </div>
            <span className="text-sm">Lorem ipsum.</span>
            <span className="ml-auto text-sm">{item.percentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${accent}`}
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const ProgressCardGrid = () => {
  const cards = [
    {
      color: "pink",
      items: [{ percentage: 30 }, { percentage: 60 }, { percentage: 70 }],
    },
    {
      color: "green",
      items: [{ percentage: 30 }, { percentage: 60 }, { percentage: 70 }],
    },
    {
      color: "orange",
      items: [{ percentage: 30 }, { percentage: 60 }, { percentage: 70 }],
    },
    {
      color: "purple",
      items: [{ percentage: 30 }, { percentage: 60 }, { percentage: 70 }],
    },
  ];

  return (
    <div className="flex flex-wrap gap-8 justify-center p-20">
      {cards.map((card, index) => (
        <ProgressCard key={index} color={card.color} items={card.items} />
      ))}
    </div>
  );
};

export default ProgressCardGrid;
