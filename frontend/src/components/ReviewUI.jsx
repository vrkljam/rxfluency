const ReviewUI = ({ state, dispatch }) => {
  const { history, currentIndex, limit, mode } = state;
  const item = history[currentIndex];

  if (!item) return null;

  return (
    <div className="container-fluid mt-4 p-4 w-100">
      <div className="card shadow-sm mx-auto">
        <div className="card-header d-flex justify-content-between">
          <span>
            {mode === "brand_to_generic"
              ? "Brand → Generic"
              : "Generic → Brand"}
          </span>
          <span>
            Question {currentIndex + 1} / {limit}
          </span>
        </div>

        <div className="card-body text-center">
          <h4 className="mb-4">{item.question}</h4>

          <p className="fs-5">
            <strong>Your answer:</strong>{" "}
            <span className={item.isCorrect ? "text-success" : "text-danger"}>
              {item.user}
            </span>
          </p>

          <p className="fs-5">
            <strong>Correct answer:</strong>{" "}
            <span className="text-success">{item.correct}</span>
          </p>

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-secondary"
              disabled={currentIndex === 0}
              onClick={() => dispatch({ type: "REVIEW_PREV" })}
            >
              ← Previous
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled={currentIndex === history.length - 1}
              onClick={() => dispatch({ type: "REVIEW_NEXT" })}
            >
              Next →
            </button>
          </div>

          <button
            className="btn btn-link mt-3"
            onClick={() => dispatch({ type: "EXIT_REVIEW" })}
          >
            ← Back to summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewUI;
