import React, { useEffect, useState } from "react";
import axios from "axios";

function PTHealthcareQuiz() {
  const [drugs, setDrugs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFact, setShowFact] = useState("");

  useEffect(() => {
    axios
      .get("/api/pthealthcare/drugs/")
      .then((res) => setDrugs(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (drugs.length === 0) {
    return <div className="container mt-4">No PT Healthcare drugs yet.</div>;
  }

  const drug = drugs[currentIndex];

  const nextDrug = () => {
    setShowFact("");
    setCurrentIndex((prev) => (prev + 1) % drugs.length);
  };

  return (
    <div className="container mt-4 text-center">
      <h2>{drug.name}</h2>

      <div className="my-3">
        {[...Array(10)].map((_, i) => {
          const fact = drug[`fact_${i + 1}`];

          if (!fact) return null;

          return (
            <button
              key={i}
              className="btn btn-outline-primary m-1"
              onClick={() => setShowFact(fact)}
            >
              Fact {i + 1}
            </button>
          );
        })}
      </div>

      {showFact && (
        <div className="card p-3 mt-3">
          <h5>{showFact}</h5>
        </div>
      )}

      <button className="btn btn-secondary mt-4" onClick={nextDrug}>
        Next Drug
      </button>
    </div>
  );
}

export default PTHealthcareQuiz;
