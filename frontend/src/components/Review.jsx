import React from "react";

const Review = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center mt-5">
        <h5>No quiz history to review</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4 p-4">
      <h3 className="mb-4 text-center">Quiz Review</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, i) => (
            <tr
              key={i}
              className={h.isCorrect ? "table-success" : "table-danger"}
            >
              <td>{h.question}</td>
              <td>{h.user}</td>
              <td>{h.correct}</td>
              <td>{h.isCorrect ? "✓" : "✗"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Review;
