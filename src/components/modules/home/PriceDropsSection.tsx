import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import PriceDroppedProperties from "./PriceDroppedProperties";

export default function PriceDropsSection() {
  const sectionTitleData = {
    title: "Price Drops",
    description:
      "The most sought-after listings moving fast in today's market.",
    isBtn: true,
    btnLink: "/properties-list",
  };
  return (
    <Container className="lg:space-y-8 space-y-6">
      <SectionTitle data={sectionTitleData} />
      <PriceDroppedProperties />
    </Container>
  );
}
