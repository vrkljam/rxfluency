import React from "react";

const SessionHeader = ({
  view,
  setView,
  activeCards = [],
  confidentCards = [],
  spinShuffle,
  selectedClasses = [],
  classes = [],
}) => {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-center gap-3 mb-3">
        <button
          className={`badge fs-6 p-3 ${view === "active" ? "bg-primary" : "bg-secondary"}`}
          onClick={() => setView("active")}
        >
          Active ({activeCards.length})
        </button>
        <button
          className={`badge fs-6 p-3 ${view === "confident" ? "bg-success" : "bg-secondary"}`}
          onClick={() => setView("confident")}
        >
          Confident ({confidentCards.length})
        </button>
        <button className="badge fs-6 p-3 bg-warning" onClick={spinShuffle}>
          🎰 Shuffle
        </button>
      </div>

      {selectedClasses.length > 0 && (
        <div className="mb-3 d-flex flex-wrap justify-content-center gap-2">
          {selectedClasses.map((id) => {
            const c = classes.find((cls) => cls.id === id);
            return (
              <span key={id} className="badge bg-info text-dark">
                {c?.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SessionHeader;
