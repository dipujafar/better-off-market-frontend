import Navbar from "@/components/shared/navbar/Navbar";
import ReviewCounterOfferContainer from "./_components/ReviewCounterOfferContainer";

export const metadata = {
    title: "Review Counter Offer",
    description: "This the official website of Better Off Market",
};

export default function ReviewCounterOfferPage() {
  return (
    <>
      <Navbar className="pt-10" />
      <ReviewCounterOfferContainer />
    </>
  );
}
