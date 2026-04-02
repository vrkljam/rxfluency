import React, { useEffect, useState } from "react";
import api from "../api/api";
import DrugForm from "../components/DrugForm";
import DrugList from "../components/DrugList";

export default function DrugAdmin() {
  const [drugs, setDrugs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [brands, setBrands] = useState([]);

  const [classSearch, setClassSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [newClassInput, setNewClassInput] = useState("");
  const [newBrandInput, setNewBrandInput] = useState("");
  const [sortField, setSortField] = useState("generic"); // generic or brand
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    id: null,
    generic_name: "",
    description: "",
    is_top_200: false,
    is_verified: false,
    is_combination: false,
    class_ids: [],
    brand_ids: [],
  });

  // Fetch all data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [d, c, b] = await Promise.all([
      api.get("/drugs/"),
      api.get("/drugclasses/"),
      api.get("/brands/"),
    ]);
    setDrugs(d.data.results || d.data);
    setClasses(c.data.results || c.data);
    setBrands(b.data.results || b.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new classes if needed
    let allClassIds = [...form.class_ids];
    if (newClassInput.trim()) {
      const newClasses = newClassInput
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      for (const name of newClasses) {
        try {
          const res = await api.post("/drugclasses/", { name });
          allClassIds.push(res.data.id);
        } catch {
          const existing = classes.find(
            (c) => c.name.toLowerCase() === name.toLowerCase(),
          );
          if (existing) allClassIds.push(existing.id);
        }
      }
    }

    // Create new brands if needed
    let allBrandIds = [...form.brand_ids];
    if (newBrandInput.trim()) {
      const newBrands = newBrandInput
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean);

      for (const name of newBrands) {
        try {
          const res = await api.post("/brands/", { name });
          allBrandIds.push(res.data.id);
        } catch {
          const existing = brands.find(
            (b) => b.name.toLowerCase() === name.toLowerCase(),
          );
          if (existing) allBrandIds.push(existing.id);
        }
      }
    }

    const payload = {
      ...form,
      class_ids: allClassIds,
      brand_ids: allBrandIds,
    };

    if (form.id) await api.put(`/drugs/${form.id}/`, payload);
    else await api.post("/drugs/", payload);

    resetForm();
    fetchData();
  };

  const resetForm = () => {
    setForm({
      id: null,
      generic_name: "",
      description: "",
      is_top_200: false,
      is_verified: false,
      is_combination: false,
      class_ids: [],
      brand_ids: [],
    });
    setNewClassInput("");
    setNewBrandInput("");
  };

  const handleEdit = (drug) => {
    setForm({
      id: drug.id,
      generic_name: drug.generic_name,
      description: drug.description,
      is_top_200: drug.is_top_200,
      is_verified: drug.is_verified,
      is_combination: drug.is_combination,
      class_ids: drug.classes.map((c) => c.id),
      brand_ids: drug.brands.map((b) => b.id),
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/drugs/${id}/`);
    fetchData();
  };

  // Map brand_ids and class_ids to full objects for display
  const drugsWithObjects = drugs.map((drug) => {
    // Use existing classes array if it exists, else map from class_ids
    const mappedClasses =
      drug.classes?.length > 0
        ? drug.classes
        : (drug.class_ids || [])
            .map((id) => classes.find((c) => c.id === id))
            .filter(Boolean);

    // Use existing brands array if it exists, else map from brand_ids
    const mappedBrands =
      drug.brands?.length > 0
        ? drug.brands
        : (drug.brand_ids || [])
            .map((id) => brands.find((b) => b.id === id))
            .filter(Boolean);

    return {
      ...drug,
      classes: mappedClasses,
      brands: mappedBrands,
    };
  });

  // Sorted list
  const sortedDrugs = [...drugsWithObjects].sort((a, b) => {
    let aValue = "",
      bValue = "";
    if (sortField === "generic") {
      aValue = a.generic_name.toLowerCase();
      bValue = b.generic_name.toLowerCase();
    } else if (sortField === "brand") {
      aValue = a.brands[0]?.name.toLowerCase() || "";
      bValue = b.brands[0]?.name.toLowerCase() || "";
    }
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredDrugs = sortedDrugs.filter((drug) => {
    const term = searchTerm.toLowerCase();
    const genericMatch = drug.generic_name.toLowerCase().includes(term);
    const brandMatch = drug.brands.some((b) =>
      b.name.toLowerCase().includes(term),
    );
    return genericMatch || brandMatch;
  });

  return (
    <div className="container py-4">
      <h1>Drug Admin</h1>

      <DrugForm
        {...{
          form,
          setForm,
          handleChange,
          handleSubmit,
          classes,
          brands,
          classSearch,
          setClassSearch,
          brandSearch,
          setBrandSearch,
          newClassInput,
          setNewClassInput,
          newBrandInput,
          setNewBrandInput,
        }}
      />

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
          Generic{" "}
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
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by generic name or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DrugList
        drugs={filteredDrugs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fetchData={fetchData}
      />
    </div>
  );
}
