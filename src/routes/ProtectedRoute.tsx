import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  requiredRole,
}: {
  requiredRole: "admin" | "user";
}) => {
  const role = localStorage.getItem("role");

  if (role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
