import React from "react";

export default function DrugForm({
  form,
  handleChange,
  handleSubmit,
  resetForm,
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
  setForm,
}) {
  return (
    <div className="card p-3 mb-4">
      <h2>{form.id ? `Editing: ${form.generic_name}` : "Create New Drug"}</h2>

      <form onSubmit={handleSubmit} className="d-grid gap-3">
        <input
          name="generic_name"
          value={form.generic_name}
          onChange={handleChange}
          placeholder="Generic Name"
          className="form-control"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control"
        />

        {/* CLASSES */}
        <div>
          <input
            placeholder="Add new class"
            value={newClassInput}
            onChange={(e) => setNewClassInput(e.target.value)}
            className="form-control mb-2"
          />

          <input
            placeholder="Search..."
            value={classSearch}
            onChange={(e) => setClassSearch(e.target.value)}
            className="form-control mb-2"
          />

          <select
            multiple
            value={form.class_ids}
            onChange={(e) => {
              const options = e.target.options;
              let updated = [];

              for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                  updated.push(parseInt(options[i].value));
                }
              }

              setForm((prev) => ({
                ...prev,
                class_ids: updated,
              }));
            }}
            className="form-select"
          >
            {classes
              .filter((c) =>
                c.name.toLowerCase().includes(classSearch.toLowerCase()),
              )
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {/* BRANDS */}
        <div>
          <input
            placeholder="Add new brand"
            value={newBrandInput}
            onChange={(e) => setNewBrandInput(e.target.value)}
            className="form-control mb-2"
          />

          <select
            multiple
            value={form.brand_ids}
            onChange={(e) => {
              const options = e.target.options;
              const selected = [];
              for (let i = 0; i < options.length; i++) {
                if (options[i].selected)
                  selected.push(parseInt(options[i].value));
              }
              setForm((prev) => ({ ...prev, brand_ids: selected }));
            }}
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

        <div className="d-flex gap-2">
          <button className="btn btn-success">Save</button>
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
  );
}
