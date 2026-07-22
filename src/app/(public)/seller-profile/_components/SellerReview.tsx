import { SellerRating } from "./SellerRating";
import { SellerReviewList } from "./SellerReviewList";

export default function SellerReview() {
  return (
    <div className="space-y-6">
      <SellerRating />
      <SellerReviewList />
    </div>
  );
}
