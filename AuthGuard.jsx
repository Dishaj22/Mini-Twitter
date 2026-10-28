import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContextValue";

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}