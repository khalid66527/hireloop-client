"use client"
import DashboardStats from '@/components/dashboard/DashboardStats';
import { useSession } from '@/lib/auth-client';
import React from 'react';



const RecruiterDashboardHomePage = () => {

    const { data: session, isPending } = useSession()
    if (isPending) {
        <div className="">Loading...</div>
    }
    const recruiterStats = [
        { title: "Total Job Posts", value: "48", iconName: "file" },
        { title: "Total Applicants", value: "1,284", iconName: "users" },
        { title: "Active Jobs", value: "18", iconName: "zap" },
        { title: "Jobs Closed", value: "32", iconName: "check" },
    ];

    const user = session?.user;
    console.log("Session Data in Recruiter Deshboard Home page", user);
    return (
       
            <div className=" w-full ">
                <div className=" w-full bg-blue-600 min-h-screen space-y-6">
                    <h1 className="text-2xl font-bold text-white">Recruiter Overview</h1>
                    <h1 className='text-xl text-white'>WelCome Back , ` {user?.name} ` </h1>

                    {/* Simply feed the data array into the component */}
                    <DashboardStats data={recruiterStats}></DashboardStats>

                </div>
            </div>
    );
};

export default RecruiterDashboardHomePage;