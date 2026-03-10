<div className="card shadow-sm">
  <div className="card-header d-flex justify-content-between align-items-center">
    <span>
      {mode === "brand_to_generic" ? "Brand → Generic" : "Generic → Brand"}
    </span>
    {timeLimit && (
      <span className={`timer ${timeLeft <= 10 ? "flash" : ""}`}>
        Time: {timeLeft}s
      </span>
    )}
  </div>

  <div className="card-body">
    <div className="mb-3 text-center text-muted">
      Question {total + 1} of {limit}
    </div>

    <h4 className="text-center mb-4">{question?.question}</h4>

    {feedback && (
      <div className={`alert alert-${feedback.type} text-center`} role="alert">
        {feedback.text}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control form-control-lg mb-2"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type your answer"
      />
      <small className="text-muted d-block mb-3 text-center">
        Enter = submit / ← previous / → next
      </small>
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  </div>

  <div className="card-footer d-flex justify-content-between">
    {currentIndex > 0 && (
      <button
        className="btn btn-outline-secondary"
        onClick={goToPreviousQuestion}
      >
        ← Previous
      </button>
    )}
    {total < limit && (
      <button className="btn btn-secondary" onClick={nextQuestion}>
        Next →
      </button>
    )}
  </div>
</div>;
