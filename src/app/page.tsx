import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HeroScene } from "@/components/home/HeroScene";

export default function Home() {
  return <HeroScene hero={<Hero />} work={<FeaturedWork />} />;
}
