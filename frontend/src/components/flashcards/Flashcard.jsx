import React from "react";
import { getClassStyle } from "../../utils/pharma";

const Flashcard = ({ card, flipped, setFlipped, isSpinning, isScattering }) => {
  if (!card) return null;

  return (
    <div className="flashcard-clip">
      <div
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

          {/* ✅ NEW: Smart class badges */}
          <div className="mt-3">
            {card.classes.map((c) => {
              const style = getClassStyle(c.name);

              return (
                <span
                  key={c.id}
                  className="badge badge-custom me-2"
                  style={{ background: style.gradient }}
                  title={style.label}
                >
                  <i className={`bi ${style.icon}`}></i>
                  {c.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
