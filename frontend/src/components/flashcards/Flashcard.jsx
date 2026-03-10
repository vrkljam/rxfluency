import React from "react";

const Flashcard = ({ card, flipped, setFlipped, isSpinning }) => {
  if (!card) return null;

  return (
    <div className="flashcard-clip">
      <div
        className={`shadow-sm flashcard ${flipped ? "flipped" : ""} ${isSpinning ? "spinning" : ""}`}
        onClick={() => !isSpinning && setFlipped(!flipped)}
      >
        {/* Front */}
        <div className="flashcard-face flashcard-front d-flex flex-column justify-content-center align-items-center text-center">
          <div className="small text-muted mb-2">Brand Name</div>
          <div className="fs-4 fw-bold">
            {Array.isArray(card.brands)
              ? card.brands.map((b) => b.name).join(" / ")
              : card.brands.name}
          </div>
        </div>

        {/* Back */}
        <div className="flashcard-face flashcard-back d-flex flex-column justify-content-center align-items-center text-center">
          <div className="small text-muted mb-2">Generic Name</div>
          <div className="fs-4 fw-bold">
            {Array.isArray(card.generic_name)
              ? card.generic_name.join(" / ")
              : card.generic_name}
          </div>

          {/* Class list */}
          <div className="text-muted mt-2 small">
            {card.classes.map((c) => c.name).join(" • ")}
          </div>

          {/* Class badges */}
          <div className="mt-3">
            {card.classes.map((c) => (
              <span key={c.id} className="badge bg-secondary me-2">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
