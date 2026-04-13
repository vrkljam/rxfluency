import { useEffect, useState } from "react";
import api from "../api/api";

const PTHealthcareAdmin = () => {
  const [drugs, setDrugs] = useState([]);
  const [newDrugName, setNewDrugName] = useState("");
  const [drugClasses, setDrugClasses] = useState([]);
  const [classSearch, setClassSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/pthealthcare/drug-classes/");
      setDrugClasses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDrugs = async () => {
    const res = await api.get("pthealthcare/drugs/");

    const normalized = res.data.map((drug) => ({
      ...drug,
      class_ids: drug.classes ? drug.classes.map((c) => c.id) : [],
    }));

    setDrugs(normalized);
  };

  useEffect(() => {
    fetchDrugs();
    fetchClasses();
  }, []);

  // --- DRUG CRUD ---
  const addDrug = async (e) => {
    e.preventDefault();
    if (!newDrugName) return;

    await api.post("pthealthcare/drugs/", { name: newDrugName });
    setNewDrugName("");
    fetchDrugs();
  };

  const deleteDrug = async (id) => {
    await api.delete(`pthealthcare/drugs/${id}/`);
    fetchDrugs();
  };

  const handleDrugChange = (drugIndex, field, value) => {
    const updated = [...drugs];
    updated[drugIndex][field] = value;
    setDrugs(updated);
  };

  // --- FACTS CRUD (in-memory until Save) ---
  const handleFactChange = (drugIndex, factIndex, field, value) => {
    const updated = [...drugs];
    updated[drugIndex] = {
      ...updated[drugIndex],
      facts: updated[drugIndex].facts.map((fact, i) =>
        i === factIndex ? { ...fact, [field]: value } : fact,
      ),
    };
    setDrugs(updated);
  };

  const addFactToDrug = (drugIndex) => {
    const updated = [...drugs];

    const newFact = {
      text: "",
      category: "other",
      order: updated[drugIndex].facts.length,
    };

    updated[drugIndex] = {
      ...updated[drugIndex],
      facts: [...updated[drugIndex].facts, newFact],
    };

    setDrugs(updated);
  };

  const removeFactFromDrug = (drugIndex, factIndex) => {
    const updated = [...drugs];
    updated[drugIndex].facts.splice(factIndex, 1);
    setDrugs(updated);
  };

  // {------new saveDrug -----}
  const saveDrug = async (drug) => {
    const { id, name, notes, class_ids } = drug;

    try {
      await api.put(`/pthealthcare/drugs/${id}/`, {
        name,
        notes,
        class_ids: class_ids || [],
      });

      fetchDrugs();
    } catch (err) {
      console.error("Error saving drug:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage PT Healthcare Drugs</h2>

      {/* Add Drug */}
      <form onSubmit={addDrug} className="mb-4">
        <div className="input-group">
          <input
            className="form-control"
            placeholder="New drug name..."
            value={newDrugName}
            onChange={(e) => setNewDrugName(e.target.value)}
          />
          <button className="btn btn-success">Add Drug</button>
        </div>
      </form>

      {drugs.map((drug, drugIndex) => (
        <div key={drug.id} className="card mb-4">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <input
                className="form-control me-3"
                value={drug.name}
                onChange={(e) =>
                  handleDrugChange(drugIndex, "name", e.target.value)
                }
                placeholder="Drug Name"
              />

              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => saveDrug(drug)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteDrug(drug.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* 👇 THIS puts badges UNDER the name */}
            <div className="mt-2">
              <label className="form-label">Drug Classes Selected: </label>
              {drug.class_ids?.map((id) => {
                const cls = drugClasses.find((c) => c.id === id);
                if (!cls) return null;

                return (
                  <span key={id} className="badge bg-primary me-1">
                    {cls.name}
                  </span>
                );
              })}
            </div>

            {/* dropdown UNDER badges */}
            <div className="mt-2">
              <div className="mt-2 position-relative">
                <label className="form-label">Drug Classes</label>

                {/* Search input */}
                <input
                  className="form-control form-control-sm"
                  placeholder="Search and add class..."
                  value={classSearch}
                  onChange={(e) => {
                    setClassSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                />

                {/* Selected chips */}
                <div className="mt-2 d-flex flex-wrap gap-2">
                  {drug.class_ids?.map((id) => {
                    const cls = drugClasses.find((c) => c.id === id);
                    if (!cls) return null;

                    return (
                      <span key={id} className="badge bg-primary">
                        {cls.name}
                        <button
                          type="button"
                          className="btn-close btn-close-white btn-sm ms-2"
                          onClick={() => {
                            const updated = drug.class_ids.filter(
                              (x) => x !== id,
                            );
                            handleDrugChange(drugIndex, "class_ids", updated);
                          }}
                        />
                      </span>
                    );
                  })}
                </div>

                {/* Dropdown results */}
                {showDropdown && classSearch && (
                  <div
                    className="border bg-white position-absolute w-100"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 10,
                    }}
                  >
                    {drugClasses
                      .filter((cls) =>
                        cls.name
                          .toLowerCase()
                          .includes(classSearch.toLowerCase()),
                      )
                      .filter((cls) => !drug.class_ids?.includes(cls.id))
                      .map((cls) => (
                        <div
                          key={cls.id}
                          className="p-2 hover-bg"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const updated = [...(drug.class_ids || []), cls.id];
                            handleDrugChange(drugIndex, "class_ids", updated);
                            setClassSearch("");
                          }}
                        >
                          {cls.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-body">
            <h5>Facts</h5>
            {drug.facts.map((fact, factIndex) => (
              <div
                key={fact.id || factIndex}
                className="mb-3 d-flex gap-2 align-items-start"
              >
                <input
                  className="form-control"
                  value={fact.text}
                  onChange={(e) =>
                    handleFactChange(
                      drugIndex,
                      factIndex,
                      "text",
                      e.target.value,
                    )
                  }
                  placeholder="Fact text"
                />
                <select
                  className="form-select"
                  value={fact.category}
                  onChange={(e) =>
                    handleFactChange(
                      drugIndex,
                      factIndex,
                      "category",
                      e.target.value,
                    )
                  }
                >
                  <option value="mechanism">Mechanism</option>
                  <option value="indication">Indication</option>
                  <option value="side_effect">Side Effect</option>
                  <option value="contraindication">Contraindication</option>
                  <option value="interaction">Interaction</option>
                  <option value="other">Other</option>
                </select>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFactFromDrug(drugIndex, factIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-success mb-3"
              onClick={() => addFactToDrug(drugIndex)}
            >
              + Add Fact
            </button>

            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                rows="3"
                value={drug.notes || ""}
                onChange={(e) =>
                  handleDrugChange(drugIndex, "notes", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PTHealthcareAdmin;
