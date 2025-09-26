import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authContext";

const PrivateRoutes = () => {
  const { authState } = useAuth();
  
  if(!authState.user){
    return <Navigate to="/login" replace />;
  }
  
    return <Outlet />;
};

export default PrivateRoutes;
