// import { RefreshCw } from "lucide-react";
// import { useFormContext, useWatch } from "react-hook-form";
// import { EditableCurrencyField } from "../ui/EditableCurrencyField";
// import { ComparisonBox } from "../ui/ComparisonBox";
// import { CLOSING_COST_OPTIONS, type OfferFormValues } from "@/lib/validations/offer-form";
// import { EditableCard } from "./EditableCard";
// import { SummaryField } from "../../review-offer/_components/SummaryField";
// import { formatCurrency } from "./CounterOfferUtiles";

// interface SellerConcessionsEditableProps {
//   originalValues: OfferFormValues;
//   isEditing: boolean;
//   isChanged: boolean;
//   onEdit: () => void;
//   onCancel: () => void;
//   /** Shown under the title while the section is in its highlighted "changed" state. */
//   description?: string;
// }

// export function SellerConcessionsEditable({
//   originalValues,
//   isEditing,
//   isChanged,
//   onEdit,
//   onCancel,
//   description = "Contribution towards buyer's closing costs and prepaid items.",
// }: SellerConcessionsEditableProps) {
//   const { control } = useFormContext<OfferFormValues>();
//   const values = useWatch({ control });
//   const closingCostLabel =
//     CLOSING_COST_OPTIONS.find((o) => o.value === values.closingCostOption)?.label ?? "—";
//   const originalClosingCostLabel =
//     CLOSING_COST_OPTIONS.find((o) => o.value === originalValues.closingCostOption)?.label ?? "—";

//   return (
//     <EditableCard
//       title="Seller Concessions"
//       icon={<RefreshCw size={18} />}
//       isEditing={isEditing}
//       isChanged={isChanged}
//       onEdit={onEdit}
//       onCancel={onCancel}
//       viewContent={
//         <div className="grid grid-cols-2 gap-x-6 gap-y-4">
//           <SummaryField label="Closing costs" value={closingCostLabel} />
//           <SummaryField
//             label="Seller contribution ($)"
//             value={formatCurrency(values.sellerContribution)}
//           />
//         </div>
//       }
//       changedContent={
//         <div>
//           <p className="mb-4 text-sm text-muted-foreground">{description}</p>
//           <ComparisonBox
//             currentValue={formatCurrency(values.sellerContribution)}
//             originalValue={formatCurrency(originalValues.sellerContribution)}
//           />
//         </div>
//       }
//       editContent={
//         <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//           <EditableSelectField
//             control={control}
//             name="closingCostOption"
//             label="Closing costs"
//             options={CLOSING_COST_OPTIONS}
//             originalValue={originalClosingCostLabel}
//           />
//           <EditableCurrencyField
//             control={control}
//             name="sellerContribution"
//             label="Seller contribution ($)"
//             originalValue={formatCurrency(originalValues.sellerContribution)}
//           />
//         </div>
//       }
//     />
//   );
// }