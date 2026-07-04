import { PropertyCard } from '@/components/shared/card/property-card';
import Container from '@/components/shared/container/Container';
import SectionTitle from '@/components/shared/titles/SectionTitle';
import { properties } from '@/data/properties';

export default function PriceDropsSection() {
  const sectionTitleData = {
    title: "Price Drops",
    description: "The most sought-after listings moving fast in today's market.",
    isBtn: true,
  };
  return (
    <Container className="lg:space-y-8 space-y-6">
      <SectionTitle data={sectionTitleData} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {properties.slice(3, 6).map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
    </Container>
  );
}
