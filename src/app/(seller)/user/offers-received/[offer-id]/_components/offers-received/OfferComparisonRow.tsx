import { OfferComparisonCard } from "./OfferComparisonCard";

export interface OfferSnapshot {
  amount: number;
  closingDate: string;
}

interface OfferComparisonRowProps {
  yourOffer: OfferSnapshot;
  counterOffer?: OfferSnapshot & { badgeNumber?: number };
  yourOfferTitle?: string;
  counterOfferTitle?: string;
}

export function OfferComparisonRow({
  yourOffer,
  counterOffer,
  yourOfferTitle = "Your offer",
  counterOfferTitle = "Counter offer",
}: OfferComparisonRowProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-3/4">
      <OfferComparisonCard
        title={yourOfferTitle}
        amount={yourOffer.amount}
        closingDate={yourOffer.closingDate}
      />

      {counterOffer ? (
        <OfferComparisonCard
          title={counterOfferTitle}
          amount={counterOffer.amount}
          previousAmount={yourOffer.amount}
          closingDate={counterOffer.closingDate}
          previousClosingDate={yourOffer.closingDate}
          closingLabel="Proposed closing:"
          badgeNumber={counterOffer.badgeNumber}
          highlighted
        />
      ) : null}
    </div>
  );
}