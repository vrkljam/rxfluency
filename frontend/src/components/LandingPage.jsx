const LandingPage = () => {
  return (
    <>
      {/* HERO */}
      <div className="landing">
        <div className="landing-overlay">
          <h1 className="landing-title">RxFluency</h1>

          <p className="landing-subtitle">Become fluent in medication names.</p>

          <div className="landing-actions">
            <a
              href="practice-selection"
              className="btn btn-primary btn-lg mb-3"
            >
              Start Practicing
            </a>
          </div>
          {/* BLURB SECTION */}
          <section className="landing-blurb">
            <div className="landing-blurb-inner">
              <h2>What is RxFluency?</h2>

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

          <p className="landing-footnote">
            Free access during beta · Sign-in coming soon
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
