import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HeroMotionLab } from "@/components/lab/HeroMotionLab";

export const metadata: Metadata = {
  title: "Hero motion lab",
  robots: { index: false, follow: false },
};

/** Mockup: three on-load + on-scroll directions for the homepage hero. Temporary. */
export default function HeroMotionLabPage() {
  return <HeroMotionLab hero={<Hero />} work={<FeaturedWork />} />;
}
