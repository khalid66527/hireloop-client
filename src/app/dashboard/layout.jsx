import { DashboardSidebar } from "@/components/dashboard/DashboardSideBar";


const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen bg-[#09090b]">
      
      {/* 1. Left Sidebar Container */}
      <div className="w-64 border-r border-gray-800">
         <DashboardSidebar></DashboardSidebar>
      </div>

      {/* 2. Main Content Area - FIX EIKHANE */}
      {/* 'flex-1' dewar karone sidebar er por joto faka width ache, shob eita niye nibe */}
      <div className="flex-1 w-full flex flex-col">
        {children}
      </div>
      
    </div>
    );
};

export default DashboardLayout;