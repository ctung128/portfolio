import { Hero } from "@/components/home/Hero";
import { SpecializationPillars } from "@/components/home/SpecializationPillars";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { AboutSection } from "@/components/home/AboutSection";

export default function Home() {
  return (
    <>
      <Hero />
      <SpecializationPillars />
      <FeaturedWork />
      <AboutSection />
    </>
  );
}
