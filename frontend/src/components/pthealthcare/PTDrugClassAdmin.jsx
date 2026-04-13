import { useEffect, useState } from "react";
import api from "../../api/api";

export default function PTDrugClassAdmin() {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState("");

  // -----------------------
  // LOAD CLASSES
  // -----------------------
  const fetchClasses = async () => {
    try {
      const res = await api.get("/pthealthcare/drug-classes/");
      setClasses(res.data);
    } catch (err) {
      console.error("Error loading classes:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // -----------------------
  // CREATE CLASS
  // -----------------------
  const addClass = async (e) => {
    e.preventDefault();
    if (!newClass.trim()) return;

    try {
      await api.post("/pthealthcare/drugclasses/", {
        name: newClass,
      });

      setNewClass("");
      fetchClasses();
    } catch (err) {
      console.error("Error adding class:", err);
    }
  };

  // -----------------------
  // UPDATE CLASS
  // -----------------------
  const updateClass = async (id, name) => {
    try {
      await api.put(`/pthealthcare/drugclasses/${id}/`, {
        name,
      });

      fetchClasses();
    } catch (err) {
      console.error("Error updating class:", err);
    }
  };

  // -----------------------
  // DELETE CLASS
  // -----------------------
  const deleteClass = async (id) => {
    try {
      await api.delete(`/pthealthcare/drugclasses/${id}/`);
      fetchClasses();
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Drug Class Admin</h2>

      {/* CREATE */}
      <form onSubmit={addClass} className="mb-3 d-flex gap-2">
        <input
          className="form-control"
          placeholder="New class name..."
          value={newClass}
          onChange={(e) => setNewClass(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>

      {/* LIST */}
      {classes.map((cls) => (
        <div
          key={cls.id}
          className="card mb-2 p-2 d-flex flex-row gap-2 align-items-center"
        >
          <input
            className="form-control"
            value={cls.name}
            onChange={(e) => {
              const updated = classes.map((c) =>
                c.id === cls.id ? { ...c, name: e.target.value } : c,
              );
              setClasses(updated);
            }}
          />

          <button
            className="btn btn-primary btn-sm"
            onClick={() => updateClass(cls.id, cls.name)}
          >
            Save
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteClass(cls.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
