import React from "react";
import { getJobs } from "@/lib/api/jobs";
import JobsListClient from "@/components/jobs/JobsListClient"; // নতুন ক্লায়েন্ট কম্পোনেন্ট

export default async function JobsPage() {
  // API থেকে ডেটা ফেচ করা হচ্ছে
  const jobs = await getJobs(); 

  // যদি ডেটা না থাকে বা খালি অ্যারে হয়
  if (!jobs || jobs.length === 0) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-400">
        No jobs found at the moment.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Explore Opportunities
          </h1>
          <p className="text-zinc-400">
            Find your next role from our top curated companies.
          </p>
        </div>

        {/* Client Component যেখানে ফিল্টার এবং গ্রিড থাকবে */}
        <JobsListClient initialJobs={jobs} />

      </div>
    </div>
  );
}