import { Navigate, Outlet } from "react-router-dom";

const AuthRedirect = () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else if (role === "user") {
      return <Navigate to="/me" replace />;
    }
  }

  return <Outlet />;
};

export default AuthRedirect;
