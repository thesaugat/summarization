import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressCircle = ({ percentage, label }) => {
  return (
    <div className="w-36 h-36">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#2F855A",
          trailColor: "#ffffff",
        })}
      />
      <div className="text-center text-sm font-medium mt-2">{label}</div>
    </div>
  );
};

export default ProgressCircle;
