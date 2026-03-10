import { useEffect, useState } from "react";
import api from "../api/api";

const DrugsAdmin = () => {
  const [drugs, setDrugs] = useState([]);
  const [newDrug, setNewDrug] = useState({
    brands: [],
    generic_name: "",
    is_verified: false,
    is_top_200: false,
    is_combination: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [editingDrug, setEditingDrug] = useState({});
  const [deleteId, setDeleteId] = useState(null); // ID of drug to delete

  // Fetch all drugs
  const fetchDrugs = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("token not found, please log in");

      const res = await api.get("/drugs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("HELLLLLPPP: ", res.data);
      setDrugs(res.data);
    } catch (err) {
      console.error("Error fetching drugs:", err);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  // Add new drug
  const handleAdd = async () => {
    if (!newDrug.brands.length || !newDrug.generic_name) return;
    try {
      const payload = {
        ...newDrug,
        brands: newDrug.brands.map((b) => b.name), // array of brand names
      };
      await api.post("/drugs/", payload);
      setNewDrug({
        brands: [],
        generic_name: "",
        is_verified: false,
        is_top_200: false,
        is_combination: false,
      });
      fetchDrugs();
    } catch (err) {
      console.error("Error adding drug:", err);
    }
  };

  // Save edited drug
  const saveEdit = async () => {
    try {
      const payload = {
        ...editingDrug,
        brands: editingDrug.brands.map((b) => b.name),
      };
      await api.put(`/drugs/${editingId}/`, payload);
      setEditingId(null);
      fetchDrugs();
    } catch (err) {
      console.error("Error updating drug:", err);
    }
  };

  // Delete confirmed
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/drugs/${deleteId}/`);
      setDeleteId(null);
      fetchDrugs();
    } catch (err) {
      console.error("Error deleting drug:", err);
    }
  };

  // Start editing inline
  const startEdit = (drug) => {
    setEditingId(drug.id);
    setEditingDrug({ ...drug });
  };

  return (
    <div className="container-fluid mt-3">
      <h3>Manage Drugs</h3>

      {/* Add New Drug Form */}
      <div className="mb-3 d-flex gap-2 align-items-center">
        <input
          className="form-control"
          type="text"
          placeholder="Brand Name(s) (separate with /)"
          value={newDrug.brands.map((b) => b.brand_name).join(" / ")}
          onChange={(e) => {
            const names = e.target.value
              .split("/")
              .map((n) => n.trim())
              .filter(Boolean);
            setNewDrug({
              ...newDrug,
              brands: names.map((name, i) => ({ id: i, brand_name: name })),
            });
          }}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Generic Name"
          value={newDrug.generic_name}
          onChange={(e) =>
            setNewDrug({ ...newDrug, generic_name: e.target.value })
          }
        />
        <label className="d-flex align-items-center gap-1">
          Verified
          <input
            type="checkbox"
            checked={newDrug.is_verified}
            onChange={(e) =>
              setNewDrug({ ...newDrug, is_verified: e.target.checked })
            }
          />
        </label>
        <label className="d-flex align-items-center gap-1">
          Combination
          <input
            type="checkbox"
            checked={newDrug.is_combination}
            onChange={(e) =>
              setNewDrug({ ...newDrug, is_combination: e.target.checked })
            }
          />
        </label>
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Drug
        </button>
      </div>

      {/* Drugs Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Brand Name</th>
            <th>Generic Name</th>
            <th>Verified</th>
            <th>Combo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug.id}>
              <td>
                {editingId === drug.id ? (
                  <input
                    className="form-control"
                    value={(editingDrug.brands || [])
                      .map((b) => b.name)
                      .join(" / ")}
                    onChange={(e) => {
                      const names = e.target.value
                        .split("/")
                        .map((n) => n.trim())
                        .filter(Boolean);
                      setEditingDrug({
                        ...editingDrug,
                        brands: names.map((name, i) => ({
                          id: i,
                          name: name,
                        })),
                      });
                    }}
                  />
                ) : (
                  (drug.brands || []).map((b) => b.name).join(" / ")
                )}
              </td>
              <td>
                {editingId === drug.id ? (
                  <input
                    className="form-control"
                    value={editingDrug.generic_name}
                    onChange={(e) =>
                      setEditingDrug({
                        ...editingDrug,
                        generic_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  drug.generic_name
                )}
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={
                    editingId === drug.id
                      ? editingDrug.is_verified
                      : drug.is_verified
                  }
                  onChange={(e) => {
                    if (editingId === drug.id) {
                      setEditingDrug({
                        ...editingDrug,
                        is_verified: e.target.checked,
                      });
                    } else {
                      api
                        .patch(`/drugs/${drug.id}/`, {
                          is_verified: !drug.is_verified,
                        })
                        .then(fetchDrugs)
                        .catch(console.error);
                    }
                  }}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={
                    editingId === drug.id
                      ? editingDrug.is_combination
                      : drug.is_combination
                  }
                  onChange={(e) => {
                    if (editingId === drug.id) {
                      setEditingDrug({
                        ...editingDrug,
                        is_combination: e.target.checked,
                      });
                    } else {
                      api
                        .patch(`/drugs/${drug.id}/`, {
                          is_combination: !drug.is_combination,
                        })
                        .then(fetchDrugs)
                        .catch(console.error);
                    }
                  }}
                />
              </td>
              <td>
                {editingId === drug.id ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => startEdit(drug)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => setDeleteId(drug.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {drugs.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                No drugs found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteId(null)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this drug?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugsAdmin;
