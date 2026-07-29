import { PropertyCard } from "@/components/shared/card/property-card";
import PreviewPropertyCarousel from "@/components/shared/carousels/properties-carousels";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import { properties } from "@/data/properties";

export default function NewlyAddedSection() {

  const sectionTitleData = {
    title: "Newly Added",
    description: "The latest arrivals to the marketplace.",
    isBtn: true,
    btnLink:"/properties-list"
  };
  return (
    <Container className="lg:space-y-8 space-y-6">
      <SectionTitle data={sectionTitleData} />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:gap-6 gap-4">
        {properties.slice(0, 3).map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div> */}
      <PreviewPropertyCarousel propertiesData={properties?.slice(0, 6)} />
    </Container>
  );
}
