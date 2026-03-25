import React from "react";
import { useNavigate } from "react-router-dom";

const MedicalDisclaimer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // fallback
    }
  };

  return (
    <div className="landing">
      <div className="landing-overlay">
        <h1 className="landing-title">Medical Disclaimer</h1>

        <div className="landing-blurb no-pulse">
          <div className="landing-blurb-inner">
            <p>
              <strong>Important:</strong> RxFluency is an{" "}
              <strong>educational tool only</strong>.
            </p>
            <ul>
              <li>
                <strong>Not Medical Advice:</strong> Content does not constitute
                medical advice. Always consult a licensed healthcare
                professional.
              </li>
              <li>
                <strong>Accuracy of Information:</strong> We strive for accuracy
                but make no guarantees about completeness or correctness.
              </li>
              <li>
                <strong>No Substitute for Professional Care:</strong> Quizzes
                and flashcards cannot replace professional evaluation,
                diagnosis, or treatment.
              </li>
              <li>
                <strong>Risks:</strong> RxFluency is not responsible for any
                consequences from the use of this information.
              </li>
            </ul>

            <button className="btn btn-primary" onClick={handleBack}>
              &larr; Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
