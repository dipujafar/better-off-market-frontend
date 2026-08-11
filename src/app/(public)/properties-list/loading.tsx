import Container from "@/components/shared/container/Container";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import FilterOptions from "@/components/shared/utils/FilterOptions";
import PropertyCardSkeleton from "@/components/skeleton/PropertyCardSkeleton";

export default function loading() {
  const bannerData = {
    title: "Browse properties",
    description:
      "Browse verified listings — no agents, no middlemen. Professional real estate investment, simplified for the modern investor.",
    className: "min-h-[50vh]",
  };
  return (
    <div className="space-y-16">
      <HeroBanner data={bannerData} />
      <Container className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
        <div>
          <FilterOptions />
        </div>
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:gap-6 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
