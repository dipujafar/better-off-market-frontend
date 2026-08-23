import { PropertyCard } from "@/components/shared/card/property-card";
import PaginationSection from "@/components/shared/pagination/PaginationSection";
import PropertyCardSkeleton from "@/components/skeleton/PropertyCardSkeleton";
import Empty from "@/components/ui/empty-data";
import { IPropertyResponse } from "@/types";
import { IApiResponse } from "@/types/api-response";

interface IProps {
  listingData: IApiResponse<IPropertyResponse[]>;
  isLoading: boolean;
  page: number;
  limit: number;
}

export default function SellerListing({
  listingData,
  isLoading,
  page,
  limit,
}: IProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:gap-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!listingData?.meta?.total) {
    return <Empty message="No properties listed " className="mt-16" />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:gap-6 gap-4">
        {listingData?.data?.map((property, index) => (
          <PropertyCard
            key={index}
            {...property}
            isPropertyStatusVisible={true}
          />
        ))}
      </div>
      <PaginationSection
        total={listingData?.meta?.total}
        current={page}
        pageSize={limit}
      />
    </>
  );
}
