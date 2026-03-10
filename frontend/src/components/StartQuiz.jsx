import React from "react";

const StartQuiz = ({ onStart }) => {
  return (
    <div className="text-center mt-4">
      <button
        className="btn btn-primary btn-lg"
        onClick={onStart}
        disabled={!onStart}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartQuiz;
