import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const QuizFilter = () => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [isTop200, setIsTop200] = useState(true);
  const [isCombination, setIsCombination] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch quizable classes on mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/drugclasses/?is_quizable=true");
        setClasses(res.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleClassToggle = (id) => {
    if (selectedClasses.includes(id)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== id));
    } else {
      setSelectedClasses([...selectedClasses, id]);
    }
  };

  const handleStartQuiz = () => {
    navigate("/quiz", {
      state: {
        selectedClasses,
        isTop200,
        isCombination,
      },
    });
  };

  if (loading) return <div>Loading classes...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Select What To Study</h2>

      {/* Top 200 Toggle */}
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isTop200}
          onChange={() => setIsTop200(!isTop200)}
          id="top200Toggle"
        />
        <label className="form-check-label" htmlFor="top200Toggle">
          Top 200 Only
        </label>
      </div>

      {/* Combination Toggle */}
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isCombination}
          onChange={() => setIsCombination(!isCombination)}
          id="comboToggle"
        />
        <label className="form-check-label" htmlFor="comboToggle">
          Combination Drugs Only
        </label>
      </div>

      <hr />

      <h4 className="mt-4">Study By Class</h4>

      <div className="row mt-3">
        {classes.map((c) => (
          <div className="col-md-4 mb-2" key={c.id}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedClasses.includes(c.id)}
                onChange={() => handleClassToggle(c.id)}
                id={`class-${c.id}`}
              />
              <label className="form-check-label" htmlFor={`class-${c.id}`}>
                {c.name}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-muted">
        {selectedClasses.length} class(es) selected
      </div>

      <button className="btn btn-primary mt-4" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizFilter;
