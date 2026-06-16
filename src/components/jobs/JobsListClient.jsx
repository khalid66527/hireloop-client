"use client";

import React, { useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "./JobsFilters";


export default function JobsListClient({ initialJobs }) {
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);

  const handleFilterChange = (filters) => {
    const filtered = initialJobs.filter((job) => {
      // 1. Search Logic
      const matchSearch = filters.search
        ? job.title?.toLowerCase().includes(filters.search.toLowerCase()) || 
          job.companyName?.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      // 2. Category Logic
      const matchCategory = filters.category 
        ? job.category?.toLowerCase() === filters.category.toLowerCase() 
        : true;

      // 3. Type Logic
      const matchType = filters.type 
        ? job.type?.toLowerCase() === filters.type.toLowerCase() 
        : true;

      // 4. Location & Remote Logic
      let matchLocation = true;
      if (filters.location === "Remote") {
        matchLocation = job.isRemote === true;
      } else if (filters.location) {
        matchLocation = job.location?.toLowerCase() === filters.location.toLowerCase();
      }

      return matchSearch && matchCategory && matchType && matchLocation;
    });

    setFilteredJobs(filtered);
  };

  return (
    <div className="w-full">
      {/* Filter Component */}
      <JobFilters onFilterChange={handleFilterChange} />

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-zinc-500 bg-[#18181b] rounded-xl border border-zinc-800 border-dashed">
          <p className="text-lg font-medium text-zinc-300">No jobs match your criteria.</p>
          <p className="text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}