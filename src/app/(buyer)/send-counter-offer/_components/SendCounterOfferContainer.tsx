// import OfferPropertyCard from "@/components/shared/card/offer-property-card";
// import Container from "@/components/shared/container/Container";
// import { OfferFormValues } from "@/lib/validations/offer-form";
// import { CounterOfferEditor } from "./CounterOfferEditor";

// const originalOffer: OfferFormValues = {
//   offerAmount: 48500,
//   earnestMoney: 1500,
//   financingType: "cash",
//   financingTerms: "",
//   closingCostOption: "none",
//   sellerContribution: 0,
//   inspectionContingency: "yes",
//   inspectionDays: 7,
//   appraisalContingency: "yes",
//   appraisalDays: 7,
//   hasAgent: "yes",
//   agentName: "Sarah Jenkins",
//   brokerageName: "Willow Realty",
//   commission: "3%",
//   paidBy: "seller",
//   personalPropertyIncluded: "Refrigerator, Washer/Dryer",
//   itemsToBeRemoved:
//     "Trash in backyard to be cleared by seller prior to closing.",
//   titleCompany: "Title First Co.",
//   closingDate: "2026-07-30",
//   possession: "at_closing",
//   sellerPostClosingDays: 0,
//   additionalTerms: "",
//   notesToSeller: "",
// };

// export default function SendCounterOfferContainer() {
//   return (
//     <Container className="mt-10">
//       <OfferPropertyCard />
//       <CounterOfferEditor
//         originalValues={originalOffer}
//         initialValues={{ sellerContribution: 2500 }}
//         documents={[
//           { name: "Proof_of_Funds.pdf", url: "/files/proof-of-funds.pdf" },
//         ]}
//         notesToBuyer="Dear Seller, we love the character of this home and are excited to potentially make it our next investment project. We have the funds ready and are looking for a smooth, fast closing process. Thank you for your consideration!"
//         onSubmit={(values, changedFields) => {
//           // `changedFields` is exactly the diff against originalOffer —
//           // this is the "find the edited data in a function" piece.
//           console.log("full values", values);
//           console.log("changed fields", changedFields);
//         }}
//         onCancel={() => window.history.back()}
//       />
//     </Container>
//   );
// }
