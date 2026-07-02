import CategorySection from "@/components/modules/home/CategorySection";
import NewlyAddedSection from "@/components/modules/home/NewlyAddedSection";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroBanner />
      <NewlyAddedSection />
      <CategorySection />
    </div>
  );
}
