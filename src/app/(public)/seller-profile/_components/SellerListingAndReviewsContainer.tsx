"use client";
import Container from "@/components/shared/container/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellerListing from "./SellerListing";
import SellerReview from "./SellerReview";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetSellerPropertiesQuery } from "@/redux/api/propertiesApi";
import { useGetSellerReviewsQuery } from "@/redux/api/reviewsApi";

const INITIAL_REVIEW_LIMIT = 6;
const REVIEW_LIMIT_STEP = 5;


export default function SellerListingAndReviewsContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sellerId = searchParams.get("seller");
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "6";
  const reviewLimit =
    Number(searchParams.get("reviewLimit")) || INITIAL_REVIEW_LIMIT;

  const queries: Record<string, string | number> = { page, limit };

  const { data: sellerListingData, isLoading: sellerListingLoading } =
    useGetSellerPropertiesQuery(
      { id: sellerId, ...queries },
      { skip: !sellerId },
    );

  const {
    data: sellerReviewData,
    isLoading: sellerReviewLoading,
    isFetching: sellerReviewFetching,
  } = useGetSellerReviewsQuery(
    { id: sellerId, limit: reviewLimit },
    { skip: !sellerId },
  );

  // Bumps reviewLimit only — every other existing query param (seller, page, limit) stays untouched
  const handleSeeMoreReviews = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("reviewLimit", String(reviewLimit + REVIEW_LIMIT_STEP));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Container>
      <Tabs defaultValue="listings" className="w-full mt-5">
        <TabsList className="bg-transparent.0">
          <TabsTrigger
            value="listings"
            className="data-active:bg-transparent data-active:text-primary-color border-l-0 border-r-0 border-t-0 data-active:border-b-2 data-active:border-primary-color rounded-none cursor-pointer px-4 py-2.5 mr-1"
          >
            Listings ({sellerListingData?.meta?.total || 0})
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-active:bg-transparent data-active:text-primary-color border-l-0 border-r-0 border-t-0 data-active:border-b-2 data-active:border-primary-color rounded-none cursor-pointer px-4 py-2.5 mr-1"
          >
            Reviews ({sellerReviewData?.data?.summary?.totalReviews || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="w-full">
          <SellerListing
            listingData={sellerListingData}
            isLoading={sellerListingLoading}
            page={Number(page)}
            limit={Number(limit)}
          />
        </TabsContent>

        <TabsContent value="reviews">
          <SellerReview
            sellerReviewData={sellerReviewData?.data}
            isLoading={sellerReviewLoading}
            isFetching={sellerReviewFetching}
            onSeeMore={handleSeeMoreReviews}
          />
        </TabsContent>
      </Tabs>
    </Container>
  );
}