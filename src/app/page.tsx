import CategorySection from "@/components/modules/home/CategorySection";
import FAQSection from "@/components/modules/home/faqs/FaqsSection";
import { GetInTouch } from "@/components/modules/home/get_in_touch/GetInTouch";
import NewlyAddedSection from "@/components/modules/home/NewlyAddedSection";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";

export default function Home() {
  const bannerData = {
    title: "Find your next investment property",
    description: "Browse verified listings — no agents, no middlemen. Professional real estate investment, simplified for the modern investor.",
  }
  return (
    <div className="space-y-16">
      <HeroBanner data={bannerData} />
      <NewlyAddedSection />
      <CategorySection />
      <GetInTouch />
      <FAQSection />
    </div>
  );
}
