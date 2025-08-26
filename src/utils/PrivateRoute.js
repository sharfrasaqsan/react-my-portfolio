import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const { loading } = useData();

  if (loading) return <Loading />;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
