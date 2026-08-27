import OfferedCard from "@/components/shared/card/offered-card";
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
      <div className="mt-5">
        <OfferedCardSkeleton />
      </div>
    );
  }


  if (!data?.meta?.total)
    return <Empty message="No offers found" className="mt-16" />;

  const OffersData = data?.data || [];

  console.log(OffersData)

  return (
    <div className="w-full   space-y-4 md:mt-0 mt-10">
      {OffersData?.map((offer) => (
        <OfferedCard key={offer?._id} data={offer} />
      ))}
    </div>
  );
}
