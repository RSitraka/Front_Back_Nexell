import { useAuth } from "../../Providers/AuthProvider";
import { EMPLOYE_ROLES } from "../../Utils/employeRole";
import Admin_Sites from "../Admin/Admin_Sites";
import Employe_Sites from "../Employee/Employe_Sites";

const Sites = () => {
	const { role } = useAuth();
  
	if (!role) return null;
  
	if (role === 'Admin') {
	  return <Admin_Sites />;
	}
  
	if (EMPLOYE_ROLES.includes(role)) {
	  return < Employe_Sites />;
	}
  
	return <div>Accès non autorisé</div>;
  };
  
  export default Sites;