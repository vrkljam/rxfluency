import api from "./api";

export const login = async (username, password) => {
  try {
    const res = await api.post("token/", { username, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    return res.data;
  } catch (err) {
    throw err.response?.data || "Login failed";
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access");
};

import axios from "axios";

// ✅ Add this function
export const getProfile = async () => {
  const token = localStorage.getItem("access");
  if (!token) throw new Error("No token found");

  const res = await api.get("auth/profile/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // should include is_staff
};
