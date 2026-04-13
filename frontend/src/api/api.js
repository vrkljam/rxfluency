import axios from "axios";

console.log("VITE_BACKENDs:", import.meta.env.VITE_BACKEND);
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
});

// attach access token
api.interceptors.request.use((config) => {
  const publicEndpoints = ["token/", "token/refresh/", "register/"];
  if (publicEndpoints.some((url) => config.url.includes(url))) {
    return config;
  }

  const token = localStorage.getItem("access");
  console.log("Attaching token to request:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry ||
      !localStorage.getItem("refresh")
    ) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      const res = await api.post("token/refresh/", {
        refresh: localStorage.getItem("refresh"),
      });
      localStorage.setItem("access", res.data.access);
      originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
      return api(originalRequest);
    } catch (error) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      return Promise.reject(error);
    }
  },
);
export default api;
