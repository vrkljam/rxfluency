import { useEffect, useReducer } from "react";
import api from "../api/api";
import QuizUI2 from "./QuizUI2";
import ReviewUI from "./ReviewUI";
import { useLocation } from "react-router-dom";

const QUIZ_STATUS = {
  LOADING: "LOADING",
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED",
  REVIEW: "REVIEW",
};

const initialState = {
  status: QUIZ_STATUS.LOADING,

  // Quiz parameters (set from location.state)
  direction: null,
  limit: null,
  timeLimit: null,
  timeLeft: null,

  // Quiz runtime
  question: null,
  userAnswer: "",
  feedback: null,
  score: 0,
  total: 0,
  currentIndex: 0,
  history: [],
};

function quizReducer(state, action) {
  switch (action.type) {
    // Initialize next question
    case "QUESTION_LOADED":
      return {
        ...state,
        question: action.question,
        status: QUIZ_STATUS.ACTIVE,
        // timeLeft remains from initial timer
      };

    case "TICK":
      if (state.timeLeft === null) return state; // no timer
      const newTime = state.timeLeft - 1;
      return {
        ...state,
        timeLeft: newTime,
        status: newTime <= 0 ? QUIZ_STATUS.FINISHED : state.status,
      };

    case "ANSWER_TYPED":
      return { ...state, userAnswer: action.value };

    case "SUBMIT_ANSWER": {
      const question = state.question;

      // Helper to normalize strings: lowercase, trim, single spaces
      const normalize = (str) => str.toLowerCase().replace(/\s+/g, " ").trim();

      // Split user input into multiple answers
      const userAnswers = state.userAnswer
        .toLowerCase()
        .split(/,|\/|and/)
        .map((a) => normalize(a))
        .filter(Boolean);

      // Normalize backend answers
      const correctAnswers = Array.isArray(question.answer)
        ? question.answer.map((a) => normalize(a))
        : [normalize(question.answer)];

      // Check if user answers match correct answers regardless of order
      const isCorrect =
        userAnswers.length === correctAnswers.length &&
        userAnswers.every((a) => correctAnswers.includes(a));

      // Update history
      const newHistory = [
        ...state.history,
        {
          question: question.question,
          correct: Array.isArray(question.answer)
            ? question.answer.join(", ")
            : question.answer,
          user: state.userAnswer, // preserve user input
          isCorrect,
        },
      ];

      localStorage.setItem("quizHistory", JSON.stringify(newHistory));

      const total = state.total + 1;
      const finished = total >= state.limit;

      return {
        ...state,
        history: newHistory,
        score: isCorrect ? state.score + 1 : state.score,
        total,
        currentIndex: state.currentIndex + 1,
        userAnswer: "",
        feedback: {
          type: isCorrect ? "success" : "danger",
          text: isCorrect
            ? "Correct!"
            : `Wrong. The correct answer is ${
                Array.isArray(question.answer)
                  ? question.answer.join(", ")
                  : question.answer
              }`,
        },
        status: finished ? QUIZ_STATUS.FINISHED : QUIZ_STATUS.LOADING,
      };
    }

    // previous submit answer#2
    // case "SUBMIT_ANSWER": {
    //   const user = state.userAnswer.trim().toLowerCase(); // trim + lowercase
    //   const question = state.question;

    //   // normalize answer(s) from backend
    //   const answers = Array.isArray(question.answer)
    //     ? question.answer.map((a) => a.trim().toLowerCase())
    //     : [question.answer.trim().toLowerCase()];

    //   const isCorrect = answers.includes(user); // check user answer against all acceptable answers

    //   const newHistory = [
    //     ...state.history,
    //     {
    //       question: question.question,
    //       correct: Array.isArray(question.answer)
    //         ? question.answer.join(", ")
    //         : question.answer,
    //       user: state.userAnswer, // keep original casing for display
    //       isCorrect,
    //     },
    //   ];

    //   localStorage.setItem("quizHistory", JSON.stringify(newHistory));

    //   const total = state.total + 1;
    //   const finished = total >= state.limit;

    //   return {
    //     ...state,
    //     history: newHistory,
    //     score: isCorrect ? state.score + 1 : state.score,
    //     total,
    //     currentIndex: state.currentIndex + 1,
    //     userAnswer: "",
    //     feedback: {
    //       type: isCorrect ? "success" : "danger",
    //       text: isCorrect
    //         ? "Correct!"
    //         : `Wrong. The correct answer is ${
    //             Array.isArray(question.answer)
    //               ? question.answer.join(", ")
    //               : question.answer
    //           }`,
    //     },
    //     status: finished ? QUIZ_STATUS.FINISHED : QUIZ_STATUS.LOADING,
    //   };
    // }

    // previous submit answer
    // case "SUBMIT_ANSWER": {
    //   const user = state.userAnswer.trim().toLowerCase();
    //   const question = state.question;
    //   let isCorrect = Array.isArray(question.answer)
    //     ? question.answer.includes(user)
    //     : user === question.answer;

    //   const newHistory = [
    //     ...state.history,
    //     {
    //       question: question.question,
    //       correct: Array.isArray(question.answer)
    //         ? question.answer.join(", ")
    //         : question.answer,
    //       user,
    //       isCorrect,
    //     },
    //   ];
    //   localStorage.setItem("quizHistory", JSON.stringify(newHistory));

    //   const total = state.total + 1;
    //   const finished = total >= state.limit;

    //   return {
    //     ...state,
    //     history: newHistory,
    //     score: isCorrect ? state.score + 1 : state.score,
    //     total,
    //     currentIndex: state.currentIndex + 1,
    //     userAnswer: "",
    //     feedback: {
    //       type: isCorrect ? "success" : "danger",
    //       text: isCorrect
    //         ? "Correct!"
    //         : `Wrong. The correct answer is ${
    //             Array.isArray(question.answer)
    //               ? question.answer.join(", ")
    //               : question.answer
    //           }`,
    //     },
    //     status: finished ? QUIZ_STATUS.FINISHED : QUIZ_STATUS.LOADING,
    //   };
    // }

    case "ENTER_REVIEW":
      return {
        ...state,
        status: QUIZ_STATUS.REVIEW,
        currentIndex: 0,
      };

    case "REVIEW_NEXT":
      return {
        ...state,
        currentIndex: Math.min(
          state.currentIndex + 1,
          state.history.length - 1,
        ),
      };

    case "REVIEW_PREV":
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0),
      };

    case "EXIT_REVIEW":
      return {
        ...state,
        status: QUIZ_STATUS.FINISHED, // go back to the summary screen
        currentIndex: 0,
      };

    case "RESTART":
      return initialState;

    default:
      return state;
  }
}

const QuizNew2 = () => {
  const location = useLocation();
  const setupData = location.state || {};

  const [state, dispatch] = useReducer(quizReducer, {
    ...initialState,
    direction: setupData.direction,
    limit: setupData.limit,
    timeLimit: setupData.timeLimit,
    timeLeft: setupData.timeLimit, // numeric seconds or null
  });

  const { status, direction, limit, timeLimit, timeLeft } = state;

  // Fetch questions as “loading → active”
  const fetchQuestion = async () => {
    try {
      console.log("sending mode: ", direction);

      const res = await api.get("/question/", {
        params: { mode: direction },
      });

      console.log("backend returned: ", res.data);

      dispatch({ type: "QUESTION_LOADED", question: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status === QUIZ_STATUS.LOADING && direction) {
      fetchQuestion();
    }
  }, [status, direction]);

  // Timer countdown
  useEffect(() => {
    if (status !== QUIZ_STATUS.ACTIVE || timeLeft === null) return;
    const timer = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  return (
    <>
      {(status === QUIZ_STATUS.ACTIVE ||
        status === QUIZ_STATUS.LOADING ||
        status === QUIZ_STATUS.FINISHED) && (
        <QuizUI2 state={state} dispatch={dispatch} />
      )}

      {status === QUIZ_STATUS.REVIEW && (
        <ReviewUI state={state} dispatch={dispatch} />
      )}
    </>
  );
};

export default QuizNew2;
