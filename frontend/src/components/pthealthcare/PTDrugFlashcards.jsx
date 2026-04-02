import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./ptflashcards.css";

function PTDrugFlashcards() {
  const [drugs, setDrugs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    api
      .get("/pthealthcare/drugs/")
      .then((res) => setDrugs(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (drugs.length === 0) return <p className="text-center mt-5">Loading...</p>;

  const drug = drugs[current];

  const nextCard = () => {
    setFlipped(false);
    setCurrent((prev) => (prev === drugs.length - 1 ? 0 : prev + 1));
  };

  const prevCard = () => {
    setFlipped(false);
    setCurrent((prev) => (prev === 0 ? drugs.length - 1 : prev - 1));
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">PT Drug Flashcards</h1>

      {/* new way */}
      <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard ${flipped ? "flipped" : ""}`}>
          {/* FRONT */}
          <div className="flashcard-face shadow-lg">
            <div className="flashcard-content">
              <h2>{drug.name}</h2>
              <p className="text-muted">{drug.drug_class}</p>
              <p className="mt-3">Tap to reveal key facts</p>
            </div>
          </div>

          {/* BACK */}
          <div className="flashcard-face flashcard-back shadow-lg">
            <div className="flashcard-content">
              <h5>Mechanism</h5>
              <p>
                {drug.facts
                  .filter((f) => f.category === "mechanism")
                  .map((f) => f.text)}
              </p>

              <h5 className="mt-3">Side Effect</h5>
              <p>
                {drug.facts
                  .filter((f) => f.category === "side_effect")
                  .map((f) => f.text)}
              </p>

              <p className="text-muted mt-3">Tap to flip back</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-secondary me-2" onClick={prevCard}>
          Previous
        </button>

        <button className="btn btn-primary" onClick={nextCard}>
          Next
        </button>

        <p className="mt-2 text-muted">
          {current + 1} / {drugs.length}
        </p>
      </div>
    </div>
  );
}

export default PTDrugFlashcards;
