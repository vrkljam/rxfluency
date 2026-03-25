import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function DrugAdmin() {
  const [drugs, setDrugs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [brands, setBrands] = useState([]);
  const [classSearch, setClassSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [newBrandInput, setNewBrandInput] = useState("");
  const [sortField, setSortField] = useState("generic"); // "generic" or "brand"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [form, setForm] = useState({
    id: null,
    generic_name: "",
    is_top_200: false,
    is_verified: false,
    is_combination: false,
    description: "",
    class_ids: [],
    brand_ids: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [drugRes, classRes, brandRes] = await Promise.all([
      api.get("/drugs/"),
      api.get("/drugclasses/"),
      api.get("/brands/"),
    ]);
    console.log("Fetching drugs...");
    setDrugs(drugRes.data.results || drugRes.data);
    setClasses(classRes.data.results || classRes.data);
    setBrands(brandRes.data.results || brandRes.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "select-multiple") {
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => parseInt(o.value));
      setForm({ ...form, [name]: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let allBrandIds = [...form.brand_ids];

    // 🔥 Create new brands if entered
    if (newBrandInput.trim()) {
      const newBrands = newBrandInput
        .split(",")
        .map((b) => b.trim())
        .filter((b) => b.length > 0);

      for (const brandName of newBrands) {
        try {
          const res = await api.post("brands/", { name: brandName });
          allBrandIds.push(res.data.id);
        } catch (err) {
          console.log("Brand may already exist:", brandName);

          // fallback: find existing brand
          const existing = brands.find(
            (b) => b.name.toLowerCase() === brandName.toLowerCase(),
          );
          if (existing) {
            allBrandIds.push(existing.id);
          }
        }
      }
    }

    const payload = {
      ...form,
      brand_ids: allBrandIds,
    };

    if (form.id) {
      await api.put(`drugs/${form.id}/`, payload);
    } else {
      await api.post("drugs/", payload);
    }

    resetForm();
    fetchData();
  };

  const resetForm = () => {
    setForm({
      id: null,
      generic_name: "",
      is_top_200: false,
      is_verified: false,
      is_combination: false,
      description: "",
      class_ids: [],
      brand_ids: [],
    });
    setNewBrandInput("");
  };

  const handleEdit = (drug) => {
    setForm({
      id: drug.id,
      generic_name: drug.generic_name,
      is_top_200: drug.is_top_200,
      is_verified: drug.is_verified,
      is_combination: drug.is_combination,
      description: drug.description,
      class_ids: drug.classes.map((c) => c.id),
      brand_ids: drug.brands.map((b) => b.id),
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/drugs/${id}/`);
    fetchData();
  };

  const sortedDrugs = [...drugs].sort((a, b) => {
    let aValue, bValue;

    if (sortField === "generic") {
      aValue = a.generic_name.toLowerCase();
      bValue = b.generic_name.toLowerCase();
    } else if (sortField === "brand") {
      aValue = a.brands[0]?.name.toLowerCase() || ""; // first brand
      bValue = b.brands[0]?.name.toLowerCase() || "";
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h1>Drug Admin</h1>

      {/* Create New Drug Button */}
      {form.id && (
        <button onClick={resetForm} className="btn btn-warning mb-3">
          + Create New Drug
        </button>
      )}

      <div className="card p-3 mb-4">
        <h2>{form.id ? `Editing: ${form.generic_name}` : "Create New Drug"}</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            name="generic_name"
            placeholder="Generic Name"
            value={form.generic_name}
            onChange={handleChange}
            required
            className="form-control"
            style={{ gridColumn: "span 2" }}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            style={{ gridColumn: "span 2" }}
          />

          {/* CHECKBOXES */}
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="is_top_200"
                checked={form.is_top_200}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Top 200</label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                name="is_verified"
                checked={form.is_verified}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Verified</label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                name="is_combination"
                checked={form.is_combination}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Combination</label>
            </div>
          </div>

          {/* CLASSES */}
          <div>
            <label>Classes</label>
            <input
              placeholder="Search classes..."
              value={classSearch}
              onChange={(e) => setClassSearch(e.target.value)}
              className="form-control mb-2"
            />
            <select
              multiple
              name="class_ids"
              value={form.class_ids}
              onChange={handleChange}
              className="form-select"
              style={{ height: "120px" }}
            >
              {classes
                .filter((c) =>
                  c.name.toLowerCase().includes(classSearch.toLowerCase()),
                )
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.class_type})
                  </option>
                ))}
            </select>
          </div>

          {/* BRANDS */}
          <div>
            <label>Brands</label>
            <input
              type="text"
              placeholder="Add new brand (comma separated)"
              value={newBrandInput}
              onChange={(e) => setNewBrandInput(e.target.value)}
              className="form-control mb-2"
            />
            <select
              multiple
              name="brand_ids"
              value={form.brand_ids}
              onChange={handleChange}
              className="form-select"
              style={{ height: "120px" }}
            >
              {brands
                .filter((b) =>
                  b.name.toLowerCase().includes(brandSearch.toLowerCase()),
                )
                .map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
            </select>
          </div>

          {/* SUBMIT + CANCEL */}
          <div className="d-flex gap-2">
            <button
              type="submit"
              className={`btn ${form.id ? "btn-primary" : "btn-success"}`}
            >
              {form.id ? "Update Drug" : "Create Drug"}
            </button>

            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      {/* Sorting Controls */}
      <div className="mb-2 d-flex gap-2 align-items-center">
        <span>Sort by:</span>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => {
            setSortField("generic");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          Generic
          {sortField === "generic" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => {
            setSortField("brand");
            setSortOrder(
              sortField === "brand" && sortOrder === "asc" ? "desc" : "asc",
            );
          }}
        >
          Brand {sortField === "brand" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
      </div>

      {/* DRUG LIST */}
      <div className="card p-3">
        <h2>Drugs List</h2>
        <ul className="list-unstyled">
          {sortedDrugs.map((drug) => (
            <li key={drug.id} className="card mb-3 p-2 shadow-sm">
              <div className="d-flex align-items-center gap-2">
                <div className="fw-bold">{drug.generic_name}</div>
                {drug.is_top_200 && (
                  <span className="badge bg-warning text-dark">Top 200</span>
                )}
              </div>

              <div>
                <b>Classes:</b> {drug.classes.map((c) => c.name).join(", ")}
              </div>

              <div>
                <b>Brands:</b> {drug.brands.map((b) => b.name).join(", ")}
              </div>

              <div className="mt-2 d-flex gap-2">
                <button
                  onClick={() => handleEdit(drug)}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(drug.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
