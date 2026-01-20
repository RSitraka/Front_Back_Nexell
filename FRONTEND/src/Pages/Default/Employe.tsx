import { useAuth } from "../../Providers/AuthProvider";
import { EMPLOYE_ROLES } from "../../Utils/employeRole";
import Admin_Employe from "../Admin/Admin_Employe";
import Employe_Employe from "../Employee/Employe_Employe";

const Employe = () => {
	const { role } = useAuth();
  
	if (!role) return null;
  
	if (role === 'Admin') {
	  return <Admin_Employe />;
	}
  
	if (EMPLOYE_ROLES.includes(role)) {
	  return < Employe_Employe />;
	}
  
	return <div>Accès non autorisé</div>;
  };
  
  export default Employe;