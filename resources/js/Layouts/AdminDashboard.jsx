import Sidebar from "../Layouts/Sidebar"
import DashboardHeader from "../Layouts/DashboardHeader";
const AdminDashboard = ({children}) => {
  
    return (
        <>
        
            <div className="flex h-screen">
            <Sidebar></Sidebar>
           
            <main class="flex-1 overflow-y-auto p-6 bg-[#D9D9D9] px-20">
            <DashboardHeader></DashboardHeader>
                {children}
            </main>    
            </div>
        </>
    );
};

export default AdminDashboard;
