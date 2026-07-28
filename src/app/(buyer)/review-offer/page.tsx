import Navbar from "@/components/shared/navbar/Navbar";
import { OfferSummary } from "./_components/OfferSummary";
import OfferPropertyCard from "@/components/shared/card/offer-property-card";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";

export default function OfferReviewPage() {
  return (
    <>
      <Navbar className="pt-10" />
      <Container className="md:mt-8 mt-6">
        <SectionTitle data={{ title: "Review Your Offer", description: "Please review the details of your offer carefully before submitting. This action cannot be undone easily.", isBtn: false }} />
        <OfferPropertyCard className="mt-5"  />
        <OfferSummary
          data={{
            offerAmount: 48500,
            earnestMoney: 1500,
            financingType: "Cash",
            closingCosts: "Buyer does NOT request seller contribution",
            sellerContribution: 48500,
            inspection: { required: true, days: 7 },
            appraisal: { required: true, days: 7 },
            agent: { name: "Sarah Jenkins", commission: "3%" },
            personalProperty: {
              included: ["Refrigerator", "Washer/Dryer"],
              itemsToRemove:
                "Trash in backyard to be cleared by seller prior to closing.",
            },
            closingTerms: {
              titleCompany: "Title First Co.",
              closingDate: "July 30, 2026",
              possession: "At closing",
            },
            documents: [
              { name: "Proof_of_Funds.pdf", url: "/files/proof-of-funds.pdf" },
            ],
            notesToSeller:
              "Dear Seller, we love the character of this home and are excited to potentially make it our next investment project. We have the funds ready and are looking for a smooth, fast closing process. Thank you for your consideration!",
          }}
        />
      </Container>
    </>
  );
}
