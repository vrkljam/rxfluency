import React from "react";

const ConfidenceButtons = ({ onRate, mode = "numeric" }) => {
  const labeledRatings = [
    { label: "Again", sub: "Keep in rotation", value: 1, class: "btn-again" },
    { label: "Hard", sub: "Keep practicing", value: 2, class: "btn-hard" },
    { label: "Okay", sub: "Still learning", value: 3, class: "btn-okay" },
    { label: "Got it", sub: "Move to confident", value: 4, class: "btn-good" },
    { label: "Easy", sub: "Mastered", value: 5, class: "btn-easy" },
  ];

  if (mode === "labeled") {
    return (
      <div className="rating-buttons mt-4 d-flex justify-content-center flex-wrap gap-2">
        {labeledRatings.map((r) => (
          <button
            key={r.label}
            className={`btn ${r.class} text-center px-3 py-2`}
            onClick={() => onRate(r.value)}
            style={{ minWidth: "90px" }}
          >
            <div style={{ fontWeight: "600" }}>{r.label}</div>
            <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>{r.sub}</div>
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
