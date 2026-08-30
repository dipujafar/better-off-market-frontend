import Navbar from "@/components/shared/navbar/Navbar";
import ReviewSentOfferContainer from "./_components/ReviewSentOfferContainer";
import Container from "@/components/shared/container/Container";

export const metadata = {
  title: "Review Sent Offer",
  description: "All sent offers on Better Off Market.",
};

export default function ReviewSentOffer() {
  return (
    <>
      <Navbar className="pt-10" />
      <Container className="lg:mt-10 mt-8">
        <ReviewSentOfferContainer />
      </Container>
    </>
  );
}
