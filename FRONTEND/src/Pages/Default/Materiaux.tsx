import { useAuth } from "../../Providers/AuthProvider";
import { EMPLOYE_ROLES } from "../../Utils/employeRole";
import Admin_Materiaux from "../Admin/Admin_Materiaux";
import Employe_Materiaux from "../Employee/Employe_Materiaux";

const Materiaux = () => {
	const { role } = useAuth();
  
	if (!role) return null;
  
	if (role === 'Admin') {
	  return <Admin_Materiaux />;
	}
  
	if (EMPLOYE_ROLES.includes(role)) {
	  return < Employe_Materiaux />;
	}
  
	return <div>Accès non autorisé</div>;
  };
  
  export default Materiaux;