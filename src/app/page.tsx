import CategorySection from "@/components/modules/home/CategorySection";
import FAQSection from "@/components/modules/home/faqs/FaqsSection";
import { GetInTouch } from "@/components/modules/home/get_in_touch/GetInTouch";
import NewlyAddedSection from "@/components/modules/home/NewlyAddedSection";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroBanner />
      <NewlyAddedSection />
      <CategorySection />
      <GetInTouch />
      <FAQSection />
    </div>
  );
}
