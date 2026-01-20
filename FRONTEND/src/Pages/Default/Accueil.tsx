import { useAuth } from "../../Providers/AuthProvider";
import { EMPLOYE_ROLES } from "../../Utils/employeRole";
import Admin_Accueil from "../Admin/Admin_Accueil";
import Employe_Accueil from "../Employee/Employe_Accueil";

const Accueil = () => {
	const { role } = useAuth();
	if (!role) return null;
  
	if (role === 'Admin') {
	  return <Admin_Accueil />;
	}
  
	if (EMPLOYE_ROLES.includes(role)) {
	  return < Employe_Accueil />;
	}
  
	return <div>Accès non autorisé</div>;
  };
  
  export default Accueil;