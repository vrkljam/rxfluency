import { useEffect, useState } from "react";
import axios from "axios";

const PTHealthcareAdmin = () => {
  const [drugs, setDrugs] = useState([]);
  const [newDrug, setNewDrug] = useState("");

  const token = localStorage.getItem("access");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/pthealthcare/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchDrugs = async () => {
    const res = await api.get("drugs/");
    setDrugs(res.data);
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const addDrug = async (e) => {
    e.preventDefault();
    if (!newDrug) return;

    await api.post("drugs/", { name: newDrug });
    setNewDrug("");
    fetchDrugs();
  };

  const updateDrug = async (drug) => {
    await api.put(`drugs/${drug.id}/`, drug);
    fetchDrugs();
  };

  const deleteDrug = async (id) => {
    await api.delete(`drugs/${id}/`);
    fetchDrugs();
  };

  const handleChange = (index, field, value) => {
    const updated = [...drugs];
    updated[index][field] = value;
    setDrugs(updated);
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
            value={newDrug}
            onChange={(e) => setNewDrug(e.target.value)}
          />
          <button className="btn btn-success">Add Drug</button>
        </div>
      </form>

      {drugs.map((drug, index) => (
        <div key={drug.id} className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <input
              className="form-control me-3"
              value={drug.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />

            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => updateDrug(drug)}
              >
                Save
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteDrug(drug.id)}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="card-body">
            {[...Array(10)].map((_, i) => {
              const field = `fact_${i + 1}`;
              return (
                <div key={field} className="mb-3">
                  <label className="form-label">Fact {i + 1}</label>

                  <textarea
                    className="form-control"
                    rows="2"
                    value={drug[field] || ""}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                  />
                </div>
              );
            })}

            <div className="mb-3">
              <label className="form-label">Admin Notes</label>
              <textarea
                className="form-control"
                rows="3"
                value={drug.notes || ""}
                onChange={(e) => handleChange(index, "notes", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PTHealthcareAdmin;
