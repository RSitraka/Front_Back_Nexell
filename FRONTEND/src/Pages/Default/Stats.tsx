import { useAuth } from "../../Providers/AuthProvider";
import { EMPLOYE_ROLES } from "../../Utils/employeRole";
import Admin_Stats from "../Admin/Admin_Stats";
import Employe_Stats from "../Employee/Employe_Stats";

const Stats = () => {
	const { role } = useAuth();
  
	if (!role) return null;
  
	if (role === 'Admin') {
	  return <Admin_Stats />;
	}
  
	if (EMPLOYE_ROLES.includes(role)) {
	  return < Employe_Stats />;
	}
  
	return <div>Accès non autorisé</div>;
  };
  
  export default Stats;