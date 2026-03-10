import React from "react";

const LengthSelector = ({ mode, onSelectLimit, onBack }) => {
  return (
    <div className="text-center mb-4">
      {mode === "brand_to_generic" ? (
        <h3> Brand → Generic</h3>
      ) : (
        <h3>Generic → Brand</h3>
      )}

      <h4 className="mb-3"> Choose number of questions</h4>

      {[5, 50, 100, 200].map((n) => (
        <button
          key={n}
          className="btn btn-outline-primary me-2"
          onClick={() => onSelectLimit(n)}
        >
          {n}
        </button>
      ))}
    </div>
  );
};

export default LengthSelector;
