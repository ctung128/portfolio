import type { Metadata } from "next";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HeroLab } from "@/components/lab/hero/HeroLab";

export const metadata: Metadata = {
  title: "Hero lab",
  robots: { index: false, follow: false },
};

export default function HeroLabPage() {
  return <HeroLab work={<FeaturedWork />} />;
}
