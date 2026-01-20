import { useAuth } from "../../Providers/AuthProvider";
import { EMPLOYE_ROLES } from "../../Utils/employeRole";
import Admin_Dashboard from "../Admin/Admin_Dashboard";
import Employe_Dashboard from "../Employee/Employe_Dashboard";

const Dashboard = () => {
	const { role } = useAuth();
  
	if (!role) return null;
  
	if (role === 'Admin') {
	  return <Admin_Dashboard />;
	}
  
	if (EMPLOYE_ROLES.includes(role)) {
	  return < Employe_Dashboard />;
	}
  
	return <div>Accès non autorisé</div>;
  };
  
  export default Dashboard;