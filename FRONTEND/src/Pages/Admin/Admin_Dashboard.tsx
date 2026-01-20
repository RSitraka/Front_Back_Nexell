import Navbar from "../../Components/Admin/Navbar";
import { Outlet } from 'react-router-dom';



const Admin_Dashboard = () => {
    return (
        <div className="bg-[#101728] h-screen w-full flex flex-col overflow-hidden">
            <div className="w-full z-50">
                <Navbar />
            </div>
            <div className="flex-1 overflow-y-auto p-6 relative">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin_Dashboard
