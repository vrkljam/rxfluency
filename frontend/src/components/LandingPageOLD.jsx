import React, { useState } from "react";
import QuizSetup from "./QuizSetup";
import Flashcards from "./FlashCards";

const LandingPage = () => {
  const [selection, setSelection] = useState(null);

  // When user clicks "Start Practicing", show selection cards
  if (selection === "quiz") {
    return (
      <QuizSetup onStartQuiz={(data) => console.log("Quiz started:", data)} />
    );
  }

  if (selection === "flashcards") {
    return <Flashcards />;
  }

  return (
    <>
      {/* HERO */}
      <div className="landing">
        <div className="landing-overlay">
          <h1 className="landing-title">RxFluent</h1>
          <p className="landing-subtitle">Become fluent in medication names.</p>

          <div className="landing-actions d-flex justify-content-center gap-4">
            <div
              className="card p-4 selectable text-center"
              style={{
                cursor: "pointer",
                minWidth: "150px",
                background: "linear-gradient(135deg, #4e73df, #1cc88a)",
                color: "white",
                fontWeight: "600",
                borderRadius: "12px",
                boxShadow: "0 0.125rem 0.25rem rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onClick={() => setSelection("quiz")}
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
                boxShadow: "0 0.125rem 0.25rem rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onClick={() => setSelection("flashcards")}
            >
              Flashcards
            </div>
          </div>

          {/* BLURB SECTION */}
          <section className="landing-blurb mt-4">
            <div className="landing-blurb-inner">
              <h2>What is RxFluent?</h2>
              <p>
                RxFluent helps you become fluent in medication names through
                focused, high-yield practice.
              </p>
              <p>
                Train brand-to-generic and generic-to-brand recall with smart
                quizzes, flashcards, and review tools designed for long-term
                retention.
              </p>
              <p>
                Whether you’re a student or a clinician, RxFluent makes
                mastering drug names fast, effective, and confidence-building.
              </p>
            </div>
          </section>

          <p className="landing-footnote mt-4">
            Free access during beta · Sign-in coming soon
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
