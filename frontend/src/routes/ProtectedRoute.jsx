import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useContext(AuthContext);
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
