import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { TracedClouds } from "@/components/lab/TracedClouds";

export const metadata: Metadata = {
  title: "Hero to work lab",
  robots: { index: false, follow: false },
};

/** Mockup of the homepage hero → Selected work cloud transition. */
export default function LabPage() {
  return <TracedClouds hero={<Hero />} work={<FeaturedWork />} />;
}
