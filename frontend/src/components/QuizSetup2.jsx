import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeSelector from "./TimeSelector";

const QuizSetup2 = () => {
  const [direction, setDirection] = useState(null);
  const [questionCount, setQuestionCount] = useState(null);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();

  const isReady = direction && questionCount !== null && timer !== undefined;

  const cardClass = (selected) =>
    `card p-4 flex-fill text-center selectable ${
      selected
        ? "border-success shadow-lg scale-up"
        : "border-light shadow-sm scale-normal"
    }`;

  const cardStyle = {
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #4e73df, #1cc88a)",
    color: "white",
    fontWeight: "600",
    minWidth: "120px",
    flex: "1",
  };

  const handleStartQuiz = () => {
    navigate("/quiznew2", {
      state: {
        direction,
        limit: questionCount,
        timeLimit: timer, // numeric seconds or null
      },
    });
  };

  return (
    <div className="d-flex flex-column align-items-center text-center">
      <div style={{ maxWidth: "700px", width: "100%" }}>
        <h4 className="mb-3 fs-1">Quiz</h4>

        {/* Instructions */}
        <div className="card p-3 mb-4 shadow-sm text-start">
          <h5 className="mb-2">How This Quiz Works 🧪</h5>

          <ul className="mb-2">
            <li>
              Choose the direction: <strong>Brand → Generic</strong> or{" "}
              <strong>Generic → Brand</strong>.
            </li>
            <li>Select how many questions you want.</li>
            <li>(Optional) Add a timer for exam-style pressure.</li>
            <li>Answer each question and test your recall.</li>
          </ul>

          <hr />

          <h6 className="mb-1">Tips for Success 🎯</h6>
          <ul className="mb-0">
            <li>Focus on accuracy first, then speed.</li>
            <li>Use timed mode once you're comfortable.</li>
            <li>Review missed questions — that’s where learning happens.</li>
          </ul>
        </div>
      </div>
      {/* Question Direction */}
      <div className="card p-3 mb-4">
        <h5 className="mb-3">Question Direction</h5>
        <div className="d-flex gap-3">
          <div
            className={cardClass(direction === "brand_to_generic")}
            style={cardStyle}
            onClick={() => setDirection("brand_to_generic")}
          >
            Brand → Generic
          </div>
          <div
            className={cardClass(direction === "generic_to_brand")}
            style={cardStyle}
            onClick={() => setDirection("generic_to_brand")}
          >
            Generic → Brand
          </div>
        </div>
      </div>

      {/* Number of Questions */}
      <div className="card p-3 mb-4">
        <h5 className="mb-3">Number of Questions</h5>
        <div className="d-flex gap-3">
          {[50, 100, 200].map((num) => (
            <div
              key={num}
              className={cardClass(questionCount === num)}
              style={cardStyle}
              onClick={() => setQuestionCount(num)}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Timer Selector */}
      <TimeSelector selected={timer} onSelect={(t) => setTimer(t)} />

      {/* Start Quiz Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-primary btn-lg"
          disabled={!isReady}
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
        {!isReady && (
          <p className="text-muted mt-2">
            Please select all options to start the quiz.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizSetup2;
