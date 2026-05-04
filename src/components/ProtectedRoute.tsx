import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { Role } from "../types";

export function ProtectedRoute({ role }: { role?: Role }) {
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);
  const user = useAppSelector((state) => state.hub.users.find((item) => item.id === currentUserId));

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
