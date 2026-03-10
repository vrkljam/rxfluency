import { useNavigate } from "react-router-dom";
import CircularProgress from "./CircularProgess";

// Helper to format seconds as MM:SS
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const m = String(minutes).padStart(2, "0");
  const s = String(secs).padStart(2, "0");
  return `${m}:${s}`;
};

const QuizUI2 = ({ state, dispatch }) => {
  const navigate = useNavigate();

  const {
    status,
    direction,
    question,
    userAnswer,
    feedback,
    total,
    limit,
    timeLeft,
  } = state;

  return (
    <div className="card shadow-sm">
      {/* Header */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>
          {direction === "brand_to_generic"
            ? "Brand → Generic"
            : "Generic → Brand"}
        </span>

        {timeLeft !== null && (
          <span
            className={`timer ${
              timeLeft <= 10 && status === "ACTIVE" ? "flash text-danger" : ""
            }`}
          >
            Time remaining: {formatTime(timeLeft)}
          </span>
        )}
      </div>

      <div className="card-body">
        {/* Progress */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-muted">
            {limit > 0 && (
              <div className="text-muted">
                Question {Math.min(total + 1, limit)} of {limit}
              </div>
            )}
          </div>
          {limit > 0 && <CircularProgress current={total} total={limit} />}
        </div>

        {/* Loading */}
        {status === "LOADING" && (
          <div className="text-center py-5">
            <div className="spinner-border" />
          </div>
        )}

        {/* Active Question */}
        {status === "ACTIVE" && (
          <>
            <h4 className="text-center mb-4">{question?.question}</h4>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: "SUBMIT_ANSWER" });
              }}
            >
              <input
                type="text"
                className="form-control form-control-lg"
                value={userAnswer}
                onChange={(e) =>
                  dispatch({
                    type: "ANSWER_TYPED",
                    value: e.target.value,
                  })
                }
                autoFocus
                placeholder={
                  direction === "generic_to_brand"
                    ? "Enter one or more brand names (comma, /, or 'and' separated)"
                    : "Enter the generic name"
                }
              />

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Submit
              </button>
            </form>
          </>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`alert alert-${feedback.type} text-center mt-4`}>
            {feedback.text}
          </div>
        )}

        {/* Finished */}
        {status === "FINISHED" && (
          <div className="alert alert-info text-center mt-4">
            <h5>Quiz Complete</h5>

            <p className="fs-5 mb-3">
              Final score: {state.score} / {state.total}
            </p>

            <p className="fs-5 mb-3">
              Attempted: {state.total} / {state.limit}
            </p>

            <button
              className="btn btn-secondary me-2"
              onClick={() => dispatch({ type: "ENTER_REVIEW" })}
            >
              Review Answers
            </button>

            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {state.history.map((h, i) => {
                  // Normalize correct answers for display
                  const correctDisplay = Array.isArray(h.correct)
                    ? h.correct.join(" / ") // shows multiple answers separated with /
                    : h.correct;

                  // Normalize user answers for display
                  const userDisplay = h.user
                    .split(/,|\/|and/i)
                    .map((a) => a.trim())
                    .join(" / ");

                  return (
                    <tr
                      key={i}
                      className={h.isCorrect ? "table-success" : "table-danger"}
                    >
                      <td>{h.question}</td>
                      <td>{userDisplay}</td>
                      <td>{correctDisplay}</td>
                      <td>{h.isCorrect ? "✓" : "✗"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/quizsetup2")}
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizUI2;
