import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import FeaturedProperties from "./FeaturedProperties";

export default function NewlyAddedSection() {
  const sectionTitleData = {
    title: "Newly Added",
    description: "The latest arrivals to the marketplace.",
    isBtn: true,
    btnLink: "/properties-list",
  };
  return (
    <Container className="lg:space-y-8 space-y-6">
      <SectionTitle data={sectionTitleData} />
      <FeaturedProperties />
    </Container>
  );
}
