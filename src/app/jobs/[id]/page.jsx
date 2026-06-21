import React from 'react';
import { getJobsId } from '@/lib/api/jobs';
import { Card, Button, Chip, Avatar } from '@heroui/react';
// GravityUI Icons
import { Briefcase, MapPin, Calendar, CircleDollar, ArrowLeft } from '@gravity-ui/icons';
import Link from 'next/link';

const JobDetailsPage = async ({ params }) => {

    const { id } = await params;
    const job = await getJobsId(id);



    if (!job) {
        return <div className="text-center py-10">Job not found.</div>;
    }
    const companyName = job.companyName || "Company Name";
    const logoSrc = job.companyLogo;

    const formattedDeadline = new Date(job.deadline).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Back Button */}
            <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
                <ArrowLeft width={16} height={16} /> Back to Jobs
            </Link>

            {/* Header Main Card */}
            <Card className="mb-6 shadow-sm">
                <Card.Content className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={logoSrc}
                            alt={`${companyName} Logo`}
                            width={85}
                            height={50}
                            className="rounded-full object-cover border border-zinc-700/50 bg-zinc-800"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">{job.title}</h1>
                            <p className="text-gray-500 font-medium">{job.companyName}</p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                <Chip size="sm" variant="flat" color="primary" className="capitalize">
                                    {job.type}
                                </Chip>
                                {job.isRemote && (
                                    <Chip size="sm" variant="flat" color="success">
                                        Remote
                                    </Chip>
                                )}
                                <Chip size="sm" variant="flat" className="capitalize">
                                    {job.category}
                                </Chip>
                            </div>
                        </div>
                    </div>

                    <Link 
                    href={`/jobs/${job._id}/apply`} 
                    size="lg"                   className="text-center p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                    >
                        Apply Now
                    </Link>
                </Card.Content>
            </Card>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Left Side: Job Breakdown */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="shadow-sm">
                        <Card.Header>
                            <Card.Title>Job Responsibilities</Card.Title>
                            <Card.Description>What you will be doing daily</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {job.responsibilities}
                            </p>
                        </Card.Content>
                    </Card>

                    <Card className="shadow-sm">
                        <Card.Header>
                            <Card.Title>Requirements</Card.Title>
                            <Card.Description>Skills and experience required</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {job.requirements}
                            </p>
                        </Card.Content>
                    </Card>

                    <Card className="shadow-sm">
                        <Card.Header>
                            <Card.Title>Benefits & Perks</Card.Title>
                            <Card.Description>What we offer you</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {job.benefits}
                            </p>
                        </Card.Content>
                    </Card>
                </div>

                {/* Right Side: Quick Specs Sidebar */}
                <div className="space-y-6">
                    <Card className="shadow-sm bg-gray-50/50 dark:bg-zinc-900/50">
                        <Card.Header>
                            <Card.Title>Job Summary</Card.Title>
                        </Card.Header>
                        <Card.Content className="space-y-4">

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-gray-600 dark:text-gray-400">
                                    <CircleDollar width={18} height={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Salary Range</p>
                                    <p className="text-sm font-semibold">
                                        {job.minSalary} - {job.maxSalary} {job.currency} / mo
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-gray-600 dark:text-gray-400">
                                    <MapPin width={18} height={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Location</p>
                                    <p className="text-sm font-semibold">{job.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-gray-600 dark:text-gray-400">
                                    <Briefcase width={18} height={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Job Type</p>
                                    <p className="text-sm font-semibold capitalize">{job.type}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-gray-600 dark:text-gray-400">
                                    <Calendar width={18} height={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Application Deadline</p>
                                    <p className="text-sm font-semibold text-danger">{formattedDeadline}</p>
                                </div>
                            </div>

                        </Card.Content>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default JobDetailsPage;