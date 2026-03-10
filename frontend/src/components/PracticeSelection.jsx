import React from "react";
import { useNavigate } from "react-router-dom";

const PracticeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h2 className="mb-5">Choose a Practice Mode</h2>

      <div className="d-flex gap-4">
        <div
          className="card p-4 selectable text-center"
          style={{
            cursor: "pointer",
            minWidth: "150px",
            background: "linear-gradient(135deg, #4e73df, #1cc88a)",
            color: "white",
            fontWeight: "600",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onClick={() => navigate("/quizsetup2")}
        >
          Quiz
        </div>

        <div
          className="card p-4 selectable text-center"
          style={{
            cursor: "pointer",
            minWidth: "150px",
            background: "linear-gradient(135deg, #4e73df, #1cc88a)",
            color: "white",
            fontWeight: "600",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onClick={() => navigate("/flashcards")}
        >
          Flashcards
        </div>
      </div>
    </div>
  );
};

export default PracticeSelection;
