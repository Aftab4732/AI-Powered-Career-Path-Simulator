import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, hasProfile }) => {
  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  if (!hasProfile) {
    return <Navigate to="/profile-form" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;