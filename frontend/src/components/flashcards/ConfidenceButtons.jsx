import React from "react";

const ConfidenceButtons = ({ onRate, mode = "numeric" }) => {
  // mode: "numeric" (default) or "labeled"
  const labeledRatings = [
    { label: "Again", value: 1 },
    { label: "Hard", value: 2 },
    { label: "Maybe", value: 3 },
    { label: "Good", value: 4 },
    { label: "Easy", value: 5 },
  ];

  if (mode === "labeled") {
    return (
      <div className="rating-buttons mt-4">
        {labeledRatings.map((r) => (
          <button
            key={r.label}
            className="btn btn-outline-primary me-2"
            onClick={() => onRate(r.value)}
          >
            {r.label}
          </button>
        ))}
      </div>
    );
  }

  // default numeric 1–5 buttons
  return (
    <div className="mt-4">
      <div className="mb-2">How confident are you?</div>
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          className="btn btn-outline-primary me-2"
          onClick={() => onRate(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default ConfidenceButtons;
