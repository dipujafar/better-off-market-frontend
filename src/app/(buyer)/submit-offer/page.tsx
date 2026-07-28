import Navbar from "@/components/shared/navbar/Navbar";
import OfferFormContainer from "./_components/OfferFormContainer";
import Container from "@/components/shared/container/Container";

export const metadata = {
  title: "Submit Offer",
  description: "This the official website of Better Off Market",
};

export default function SubmitOfferPage() {
  return (
    <div>
      <Navbar className="pt-10" />
      <OfferFormContainer />
    </div>
  );
}
