import OfferedCard from "@/components/shared/card/offered-card";
import PaginationSection from "@/components/shared/pagination/PaginationSection";
import OfferedCardSkeleton from "@/components/skeleton/OfferedCardSkeleton";
import Empty from "@/components/ui/empty-data";
import { IOffer } from "@/types";
import { IApiResponse } from "@/types/api-response";

export default function OfferList({
  data,
  limit,
  page,
  loading,
}: {
  data: IApiResponse<IOffer[]>;
  limit: number;
  page: number;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: limit }).map((_, index) => (
          <OfferedCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data?.meta?.total)
    return <Empty message="No offers found" className="mt-16" />;

  const OffersData = data?.data || [];

  return (
    <>
      <div className="w-full   space-y-4 md:mt-0 mt-10">
        {OffersData?.map((offer) => (
          <OfferedCard key={offer?._id} data={offer} />
        ))}
      </div>
      <PaginationSection
        total={data?.meta?.total}
        current={page}
        pageSize={limit}
      />
    </>
  );
}
