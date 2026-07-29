// import { FileText } from "lucide-react";
// import { useFormContext, useWatch } from "react-hook-form";
// import { EditableCard } from "./EditableCard";
// import { EditableSelectField } from "./EditableSelectField";
// import { EditableTextareaField } from "../ui/EditableTextareaField";
// import { SummaryField } from "@/components/offer-summary/SummaryField";
// import { FINANCING_TYPES, type OfferFormValues } from "@/lib/validations/offer-form";
// import { formatCurrency, formatOrDash } from "@/lib/counter-offer-helpers";

// interface OfferDetailsEditableProps {
//   originalValues: OfferFormValues;
//   isEditing: boolean;
//   isChanged: boolean;
//   onEdit: () => void;
//   onCancel: () => void;
// }

// export function OfferDetailsEditable({
//   originalValues,
//   isEditing,
//   isChanged,
//   onEdit,
//   onCancel,
// }: OfferDetailsEditableProps) {
//   const { control } = useFormContext<OfferFormValues>();
//   const values = useWatch({ control });
//   const financingLabel =
//     FINANCING_TYPES.find((o) => o.value === values.financingType)?.label ?? "—";

//   return (
//     <EditableCard
//       title="Offer Details"
//       icon={<FileText size={18} />}
//       isEditing={isEditing}
//       isChanged={isChanged}
//       onEdit={onEdit}
//       onCancel={onCancel}
//       viewContent={
//         <div className="grid grid-cols-2 gap-x-6 gap-y-4">
//           <SummaryField label="Offer amount" value={formatCurrency(values.offerAmount)} />
//           <SummaryField label="Earnest money" value={formatCurrency(values.earnestMoney)} />
//           <SummaryField label="Financing type" value={financingLabel} />
//           <SummaryField
//             label="If not cash, terms"
//             value={formatOrDash(values.financingTerms)}
//           />
//         </div>
//       }
//       editContent={
//         <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
//           <EditableCurrencyField
//             control={control}
//             name="offerAmount"
//             label="Offer amount ($)"
//             originalValue={formatCurrency(originalValues.offerAmount)}
//           />
//           <EditableCurrencyField
//             control={control}
//             name="earnestMoney"
//             label="Earnest money ($)"
//             originalValue={formatCurrency(originalValues.earnestMoney)}
//           />
//           <EditableSelectField
//             control={control}
//             name="financingType"
//             label="Financing type"
//             options={FINANCING_TYPES}
//             originalValue={
//               FINANCING_TYPES.find((o) => o.value === originalValues.financingType)?.label ??
//               "—"
//             }
//           />
//           <EditableTextareaField
//             control={control}
//             name="financingTerms"
//             label="If not cash, explain terms"
//             placeholder="Describe financing terms..."
//             disabled={values.financingType === "cash"}
//             originalValue={formatOrDash(originalValues.financingTerms)}
//           />
//         </div>
//       }
//     />
//   );
// }