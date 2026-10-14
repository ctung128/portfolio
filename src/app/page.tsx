import { CardHero } from "@/components/home/CardHero";
import { FeaturedWork } from "@/components/home/FeaturedWork";

export default function Home() {
  return <CardHero work={<FeaturedWork />} />;
}
