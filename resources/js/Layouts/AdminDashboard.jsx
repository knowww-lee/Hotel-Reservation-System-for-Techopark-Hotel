import { useEffect } from "react";
import DashboardHeader from "../Layouts/DashboardHeader";
import Sidebar from "../Layouts/Sidebar";

const AdminDashboard = ({children}) => {
    useEffect(() => {
        console.log('AdminDashboard children:', children);
    }, [children]);

    if (!children) {
        console.error('No children provided to AdminDashboard');
        return <div>Error: No content to display</div>;
    }
  
    return (
        <div className="flex flex-col lg:flex-row h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6 bg-[#D9D9D9] lg:px-20 pb-20">
                <DashboardHeader />
                {children}
            </main>    
        </div>
    );
};

export default AdminDashboard;
