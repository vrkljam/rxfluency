import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.username.trim(), formData.password);
      const from = location.state?.from?.pathname || "/profile";
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.detail || "Login failed, try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mt-5 login-page ">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
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
                    value={formData.username}
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

                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Logging in ...." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
