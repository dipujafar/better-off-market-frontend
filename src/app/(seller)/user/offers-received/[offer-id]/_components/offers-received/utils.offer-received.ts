export interface ConsolidatedOfferDocument {
  name: string;
  url: string;
}

export interface ConsolidatedOfferData {
  offerAmount: number;
  earnestMoney: number;
  financingType: string;
  closingCosts: string;
  commission?: string;

  personalProperty: {
    included: string[];
    itemsToRemove?: string;
  };

  inspection: { required: boolean; days?: number };
  appraisal: { required: boolean; days?: number };

  closingTerms: {
    titleCompany: string;
    closingDate: string;
    possession: string;
  };

  documents?: ConsolidatedOfferDocument[];
  notesToSeller?: string;
}

export function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });
}

export function contingencyValue(item: { required: boolean; days?: number }) {
  if (!item.required) return "Waived";
  return item.days ? `Yes, ${item.days} days` : "Yes";
}
