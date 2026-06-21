import { getJobsId } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicantionByApplicat } from '@/lib/api/application';
import Link from 'next/link';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const job = await getJobsId(id);
    
    const user = await getUserSession();
    
    const applicantions = await getApplicantionByApplicat(user?.id);

    const plan = {
        name: 'Free',
        maxApplicationPerMonth: 3
    };

    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== "seeker") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="p-8 bg-red-50 border border-red-200 rounded-xl shadow-sm text-center max-w-md w-full">
                    <svg className="mx-auto h-14 w-14 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-red-700 mb-3">
                        Access Denied
                    </h2>
                    <p className="text-red-600/90 text-sm md:text-base leading-relaxed">
                        Only <span className="font-semibold">Job Seekers</span> are allowed to apply for jobs.
                        Users with other roles cannot apply for any job.
                    </p>
                </div>
            </div>
        );
    }
 
    const isLimitReached = applicantions.length >= plan.maxApplicationPerMonth;
    const progressPercentage = Math.min((applicantions.length / plan.maxApplicationPerMonth) * 100, 100);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Application Status Section */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                        Application Status
                    </h1>

                    <div className={`p-6 rounded-xl border transition-colors ${isLimitReached ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    {plan.name} Plan Usage
                                </h2>
                                <p className="text-gray-600 mt-1 text-sm md:text-base">
                                    You have applied to <span className="font-bold text-gray-900">{applicantions.length}</span> out of <span className="font-bold text-gray-900">{plan.maxApplicationPerMonth}</span> jobs this month.
                                </p>
                            </div>

                            {/* Plan Upgrade Button for when limit is reached */}
                            {isLimitReached && (
                                <Link 
                                    href="/plan" 
                                    className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors w-full sm:w-auto shadow-sm"
                                >
                                    Upgrade Plan
                                </Link>
                            )}
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="mt-6">
                            <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden">
                                <div 
                                    className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${isLimitReached ? 'bg-orange-500' : 'bg-blue-600'}`} 
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Hint for non-limit users */}
                    {!isLimitReached && (
                        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p>Purchase a plan to apply for more positions.</p>
                            <Link href="/plan" className="mt-2 sm:mt-0 font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-all">
                                View Pricing Plans &rarr;
                            </Link>
                        </div>
                    )}
                </div>

                {/* Job Apply Component Section */}
                {applicantions.length < plan.maxApplicationPerMonth && (
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 mt-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                            Complete Your Application
                        </h2>
                        <JobApply job={job} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplyPage;