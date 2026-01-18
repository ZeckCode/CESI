import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, role, authChecked, children }) => {
  if (!authChecked) return null; // wait until /me finishes

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;