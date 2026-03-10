import React from "react";

const ProgressBar = ({ current, total }) => {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="mb-4">
      <p>Progress: {percent}%</p>
      <div className="progress" style={{ height: "20px" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${percent}%` }}
        >
          {percent}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
