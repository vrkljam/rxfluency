import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import PasswordInput from "../components/PasswordInput";
import { useToast } from "../context/ToastContext";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (formData.password !== formData.password2) {
        setError("Passwords do not match");
        return;
      }
      const trimmedData = {
        ...formData,
        username: formData.username.trim(),
        email: formData.email.trim(),
      };

      const res = await api.post("auth/register/", trimmedData);
      console.log("Register response:", res);
      if (res.status === 201) {
      } else {
        setError("reggie failed");
      }

      // navigate("/login");  --> this was pre toast
    } catch (err) {
      if (err.response?.data) {
        const data = err.response.data;

        // Get first error message dynamically
        const firstKey = Object.keys(data)[0];
        const firstError = data[firstKey];

        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError("Registration failed yo");
      }
      setLoading(false);
      return;
    }

    // ✅ Show toast on successful registration
    showToast("✅ Registration successful! Please log in.", "success");

    // navigate to login after a short delay so user sees the toast
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="container mt-5 login-page">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Register</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    onChange={handleChange}
                  />
                </div>

                <PasswordInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <PasswordInput
                  label="Confirm Password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                />

                <button className="btn btn-success w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
