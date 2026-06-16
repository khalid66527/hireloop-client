import { getJobsId } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';

const ApplyPage = async ({ params }) => {
    const { id } = await params
    const job = await getJobsId(id)
    console.log("job id data 2" ,job);

    const user = await getUserSession()
    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
    }
    if (user.role !== "seeker") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center max-w-md">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">
                        Access Denied
                    </h2>
                    <p className="text-gray-700">
                        Only Job Seekers are allowed to apply for jobs.
                        Users with other roles cannot apply for any job.
                    </p>
                </div>
            </div>
        )
    }
 
    return (
        <div>
            <JobApply job={job}></JobApply>
        </div>
    );
};

export default ApplyPage;