import { useEffect, useState } from "react";
import api from "../api/api";

const PTHealthcareAdmin = () => {
  const [drugs, setDrugs] = useState([]);
  const [newDrugName, setNewDrugName] = useState("");

  const fetchDrugs = async () => {
    const res = await api.get("pthealthcare/drugs/");
    setDrugs(res.data);
  };

  useEffect(() => {
    fetchDrugs();
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
    updated[drugIndex] = {
      ...updated[drugIndex],
      [field]: value,
    };

    setDrugs(updated);
  };

  const removeFactFromDrug = (drugIndex, factIndex) => {
    const updated = [...drugs];
    updated[drugIndex].facts.splice(factIndex, 1);
    setDrugs(updated);
  };

  // --- SAVE DRUG + FACTS ---
  const saveDrug = async (drug) => {
    const { id, name, drug_class, notes, facts } = drug;

    // Save or update the drug itself
    const drugRes = await api.put(`pthealthcare/drugs/${id}/`, {
      name,
      drug_class,
      notes,
    });

    // Save each fact
    await Promise.all(
      facts.map(async (fact) => {
        if (fact.id) {
          // existing fact
          await api.put(`pthealthcare/facts/${fact.id}/`, {
            text: fact.text,
            category: fact.category,
            order: fact.order,
            drug: id,
          });
        } else {
          // new fact
          await api.post(`pthealthcare/facts/`, {
            text: fact.text,
            category: fact.category,
            order: fact.order,
            drug: id,
          });
        }
      }),
    );

    fetchDrugs(); // refresh after save
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
          <div className="card-header d-flex justify-content-between align-items-center">
            <input
              className="form-control me-3"
              value={drug.name}
              onChange={(e) =>
                handleDrugChange(drugIndex, "name", e.target.value)
              }
              placeholder="Drug Name"
            />
            <input
              className="form-control me-3"
              value={drug.drug_class || ""}
              onChange={(e) =>
                handleDrugChange(drugIndex, "drug_class", e.target.value)
              }
              placeholder="Drug Class"
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
