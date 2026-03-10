import React, { useEffect, useState } from "react";
import axios from "axios";

// Shuffle array helper
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function PTHealthcareFillInQuiz() {
  const [drugs, setDrugs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [studyMode, setStudyMode] = useState(true);

  // Load all drugs from API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pthealthcare/drugs/")
      .then((res) => {
        setDrugs(shuffleArray(res.data));
      })
      .catch((err) => console.error(err));
  }, []);

  const drug = drugs[currentIndex] || null;

  // Prepare facts array (with category)
  const facts = drug?.facts ? shuffleArray([...drug.facts]) : [];

  // Initialize inputs whenever the drug changes
  useEffect(() => {
    if (drug) {
      setInputs(facts.map(() => ""));
      setShowScore(false);
      setScore(0);
    }
  }, [drug]);

  // Handle input changes
  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // Check answers
  const checkAnswers = () => {
    let correct = 0;
    inputs.forEach((input, i) => {
      if (input.trim().toLowerCase() === facts[i].text.trim().toLowerCase()) {
        correct++;
      }
    });
    setScore(correct);
    setShowScore(true);
  };

  // Next drug
  const nextDrug = () => {
    const nextIndex = Math.floor(Math.random() * drugs.length);
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="container mt-4 text-center">
      {!drug ? (
        <p>Loading PT Healthcare drugs...</p>
      ) : (
        <>
          {/* Study / Test Mode Toggle */}
          <div className="mb-3">
            <button
              className={`btn me-2 ${
                studyMode ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => setStudyMode(true)}
            >
              Study Mode
            </button>
            <button
              className={`btn ${!studyMode ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setStudyMode(false)}
            >
              Test Mode
            </button>
          </div>

          <h2 className="mb-3">{drug.name}</h2>
          <p className="text-muted">{drug.drug_class}</p>
          <p className="text-muted mb-3">Fill in the facts for this drug:</p>

          {/* Facts Inputs */}
          {facts.map((factObj, i) => {
            const fact = factObj.text;
            const category = factObj.category.replace("_", " ");
            const isCorrect =
              inputs[i]?.trim().toLowerCase() === fact.trim().toLowerCase();

            return (
              <div className="mb-3" key={i}>
                <label className="form-label fw-bold">{category}</label>
                <input
                  type="text"
                  placeholder={`Enter ${category}`}
                  className={`form-control text-center ${
                    showScore || studyMode
                      ? isCorrect
                        ? "border-success"
                        : "border-danger"
                      : ""
                  }`}
                  value={inputs[i] || ""}
                  onChange={(e) => handleChange(i, e.target.value)}
                  disabled={showScore || studyMode}
                />
                {(showScore || studyMode) && !isCorrect && (
                  <small className="text-danger">Correct: {fact}</small>
                )}
                {(showScore || studyMode) && isCorrect && (
                  <small className="text-success">Correct!</small>
                )}
              </div>
            );
          })}

          {/* Buttons */}
          <div className="mt-4">
            <button
              className="btn btn-secondary me-2"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? drugs.length - 1 : prev - 1,
                )
              }
            >
              Previous Drug
            </button>

            <button className="btn btn-primary me-2" onClick={() => nextDrug()}>
              Random Drug
            </button>

            <button
              className="btn btn-secondary"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === drugs.length - 1 ? 0 : prev + 1,
                )
              }
            >
              Next Drug
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PTHealthcareFillInQuiz;
