import React, { useEffect } from "react";

// src/components/flashcards/SessionComplete.jsx
export const launchBouncyPharmaConfetti = () => {
  const pills = ["💊", "🧪", "💉", "🧫", "⚪", "🔵", "🟡"];
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.pointerEvents = "none";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  const particleCount = 80;
  for (let i = 0; i < particleCount; i++) {
    const pill = document.createElement("span");
    pill.innerText = pills[Math.floor(Math.random() * pills.length)];
    pill.style.position = "absolute";
    pill.style.left = `${Math.random() * 100}%`;
    pill.style.top = `-2rem`;
    pill.style.fontSize = `${16 + Math.random() * 20}px`;
    pill.style.opacity = Math.random() * 0.7 + 0.3;
    pill.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(pill);

    const fallDuration = 3000 + Math.random() * 2000;
    const driftX = (Math.random() - 0.5) * 120;
    const rotateAmount = Math.random() * 1440 - 720;
    const swayAmplitude = 15 + Math.random() * 10;
    const landingY = window.innerHeight - 40 - Math.random() * 20;

    const keyframes = [
      {
        transform: `rotate(0deg) translateX(0px)`,
        top: "-2rem",
        left: pill.style.left,
      },
      {
        transform: `rotate(${rotateAmount / 2}deg) translateX(${swayAmplitude}px)`,
        top: `${landingY / 2}px`,
        left: `calc(${pill.style.left} + ${driftX / 2}px)`,
      },
      {
        transform: `rotate(${rotateAmount}deg) rotateX(${rotateAmount / 2}deg) translateX(${-swayAmplitude}px)`,
        top: `${landingY}px`,
        left: `calc(${pill.style.left} + ${driftX}px)`,
      },
    ];

    const fallAnimation = pill.animate(keyframes, {
      duration: fallDuration,
      easing: "ease-out",
      fill: "forwards",
    });

    fallAnimation.onfinish = () => {
      const bounceKeyframes = [
        { transform: `translateY(0)` },
        { transform: `translateY(-20px)` },
        { transform: `translateY(0)` },
        { transform: `translateY(-10px)` },
        { transform: `translateY(0)` },
      ];
      pill.animate(bounceKeyframes, {
        duration: 800,
        easing: "ease-out",
        iterations: 1,
      });
      setTimeout(() => pill.remove(), 1000);
    };
  }

  setTimeout(() => container.remove(), 7000);
};
const SessionComplete = ({ limit, setView, resetSession }) => {
  useEffect(() => {
    launchBouncyPharmaConfetti();
  }, []);

  return (
    <div className="container mt-5 text-center">
      <div className="card p-5 shadow-sm">
        <h2 className="mb-3 text-success"> 🎉 All Cards Mastered! </h2>
        <p className="mb-4">You marked all {limit} cards as confident.</p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => setView("confident")}
          >
            Review Confident Cards
          </button>
          <button className="btn btn-outline-secondary" onClick={resetSession}>
            Start New Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionComplete;

// const launchBouncyPharmaConfetti = () => {
//   const pills = ["💊", "🧪", "💉", "🧫", "⚪", "🔵", "🟡"];
//   const container = document.createElement("div");
//   container.style.position = "fixed";
//   container.style.top = "0";
//   container.style.left = "0";
//   container.style.width = "100%";
//   container.style.height = "100%";
//   container.style.pointerEvents = "none";
//   container.style.zIndex = "9999";
//   document.body.appendChild(container);

//   const particleCount = 80;
//   for (let i = 0; i < particleCount; i++) {
//     const pill = document.createElement("span");
//     pill.innerText = pills[Math.floor(Math.random() * pills.length)];
//     pill.style.position = "absolute";
//     pill.style.left = `${Math.random() * 100}%`;
//     pill.style.top = `-2rem`;
//     pill.style.fontSize = `${16 + Math.random() * 20}px`;
//     pill.style.opacity = Math.random() * 0.7 + 0.3;
//     pill.style.transform = `rotate(${Math.random() * 360}deg)`;
//     container.appendChild(pill);

//     const fallDuration = 3000 + Math.random() * 2000;
//     const driftX = (Math.random() - 0.5) * 120;
//     const rotateAmount = Math.random() * 1440 - 720;
//     const swayAmplitude = 15 + Math.random() * 10;
//     const landingY = window.innerHeight - 40 - Math.random() * 20;

//     const keyframes = [
//       {
//         transform: `rotate(0deg) translateX(0px)`,
//         top: "-2rem",
//         left: pill.style.left,
//       },
//       {
//         transform: `rotate(${rotateAmount / 2}deg) translateX(${swayAmplitude}px)`,
//         top: `${landingY / 2}px`,
//         left: `calc(${pill.style.left} + ${driftX / 2}px)`,
//       },
//       {
//         transform: `rotate(${rotateAmount}deg) rotateX(${rotateAmount / 2}deg) translateX(${-swayAmplitude}px)`,
//         top: `${landingY}px`,
//         left: `calc(${pill.style.left} + ${driftX}px)`,
//       },
//     ];

//     const fallAnimation = pill.animate(keyframes, {
//       duration: fallDuration,
//       easing: "ease-out",
//       fill: "forwards",
//     });

//     fallAnimation.onfinish = () => {
//       const bounceKeyframes = [
//         { transform: `translateY(0)` },
//         { transform: `translateY(-20px)` },
//         { transform: `translateY(0)` },
//         { transform: `translateY(-10px)` },
//         { transform: `translateY(0)` },
//       ];
//       pill.animate(bounceKeyframes, {
//         duration: 800,
//         easing: "ease-out",
//         iterations: 1,
//       });
//       setTimeout(() => pill.remove(), 1000);
//     };
//   }

//   setTimeout(() => container.remove(), 7000);
// };
