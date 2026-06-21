"use client";

import React from "react";
import { Card, Label } from "@heroui/react";
import { MapPin, House, CircleDollar, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

// Date Formatting Helper
const formatDate = (isoString) => {
  if (!isoString) return "Recently";
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Salary Formatting Helper
const formatSalary = (min, max, currency) => {
  if (!min || !max) return "Negotiable";
  const minK = (parseInt(min) / 1000).toFixed(1).replace(/\.0$/, '');
  const maxK = (parseInt(max) / 1000).toFixed(1).replace(/\.0$/, '');
  const currencySymbol = currency === 'USD' ? '$' : currency === 'BDT' ? '৳' : currency + ' ';
  return `${currencySymbol}${minK}k - ${maxK}k`;
};

export default function JobCard({ job }) {
  
  const companyName = job.companyName || "Company Name";
  const logoSrc = job.companyLogo ;

  return (
    <Card 
      className="w-full p-6 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300 flex flex-col gap-0 group"
    >
      <Card.Header className="flex flex-col gap-2 pb-4 px-0">
        
        {/* Company Info */}
        <div className="flex items-center gap-2.5 mb-1">
          <img 
            src={logoSrc} 
            alt={`${companyName} Logo`}
            width={55} 
            height={50}
            className="rounded-full object-cover border border-zinc-700/50 bg-zinc-800"
          />
          <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
            {companyName}
          </span>
        </div>
        
        {/* Job Title */}
        <Card.Title className="text-2xl md:text-[26px] font-bold tracking-tight text-white m-0 leading-tight">
          {job.title}
        </Card.Title>
        
        {/* Description Snippet */}
        <Card.Description className="text-sm text-zinc-400 mt-1.5 leading-relaxed font-normal line-clamp-2">
          {job.responsibilities}
        </Card.Description>
        
      </Card.Header>

      {/* Tags Section */}
      <Card.Content className="flex flex-col gap-3 py-4 border-t border-zinc-800/50 px-0">
        <div className="flex flex-wrap gap-2.5 pt-1">
          
          {/* Location */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-[#fca5a5] text-xs font-medium">
            <MapPin className="text-[#fca5a5]" size={14} />
            {job.location}
          </div>

          {/* Remote/On-site */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-[#fca5a5] text-xs font-medium capitalize">
            <House className="text-[#fca5a5]" size={14} />
            {job.isRemote ? "Remote" : job.type || "On-site"}
          </div>

          {/* Salary */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-[#fca5a5] text-xs font-medium">
            <CircleDollar className="text-[#fca5a5]" size={14} />
            {formatSalary(job.minSalary, job.maxSalary, job.currency)}
          </div>

        </div>
      </Card.Content>

      {/* Footer / Actions */}
      <Card.Footer className="border-t border-zinc-800/50 pt-5 mt-auto flex items-end justify-between gap-4 px-0">
        
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">Deadline</span>
          <Label className="text-sm text-zinc-300 font-medium">
            {formatDate(job.deadline)}
          </Label>
        </div>
        
        {/* Dynamic Link to Job Details Page */}
        <Link 
          href={`/jobs/${job._id}`} 
          className="flex items-center gap-1.5 text-sm font-semibold text-white group/btn hover:text-[#fca5a5] transition-colors duration-200"
        >
          Apply Now
          <ArrowRight 
            size={16} 
            className="text-white group-hover/btn:text-[#fca5a5] group-hover/btn:translate-x-1 transition-all duration-200" 
          />
        </Link>
        
      </Card.Footer>
    </Card>
  );
}