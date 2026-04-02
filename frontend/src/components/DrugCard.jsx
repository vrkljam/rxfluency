import React from "react";
import EditableBadgeList from "./EditableBadgeList";

export default function DrugCard({ drug, onEdit, onDelete, fetchData }) {
  return (
    <li className="card mb-3 p-2 shadow-sm">
      {/* Header */}
      <div className="d-flex align-items-center gap-2">
        <div className="fw-bold">{drug.generic_name}</div>

        {drug.is_top_200 && (
          <span className="badge bg-warning text-dark">Top 200</span>
        )}
        {drug.is_verified && <span className="badge bg-success">Verified</span>}
      </div>

      {/* Classes */}
      <div className="mt-2">
        <b>Classes:</b>
        <EditableBadgeList
          items={drug.classes || []} // ← default to empty array
          endpoint="drugclasses"
          fetchData={fetchData}
        />
      </div>

      {/* Brands */}
      <div className="mt-2">
        <b>Brands:</b>{" "}
        {drug.brands && drug.brands.length > 0
          ? drug.brands.map((b) => b.name).join(", ")
          : "None"}
      </div>

      {/* Actions */}
      <div className="mt-2 d-flex gap-2">
        <button onClick={() => onEdit(drug)} className="btn btn-primary btn-sm">
          Edit
        </button>
        <button
          onClick={() => onDelete(drug.id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
