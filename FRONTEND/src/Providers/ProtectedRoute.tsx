import { useEffect, type PropsWithChildren } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import api from "../Utils/axios";

const ProtectedRoutes = ({ children }: PropsWithChildren) => {
	const { isAuthenticated, loading, setRole, setUser, setLoading } = useAuth();

	const checkAuth = async () => {
		setLoading(true);
		try {
		  const { data } = await api.get('/auth/me', {
			withCredentials: true,
		  });
	  
		  setUser(data.roleId);
		  setRole(data.role);
		} catch {
		  setUser(null);
		  setRole(null);
		} finally {
		  setLoading(false);
		}
	  };
	  
	  useEffect(() => {
		checkAuth();
	  }, []);

	if (loading) {
		return <div>Chargement...</div>; // ou spinner
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};


export default ProtectedRoutes;