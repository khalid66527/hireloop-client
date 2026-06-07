import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function CTASection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[650px] w-full bg-black text-white px-4 overflow-hidden">
      
      {/* 1. Base Grid Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40">
        <Image
          src="/images/cta-bg.png"
          alt="Background Grid"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* 2. Blue Glow Spreading Effect (Majhkhane blue color choriye porar jonno) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[400px] md:h-[500px] rounded-full pointer-events-none select-none z-0 opacity-60 blur-[120px] md:blur-[160px]"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,1) 10%, rgba(29,78,216,0.4) 40%, rgba(0,0,0,0) 70%)"
        }}
      />

      {/* Content Container */}
      <div className="max-w-3xl mx-auto text-center z-10 flex flex-col items-center gap-6">
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-2xl bg-clip-text bg-gradient-to-b from-white to-zinc-300">
          Your next role is <br /> already looking for you
        </h2>

        {/* Subtitle */}
        <p className="text-zinc-400 text-base md:text-lg max-w-lg font-normal">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <Button 
            className="bg-white text-black font-medium px-6 h-12 text-sm rounded-xl w-full sm:w-auto hover:bg-zinc-200 transition-colors"
            radius="md"
          >
            Create a free account
          </Button>
          
          <Button 
            variant="bordered"
            className="border-zinc-800 text-zinc-300 font-medium px-6 h-12 text-sm rounded-xl w-full sm:w-auto hover:bg-zinc-900/50 hover:text-white transition-all"
            radius="md"
          >
            View pricing
          </Button>
        </div>

      </div>
    </section>
  );
}