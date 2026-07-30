import Navbar from "@/components/shared/navbar/Navbar";
import OfferNegotiationStoryContainer from "./_components/OfferNegotiationStoryContainer";
import Container from "@/components/shared/container/Container";

export const metadata = {
  title: "Offer Negotiation Story",
  description: "This the official website of Better Off Market",
};

export default function OfferNegotiationStoryPage() {
  return (
    <div>
      <Navbar className="pt-10" />
      <Container className="mt-10">
        <OfferNegotiationStoryContainer />
      </Container>
    </div>
  );
}
