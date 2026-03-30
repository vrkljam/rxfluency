import React from "react";

const Flashcard = ({ card, flipped, setFlipped, isSpinning, isScattering }) => {
  if (!card) return null;

  const gradients = [
    "linear-gradient(135deg, #4fc1b8, #2b7d73)",
    "linear-gradient(135deg, #6a11cb, #2575fc)",
    "linear-gradient(135deg, #ff6a00, #ee0979)",
    "linear-gradient(135deg, #11998e, #38ef7d)",
    "linear-gradient(135deg, #fc466b, #3f5efb)",
  ];

  const getGradient = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  };

  return (
    <div className="flashcard-clip">
      <div
        // className={`shadow-sm flashcard ${flipped ? "flipped" : ""} ${isSpinning ? "spinning" : ""}`}
        className={`flashcard 
    ${flipped ? "flipped" : ""} 
    ${isScattering ? "scatter" : ""}
  `}
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
          <div className="mt-3">
            {card.classes.map((c) => (
              <span
                key={c.id}
                className="badge badge-custom me-2"
                style={{ background: getGradient(c.name) }}
              >
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
