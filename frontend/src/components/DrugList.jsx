import React from "react";
import DrugCard from "./DrugCard";

export default function DrugList({ drugs, onEdit, onDelete, fetchData }) {
  if (!drugs.length) {
    return <p>No drugs found.</p>;
  }

  return (
    <ul className="list-unstyled">
      {(drugs || []).map((drug) => (
        <DrugCard
          key={drug.id}
          drug={drug}
          onEdit={onEdit}
          onDelete={onDelete}
          fetchData={fetchData}
        />
      ))}
      {(!drugs || drugs.length === 0) && <p>No drugs found.</p>}
    </ul>
  );
}
