import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

export default function ProtectedRoute({ roles }) {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; 
}

