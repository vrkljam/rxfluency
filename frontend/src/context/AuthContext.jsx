import { createContext, useEffect, useState } from "react";
import { isAuthenticated, getProfile, login as apiLogin } from "../api/auth";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setIsAuth();
      getProfile().then((data) => setUser(data));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      await apiLogin(username, password);
      setIsAuth(true);
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      console.error(error);
      setIsAuth(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuth(false);
    setUser(null);
    window.location.href = "/login";
    // <Navigate to="/login" replace />;
  };

  return (
    <AuthContext.Provider value={{ loading, login, logout, isAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};
