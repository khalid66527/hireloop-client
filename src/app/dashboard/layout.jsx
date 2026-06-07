import { DashboardSidebar } from "@/components/dashboard/DashboardSideBar";


const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar></DashboardSidebar>
            <div className="">{children}</div>
        </div>
    );
};

export default DashboardLayout;