import { getJobsId } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicantionByApplicat } from '@/lib/api/application';

const ApplyPage = async ({ params }) => {
    const { id } = await params
    const job = await getJobsId(id)
    
    const user = await getUserSession()
    console.log("user",user);
    
        const applicantions  = await getApplicantionByApplicat(user?.id)
        console.log('applications',applicantions);

        const plan = {
            name: 'Free',
            maxApplicationPerMonth: 3
        }
         

    
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
            <h2>You have applied so gar : {applicantions.length} out of {plan.maxApplicationPerMonth} this month </h2>
            {applicantions.length < plan.maxApplicationPerMonth && (<JobApply job={job}></JobApply>)}
        </div>
    );
};

export default ApplyPage;