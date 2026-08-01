import { OffersReceivedHeader } from "./OffersReceivedHeader";
import { OfferComparisonRow, type OfferSnapshot } from "./OfferComparisonRow";
import { ConsolidatedOfferCard } from "./ConsolidatedOfferCard";
import { OffersReceivedActionBar } from "./OffersReceivedActionBar";
import { ConsolidatedOfferData } from "./utils.offer-received";


interface OffersReceivedProps {
  buyerName: string;
  propertyLabel: string;
  offersSubmittedCount: number;
  yourOffer: OfferSnapshot;
  counterOffer?: OfferSnapshot & { badgeNumber?: number };
  offer: ConsolidatedOfferData;
  onViewHistory?: () => void;
  onEditOfferDetails?: () => void;
  onAcceptOffer?: () => void;
  onCounterOffer?: () => void;
  onMessageBuyer?: () => void;
  onReject?: () => void;
  isSubmitting?: boolean;
}

export function OffersReceived({
  buyerName,
  propertyLabel,
  offersSubmittedCount,
  yourOffer,
  counterOffer,
  offer,
  onViewHistory,
  onEditOfferDetails,
  onAcceptOffer,
  onCounterOffer,
  onMessageBuyer,
  onReject,
  isSubmitting,
}: OffersReceivedProps) {
  return (
    <div>
      <OffersReceivedHeader
        buyerName={buyerName}
        propertyLabel={propertyLabel}
        offersSubmittedCount={offersSubmittedCount}
        onViewHistory={onViewHistory}
      />

      <OfferComparisonRow yourOffer={yourOffer} counterOffer={counterOffer} />


      <ConsolidatedOfferCard
        name={buyerName}
        data={offer}
        onEditOfferDetails={onEditOfferDetails}
      />

      <OffersReceivedActionBar
        className="mt-6"
        onAcceptOffer={onAcceptOffer}
        onCounterOffer={onCounterOffer}
        onMessageBuyer={onMessageBuyer}
        onReject={onReject}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
