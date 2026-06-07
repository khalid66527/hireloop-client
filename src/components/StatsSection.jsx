"use client";

import Image from "next/image";
import {
  Magnifier,
  ChartColumn,
  Star,
  Briefcase,
} from "@gravity-ui/icons";

const stats = [
  {
    icon: Briefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: ChartColumn,
    value: "12K",
    label: "Companies",
  },
  {
    icon: Magnifier,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function StatsSection() {
  return (
    <section className="relative w-full pt-70 pb-10 overflow-hidden bg-black text-white">
      
      {/* 🌍 Background Globe */}
      <div className="absolute  inset-0 z-0">
        <Image
          src="/images/globe.png"
          alt="Globe"
          fill
          className="object-cover  "
        />
        {/* <div className="absolute inset bg-gradient-to-b from-black/80 via-black/70 to-black"></div> */}
      </div>

      {/* ✨ Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        
        {/* Heading */}
        <h2 className="text-xl md:text-4xl sm:text-2xl text-gray-300 mb-30">
          Assisting over{" "}
          <span className="text-white font-semibold">15,000</span> job seekers
          <br />
          find their dream positions.
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left hover:bg-white/10 transition"
              >
                <Icon className="w-5 h-5 text-gray-300 mb-4" />

                <h3 className="text-2xl md:text-3xl font-bold">
                  {item.value}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}