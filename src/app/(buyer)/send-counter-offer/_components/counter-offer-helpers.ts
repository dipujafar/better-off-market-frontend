import type { OfferFormValues } from "@/lib/validations/offer-form";

export function formatCurrency(amount: number | undefined) {
  if (amount === undefined || Number.isNaN(amount)) return "—";
  return amount?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });
}

export function formatDays(days: number | undefined, requiredLabel: "yes" | "no") {
  if (requiredLabel === "no") return "Waived";
  return days ? `Yes, ${days} days` : "Yes";
}

export function formatOrDash(value: string | number | undefined) {
  if (value === undefined || value === "") return "—";
  return String(value);
}

/** True if any of `fields` differs between `current` and `original`. */
export function fieldsChanged<T extends Record<string, unknown>>(
  current: T,
  original: T,
  fields: (keyof T)[]
) {
  return fields.some((key) => {
    const a = current[key];
    const b = original[key];
    // Arrays / objects (e.g. none expected here, but keeps this safe to reuse)
    if (typeof a === "object" || typeof b === "object") {
      return JSON.stringify(a) !== JSON.stringify(b);
    }
    return (a ?? "") !== (b ?? "");
  });
}

/** Shallow-picks a subset of fields into a new object — used for edit-start snapshots. */
export function pickFields<T extends Record<string, unknown>>(
  source: T,
  fields: (keyof T)[]
): Partial<T> {
  const result: Partial<T> = {};
  fields.forEach((key) => {
    result[key] = source[key];
  });
  return result;
}

export const SECTION_FIELDS = {
  offerDetails: ["offerAmount", "earnestMoney", "financingType", "financingTerms"],
  sellerConcessions: ["closingCostOption", "sellerContribution"],
  contingencies: [
    "inspectionContingency",
    "inspectionDays",
    "appraisalContingency",
    // "appraisalDays",
  ],
  agent: ["hasAgent", "agentName", "brokerageName", "commission", "paidBy"],
  personalProperty: [
    "personalPropertyIncluded",
    "itemsToBeRemoved",
  ],
  closingTerms: ["titleCompany", "closingDate", "possession", "sellerPostClosingDays"],
  notes: ["notesToBuyer", "notesToSeller"],
} as const satisfies Record<string, (keyof OfferFormValues)[]>;

export type SectionKey = keyof typeof SECTION_FIELDS;
