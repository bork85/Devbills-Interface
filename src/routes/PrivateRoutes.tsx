import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { authState } = useAuth();
  
  if(authState.isloading){
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  if(!authState.user){
    return <Navigate to="/login" replace />;
  }
  
    return <Outlet />;
};

export default PrivateRoutes;
