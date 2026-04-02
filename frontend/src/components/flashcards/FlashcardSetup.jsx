// src/components/flashcards/FlashcardSetup.jsx
import React from "react";

const FlashcardSetup = ({
  top200Only,
  setTop200Only,
  classes,
  filteredClasses,
  selectedClasses,
  searchQuery,
  setSearchQuery,
  toggleClass,
  fetchCards,
  setLimit,
  customCount,
  setCustomCount,
  studyMode,
  setStudyMode,
}) => {
  return (
    <div className="container mt-5 text-center login-page">
      <h4 className="mb-3 fs-1">Flashcards</h4>

      <div
        className="card p-3 mb-4 shadow-sm text-start mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h5 className="mb-2">How This Study Session Works 💊</h5>

        <ul className="mb-2">
          <li>Choose Study Mode.</li>
          <li>
            Choose how many drug cards you want to study. Either a preset or
            custom amount.
          </li>
          <li>
            Each card tests <strong>brand ↔ generic recall</strong>.
          </li>
          <li>
            Tap a card to flip it, then rate your confidence from{" "}
            <strong>1–5</strong>.
          </li>
          <li>
            Cards rated <strong>4–5</strong> move to your{" "}
            <strong>Confident</strong> pile.
          </li>
          <li>
            Your goal: move all cards to <strong>Confident</strong>.
          </li>
        </ul>
      </div>

      {/* Top 200 toggle */}

      <div className="card p-3 mb-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h5 className="mb-2">Study Mode</h5>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="studyMode"
            id="modeTop200"
            checked={studyMode === "top200"}
            onChange={() => setStudyMode("top200")}
          />
          <label className="form-check-label" htmlFor="modeTop200">
            Top 200 Drugs
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="studyMode"
            id="modeClass"
            checked={studyMode === "class"}
            onChange={() => setStudyMode("class")}
          />
          <label className="form-check-label" htmlFor="modeClass">
            Study by Drug Class
          </label>
        </div>
      </div>

      {/* new searchable */}

      {studyMode === "class" && (
        <div className="mb-4 d-flex justify-content-center gap-4 flex-wrap">
          {/* LEFT: class selector */}
          <div style={{ minWidth: "300px", maxWidth: "400px", flex: 1 }}>
            <h5 className="mb-2">Drug Classes</h5>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search for a drug class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div
              className="scrollable-class-container border rounded p-2"
              style={{
                maxHeight: "240px",
                overflowY: "auto",
                backgroundColor: "#f8f9fa", // Bootstrap light gray
              }}
            >
              {filteredClasses.length > 0 ? (
                filteredClasses.map((c) => (
                  <button
                    key={c.id}
                    className={`btn btn-sm me-1 mb-1 ${
                      selectedClasses.includes(c.id)
                        ? "btn-primary"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => toggleClass(c.id)}
                  >
                    {c.name}
                  </button>
                ))
              ) : (
                <p className="text-muted mb-0">No classes match your search.</p>
              )}
            </div>

            <div className="mt-2 d-flex justify-content-between">
              <button
                className="btn btn-danger btn-sm text-white"
                onClick={() => selectedClasses.forEach((id) => toggleClass(id))}
              >
                Clear Selection
              </button>
              <button
                className="btn btn-success btn-sm text-white"
                onClick={() =>
                  filteredClasses.forEach((c) => {
                    if (!selectedClasses.includes(c.id)) toggleClass(c.id);
                  })
                }
              >
                Select All
              </button>
            </div>
          </div>

          {/* RIGHT: selected classes panel */}
          {selectedClasses.length > 0 && (
            <div
              className="card p-3 shadow-sm"
              style={{ minWidth: "250px", maxWidth: "300px" }}
            >
              <h6 className="mb-2">Selected Classes</h6>

              <div className="d-flex flex-wrap gap-1">
                {selectedClasses.map((id) => {
                  const cls = classes.find((c) => c.id === id);
                  return (
                    <span
                      key={id}
                      className="badge bg-success d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleClass(id)}
                      title="Click to remove"
                    >
                      {cls?.name || "Unknown"} ✕
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Preset flashcard buttons */}
      <div className="card p-3 mx-auto mb-3" style={{ maxWidth: "300px" }}>
        <h6>Choose a Number of Cards</h6>
        <div className="d-flex justify-content-between mt-2">
          {[50, 100, 200].map((num) => (
            <button
              key={num}
              className="btn btn-primary flex-fill m-2"
              onClick={() => {
                setLimit(num);
                fetchCards(num);
              }}
              disabled={studyMode === "class" && selectedClasses.length === 0}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      {/* Custom input */}
      <div className="card p-3 mx-auto" style={{ maxWidth: "300px" }}>
        <h6>Or Enter a Custom Amount</h6>
        <input
          type="number"
          className="form-control mb-2"
          min="1"
          placeholder="Enter number ..."
          value={customCount}
          onChange={(e) => setCustomCount(e.target.value)}
        />
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            const num = parseInt(customCount);
            if (!num || num <= 0) {
              alert("Please enter a valid number greater than 0.");
              return;
            }
            setLimit(num);
            fetchCards(num);
          }}
          disabled={studyMode === "class" && selectedClasses.length === 0}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default FlashcardSetup;
