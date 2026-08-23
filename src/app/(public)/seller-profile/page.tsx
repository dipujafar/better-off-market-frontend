import Navbar from "@/components/shared/navbar/Navbar";
import { SellerProfileCard } from "./_components/SellerProfileCard";
import Container from "@/components/shared/container/Container";
import SellerListingAndReviewsContainer from "./_components/SellerListingAndReviewsContainer";

export const metadata = {
  title: "Seller Profile",
  description: "This the official website of Better Off Market",
};

export default function SellerProfile() {
  return (
    <div className="space-y-8">
      <Navbar className="pt-10" />
      <Container>
        <SellerProfileCard />
      </Container>
      <SellerListingAndReviewsContainer />
    </div>
  );
}
