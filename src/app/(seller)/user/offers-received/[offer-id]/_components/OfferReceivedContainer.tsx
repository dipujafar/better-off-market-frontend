"use client";
import {
  useGetMyReceivedOffersQuery,
  useGetSingleOfferQuery,
} from "@/redux/api/offerApi";
import { OffersReceived } from "./offers-received";
import { useParams } from "next/navigation";

export default function OfferReceivedContainer() {
  const offerId = useParams();
  const { data } = useGetSingleOfferQuery(offerId["offer-id"]);
  console.log(data);
  return (
    <OffersReceived
      buyerName="James B."
      propertyLabel="Memphis house"
      offersSubmittedCount={3}
      yourOffer={{ amount: 298000, closingDate: "July 01, 2026" }}
      counterOffer={{
        amount: 305000,
        closingDate: "July 15, 2026",
        badgeNumber: 1,
      }}
      offer={{
        offerAmount: 48500,
        earnestMoney: 1500,
        financingType: "Cash",
        closingCosts: "Buyer does NOT request seller contribution",
        commission: "3%",
        personalProperty: {
          included: ["Refrigerator", "Washer/Dryer"],
          itemsToRemove:
            "Trash in backyard to be cleared by seller prior to closing.",
        },
        inspection: { required: true, days: 7 },
        appraisal: { required: true, days: 7 },
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
      onViewHistory={() => console.log("view history")}
      onEditOfferDetails={() => console.log("edit offer details")}
      onAcceptOffer={() => console.log("accept")}
      onCounterOffer={() => console.log("counter")}
      onMessageBuyer={() => console.log("message")}
      onReject={() => console.log("reject")}
    />
  );
}
