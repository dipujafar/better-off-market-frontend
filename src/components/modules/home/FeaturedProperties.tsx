"use client";
import PreviewPropertyCarousel from "@/components/shared/carousels/properties-carousels";
import PropertyCardSkeleton from "@/components/skeleton/PropertyCardSkeleton";
import Empty from "@/components/ui/empty-data";
import { useGetPropertiesQuery } from "@/redux/api/propertiesApi";

export default function FeaturedProperties() {
  const queries: Record<string, string | number> = {};
  const { data: properties, isLoading } = useGetPropertiesQuery(queries);

  console.log(properties);

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:gap-6 gap-4">
        {Array.from({ length: 3}).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    );

  if (!properties?.meta?.total) {
    return (
      <Empty
        message="No properties found"
        className="mt-5"
      />
    );
  }

  return (
    <div>
      <PreviewPropertyCarousel
        propertiesData={properties?.data}
      />
    </div>
  );
}
