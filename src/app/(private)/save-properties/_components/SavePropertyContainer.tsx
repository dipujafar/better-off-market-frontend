import { PropertyCard } from "@/components/shared/card/property-card";
import { properties } from "@/data/properties";

export default function SavePropertyContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:gap-6 gap-4">
      {properties.slice(0, 3).map((property, index) => (
        <PropertyCard key={index} {...property} savedProperty={true} />
      ))}
    </div>
  );
}
