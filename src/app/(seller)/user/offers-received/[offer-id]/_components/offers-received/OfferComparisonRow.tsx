import { OfferComparisonCard } from "./OfferComparisonCard";

export interface OfferSnapshot {
  amount: number;
  closingDate: string;
}

interface OfferComparisonRowProps {
  yourOffer: OfferSnapshot;
  counterOffer?: OfferSnapshot & { badgeNumber?: number };
}

export function OfferComparisonRow({ yourOffer, counterOffer }: OfferComparisonRowProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-3/4">
      <OfferComparisonCard title="Your offer" amount={yourOffer.amount} closingDate={yourOffer.closingDate} />

      {counterOffer ? (
        <OfferComparisonCard
          title="Counter offer"
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
