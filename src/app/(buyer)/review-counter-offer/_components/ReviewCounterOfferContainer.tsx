"use client";
import { CounterOfferSummary } from "./CounterOfferSummary";
import Container from "@/components/shared/container/Container";

export default function ReviewCounterOfferContainer() {
  return (
    <Container>
      <CounterOfferSummary
        data={{
          offerAmount: 48500,
          earnestMoney: 1500,
          financingType: "Cash",
          closingCosts: "Buyer does NOT request seller contribution",
          sellerContribution: 2500,
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
        banner={{
          title: "Counter Offer Received",
          sellerName: "Seller James R.",
          changedSectionCount: 1,
          propertyAddress: "1245 Willow Lane",
          onViewHistory: () => console.log("view history"),
        }}
        change={{
          section: "sellerConcessions",
          changedBy: "Seller",
          modifiedAt: "Oct 24, 2:20 PM",
          description:
            "The seller has requested a change to the closing costs contribution. This replaces your previous offer term.",
          field: {
            label: "Seller contribution",
            oldValue: "$0",
            newValue: "$2,500",
          },
        }}
        actions={{
          onAcceptCounter: () => console.log("accept"),
          onCounterOffer: () => console.log("counter"),
          onMessageBuyer: () => console.log("message"),
          onReject: () => console.log("reject"),
        }}
      />
    </Container>
  );
}
