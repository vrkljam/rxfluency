import React, { useState } from "react";

const PasswordInput = ({ label, name, value, onChange, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}

      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="form-control"
        />

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPassword(!showPassword)}
        >
          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
