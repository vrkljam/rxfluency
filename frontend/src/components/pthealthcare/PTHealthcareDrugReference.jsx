import React, { useEffect, useState } from "react";
import api from "../../api/api";

function PTHealthcareDrugReference() {
  const [drugs, setDrugs] = useState([]);
  const [search, setSearch] = useState("");
  const [highlightMode, setHighlightMode] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("All");

  useEffect(() => {
    api
      .get("/pthealthcare/drugs/")
      .then((res) => {
        setDrugs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const groupFacts = (facts) => {
    const grouped = {};
    facts.forEach((fact) => {
      if (!grouped[fact.category]) grouped[fact.category] = [];
      grouped[fact.category].push(fact.text);
    });
    return grouped;
  };

  const drugClasses = ["All", ...new Set(drugs.map((drug) => drug.drug_class))];

  const filteredDrugs = drugs.filter((drug) => {
    const matchesSearch = drug.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesClass =
      selectedClass === "All" || drug.drug_class === selectedClass;

    return matchesSearch && matchesClass;
  });

  const drug = filteredDrugs[currentCard];

  const highlightCategories = ["mechanism", "contraindication", "interaction"];

  const nextCard = () => {
    setCurrentCard((prev) =>
      prev === filteredDrugs.length - 1 ? 0 : prev + 1,
    );
  };

  const prevCard = () => {
    setCurrentCard((prev) =>
      prev === 0 ? filteredDrugs.length - 1 : prev - 1,
    );
  };

  /* ---------------- LOADING STATE ---------------- */

  if (loading) {
    return <p className="text-center mt-4">Loading drugs...</p>;
  }

  /* ---------------- NO RESULTS STATE ---------------- */

  if (filteredDrugs.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h1 className="mb-4">PT Drug Reference</h1>

        <input
          type="text"
          placeholder="Search drug..."
          className="form-control mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <p className="text-muted">No drugs found for "{search}"</p>
      </div>
    );
  }

  const groupedFacts = groupFacts(drug.facts);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">PT Drug Reference</h1>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search drug..."
          className="form-control"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentCard(0);
          }}
        />
      </div>

      {/* Drug Class Filters */}
      <div className="mb-3 text-center">
        {drugClasses.map((drugClass, index) => (
          <button
            key={index}
            className={`btn btn-sm me-2 mb-2 ${
              selectedClass === drugClass
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => {
              setSelectedClass(drugClass);
              setCurrentCard(0);
            }}
          >
            {drugClass}
          </button>
        ))}
      </div>

      {/* Highlight Toggle */}
      <div className="text-center mb-3">
        <button
          className={`btn ${
            highlightMode ? "btn-warning" : "btn-outline-warning"
          }`}
          onClick={() => setHighlightMode(!highlightMode)}
        >
          {/* PT Exam Highlight Mode */}
          {highlightMode ? "Exit Exam Mode" : "PT Exam Mode"}
        </button>
      </div>

      {/* Flashcard */}
      <div
        className="card shadow-lg mb-4"
        style={{
          borderRadius: "16px",
          minHeight: "350px",
        }}
      >
        <div className="card-body">
          <h2 className="card-title">{drug.name}</h2>
          <p className="text-muted">{drug.drug_class}</p>

          <div className="accordion">
            {Object.entries(groupedFacts)
              .filter(([category]) =>
                highlightMode ? highlightCategories.includes(category) : true,
              )
              .map(([category, facts], index) => {
                const isHighlighted =
                  highlightMode && highlightCategories.includes(category);

                return (
                  <div
                    className={`accordion-item ${
                      isHighlighted ? "border-warning" : ""
                    }`}
                    key={index}
                  >
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button collapsed ${
                          isHighlighted ? "bg-warning-subtle" : ""
                        }`}
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${category}`}
                      >
                        {category.replace("_", " ").toUpperCase()}
                      </button>
                    </h2>

                    <div
                      id={`collapse-${category}`}
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        <ul className="list-group list-group-flush">
                          {facts.map((fact, i) => (
                            <li key={i} className="list-group-item">
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Flashcard Navigation */}
      <div className="text-center">
        <button className="btn btn-secondary me-2" onClick={prevCard}>
          Previous
        </button>

        <button className="btn btn-primary me-2" onClick={nextCard}>
          Next
        </button>

        <span className="text-muted">
          {currentCard + 1} / {filteredDrugs.length}
        </span>
      </div>
    </div>
  );
}

export default PTHealthcareDrugReference;
