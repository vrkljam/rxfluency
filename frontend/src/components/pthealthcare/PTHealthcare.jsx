import { useEffect, useState } from "react";
import api from "../../api/api";

const PTHealthcare = () => {
  const [drugs, setDrugs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api
      .get("/pthealthcare/drugs/")
      .then((res) => setDrugs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const nextDrug = () => {
    if (drugs.length === 0) return;

    setCurrentIndex((prev) => (prev + 1) % drugs.length);
  };

  if (drugs.length === 0) {
    return (
      <div className="container mt-5">
        <h2>PT Healthcare</h2>
        <p>No drugs available yet.</p>
      </div>
    );
  }

  const drug = drugs[currentIndex];

  const facts = [
    drug.fact_1,
    drug.fact_2,
    drug.fact_3,
    drug.fact_4,
    drug.fact_5,
    drug.fact_6,
    drug.fact_7,
    drug.fact_8,
    drug.fact_9,
    drug.fact_10,
  ].filter(Boolean); // removes empty ones

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{drug.name}</h2>

      <ul className="list-group mb-4">
        {facts.map((fact, i) => (
          <li key={i} className="list-group-item">
            {fact}
          </li>
        ))}
      </ul>

      <button className="btn btn-primary" onClick={nextDrug}>
        Next Drug →
      </button>
    </div>
  );
};

export default PTHealthcare;
