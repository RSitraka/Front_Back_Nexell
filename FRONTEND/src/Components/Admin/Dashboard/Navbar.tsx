import {
    IoHome,
    IoLogOutOutline,
} from "react-icons/io5";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";
import { useAuth } from "../../../Providers/AuthProvider";


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 1. On récupère l'URL actuelle
    const { logout } = useAuth();

    const nexellRed = "text-[#C62828]";
    const baseStyle = "cursor-pointer flex gap-2 px-4 py-2 items-center text-sm font-bold transition-all duration-300 ease-in-out rounded-lg group";
    const activeStyle = "bg-gradient-to-r from-[#208060] to-[#6090A0] text-white shadow-md";
    const inactiveStyle = "text-[#555555] hover:bg-gradient-to-r hover:from-[#208060] hover:to-[#6090A0] hover:text-white hover:shadow-md";
    const getItemClass = (path: string) => {
        const isActive = path === "/" 
            ? location.pathname === "/" 
            : location.pathname.startsWith(path);

        return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
    };
    const getIconClass = (path: string) => {
        const isActive = path === "/" 
            ? location.pathname === "/" 
            : location.pathname.startsWith(path);
        return isActive 
            ? "text-white text-lg" 
            : "text-[#208060] group-hover:text-white text-lg transition-colors";
    };

    return (
        <div className="w-full backdrop-blur-md bg-white/80 border-b border-[#555555]/10 shadow-sm px-6 py-3 flex flex-row items-center justify-between">            
            
            <div className="flex flex-col cursor-pointer" onClick={() => navigate("/")}>
                <h2 className={`text-2xl font-extrabold tracking-tight ${nexellRed}`}>
                    nexell
                </h2>
                <span className="text-[0.6rem] font-semibold tracking-widest text-[#555555] opacity-80 hidden lg:block">
                    NEXT EVOLUTION FOR EXCELLENCY
                </span>
            </div>

            <div className="flex flex-row gap-2 items-center overflow-x-auto">
                <div
                    onClick={() => navigate("/")}
                    className={getItemClass("/")}>
                    <IoHome className={getIconClass("/")} />
                    <span className="hidden md:block">Accueil</span>
                </div>
                <div
                    onClick={() => navigate("/sites")}
                    className={getItemClass("/sites")}>
                    <FaBuilding className={getIconClass("/sites")} />
                    <span className="hidden md:block">Sites</span>
                </div>
                <div
                    onClick={() => navigate("/employé")}
                    className={getItemClass("/employé")}>
                    <FaUsers className={getIconClass("/employé")} />
                    <span className="hidden md:block">Employés</span>
                </div>
                <div
                    onClick={() => navigate("/matériaux")}
                    className={getItemClass("/matériaux")}>
                    <FaTools className={getIconClass("/matériaux")} />
                    <span className="hidden md:block">Matériaux</span>
                </div>
                <div
                    onClick={() => navigate("/dashboard")}
                    className={getItemClass("/dashboard")} >
                    <RiDashboardHorizontalFill className={getIconClass("/dashboard")} />
                    <span className="hidden md:block">Tableau de bord</span>
                </div>

                <div
                    onClick={logout}
                    className={`${baseStyle} ${inactiveStyle}`} >
                    <IoLogOutOutline className="text-[#208060] group-hover:text-white text-lg transition-colors" />
                    <span className="hidden md:block">Déconnection</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar