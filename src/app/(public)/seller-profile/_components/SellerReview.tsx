"use client";
import { useEffect, useState } from "react";
import { ISellerReviewData } from "@/types";
import { SellerRating } from "./SellerRating";
import { SellerReviewList } from "./SellerReviewList";

interface ISellerReviewProps {
  sellerReviewData?: ISellerReviewData;
  isLoading: boolean;
  isFetching: boolean;
  onSeeMore: () => void;
}

export default function SellerReview({
  sellerReviewData,
  isLoading,
  isFetching,
  onSeeMore,
}: ISellerReviewProps) {
  const [displayedReviews, setDisplayedReviews] = useState(
    sellerReviewData?.data ?? [],
  );

  // Only overwrite once new data actually arrives — keeps old reviews on screen
  // while the "limit+5" request is in flight, instead of flashing a skeleton.
  useEffect(() => {
    if (sellerReviewData?.data) {
      setDisplayedReviews(sellerReviewData.data);
    }
  }, [sellerReviewData?.data]);

  // Full skeleton only on the very first load — never again after that
  if (isLoading && displayedReviews.length === 0) {
    return (
      <div className="space-y-6">
        <div className="h-40 rounded-md bg-gray-100 animate-pulse" />
        <div className="h-32 rounded-md bg-gray-100 animate-pulse" />
        <div className="h-32 rounded-md bg-gray-100 animate-pulse" />
      </div>
    );
  }

  const summary = sellerReviewData?.summary;
  const total = summary?.totalReviews ?? 0;
  const hasMore = total > displayedReviews.length;

  return (
    <div className="space-y-6">
      <SellerRating
        averageRating={summary?.avgRating}
        totalReviews={summary?.totalReviews}
        breakdown={summary?.ratingBreakdown}
      />
      <SellerReviewList
        reviews={displayedReviews}
        hasMore={hasMore}
        isFetchingMore={isFetching}
        onSeeMore={onSeeMore}
      />
    </div>
  );
}