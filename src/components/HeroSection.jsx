"use client";

import { Magnifier, MapPin } from "@gravity-ui/icons";

export default function HeroSection() {
  return (
    <section className="relative w-full py-24 bg-black text-white flex items-center justify-center">
      
 
      <div className="relative z-10 w-full max-w-4xl  rounded-xl p-8 backdrop-blur-md ">
        
        {/* 🔥 Top Badge */}
        <div className="text-center mb-6">
          <span className="text-xs tracking-widest text-gray-400 border border-gray-600 px-4 py-1 rounded-full">
            🔥 50,000 NEW JOBS THIS MONTH
          </span>
        </div>

        {/* 🧠 Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Find Your Dream Job Today
        </h1>

        {/* 📄 Description */}
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
        </p>

        {/* 🔍 Search Box */}
        <div className="flex flex-col md:flex-row items-center gap-3 bg-black/60 border border-gray-700 rounded-full p-2">
          
          {/* Job input */}
          <div className="flex items-center w-full px-3">
            <Magnifier className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-gray-600"></div>

          {/* Location */}
          <div className="flex items-center w-full px-3">
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          {/* Button */}
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full">
            <Magnifier className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 🏷 Trending */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Trending Position:
          <span className="ml-2 text-white">Product Designer</span>
          <span className="ml-2 text-white">AI Engineering</span>
          <span className="ml-2 text-white">DevOps Engineer</span>
        </div>
      </div>
    </section>
  );
}