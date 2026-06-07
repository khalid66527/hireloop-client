import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <StatsSection></StatsSection>
      <CTASection></CTASection>
    </div>
  );
}
