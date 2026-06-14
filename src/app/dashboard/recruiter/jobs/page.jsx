import JobTable from '@/components/dashboard/JobTable';
import { getLoggdInRecruiterCompany } from '@/lib/api/company';
import { getCompany } from '@/lib/api/jobs';
import React from 'react';


const RecruiterJobs = async () => {
    const company =await getLoggdInRecruiterCompany()

    const res = await getCompany(company._id);
    
    // API থেকে আসা রেসপন্সটি অ্যারে হিসেবে ধরে নিচ্ছি। 
    // যদি আপনার API রেসপন্স { data: [...] } ফরম্যাটে থাকে, তাহলে res.data পাস করবেন।
    const jobsData = Array.isArray(res) ? res : [res]; 

    return (
        <div className="p-6 w-full max-w-7xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Manage Jobs</h2>
                <p className="text-muted-foreground text-sm">Recruiter company manage all jobs</p>
            </div>
            
            {/* ফেচ করা ডাটা ক্লায়েন্ট কম্পোনেন্টে প্রপস হিসেবে পাঠানো হচ্ছে */}
            <JobTable jobs={jobsData}></JobTable>
        </div>
    );
};

export default RecruiterJobs;