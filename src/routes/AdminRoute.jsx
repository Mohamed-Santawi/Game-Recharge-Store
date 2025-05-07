import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { currentUser, userData } = useAuth();

  if (!currentUser || userData?.role !== "admin") {
    // Redirect to home if not authenticated or not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;