const TimeSelector = ({ selected, onSelect }) => {
  return (
    <div className="text-center mb-4">
      <h4 className="mb-3">Choose time limit</h4>
      {[15, 300, 600, 900].map((t) => (
        <button
          key={t}
          // className="btn btn-outline-warning me-2"
          className={`btn me-2 ${selected === t ? "btn-warning shadow fw-bold selected-btn cardStyleTime" : "btn-outline-warning"}`}
          onClick={() => {
            onSelect(t);
          }}
        >
          {t / 60} minutes
        </button>
      ))}
      <button
        // className="btn btn-outline-warning me-2"
        className={`btn me-2 ${selected === null ? "btn-warning shadow fw-bold selected-btn" : "btn-outline-warning"}`}
        onClick={() => onSelect(null)}
      >
        No timer
      </button>
    </div>
  );
};

export default TimeSelector;
