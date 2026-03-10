import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAuth, user, loading } = useContext(AuthContext);
  if (!user) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/login" replace />;
  if (!user?.is_staff) return <Navigate to="/" replace />; // only admin users

  return children;
};

export default AdminRoute;
