import React, { useState } from "react";
import api from "../api/api";

export default function EditableBadgeList({ items, endpoint, fetchData }) {
  const [editingId, setEditingId] = useState(null);
  const [value, setValue] = useState("");

  return (
    <div className="d-flex flex-wrap gap-2 mt-1">
      {items.map((item) => (
        <div key={item.id} className="d-flex align-items-center gap-1">
          {editingId === item.id ? (
            <input
              value={value}
              autoFocus
              className="form-control form-control-sm"
              style={{ width: "120px" }}
              onChange={(e) => setValue(e.target.value)}
              onBlur={async () => {
                if (value.trim() && value !== item.name) {
                  await api.patch(`/${endpoint}/${item.id}/`, {
                    name: value,
                  });
                  fetchData();
                }
                setEditingId(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.target.blur();
              }}
            />
          ) : (
            <span
              className="badge bg-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditingId(item.id);
                setValue(item.name);
              }}
            >
              {item.name}
            </span>
          )}

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={async () => {
              if (window.confirm("Delete this item?")) {
                await api.delete(`/${endpoint}/${item.id}/`);
                fetchData();
              }
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
