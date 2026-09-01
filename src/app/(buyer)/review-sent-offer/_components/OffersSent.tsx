import {
  ConsolidatedOfferData,
  OfferComparisonRow,
  OfferSnapshot,
} from "@/app/(seller)/user/offers-received/[offer-id]/_components/offers-received";
import { OFFER_STATUS } from "@/app/(seller)/user/offers-received/[offer-id]/_components/offers-received/utils.offer-received";
import { OffersSentHeader } from "./OffersSentHeader";
import { ConsolidatedSentOfferCard } from "./ConsolidatedSentOfferCard";
import { IPropertyResponse, IUser } from "@/types";
import OfferPropertyCard from "@/components/shared/card/offer-property-card";
import { OffersSentActionBar } from "./OffersSentActionBar";

interface OffersReceivedProps {
  offerId: string;
  property: IPropertyResponse;
  seller: IUser;
  propertyId: string;
  propertyLabel: string;
  offersSubmittedCount: number;
  yourOffer: OfferSnapshot;
  counterOffer?: OfferSnapshot & { badgeNumber?: number };
  yourOfferTitle?: string;
  counterOfferTitle?: string;
  offer: ConsolidatedOfferData;
  lastActionBy?: "buyer" | "seller";
  status: (typeof OFFER_STATUS)[keyof typeof OFFER_STATUS];
  onViewHistory?: () => void;
  onEditOfferDetails?: () => void;
  onAcceptOffer?: () => void;
  onCounterOffer?: () => void;
  onMessageBuyer?: () => void;
  onReject?: () => void;
  isSubmitting?: boolean;
}

export function OffersSent({
  offerId,
  property,
  seller,
  propertyId,
  propertyLabel,
  offersSubmittedCount,
  yourOffer,
  counterOffer,
  yourOfferTitle,
  counterOfferTitle,
  offer,
  lastActionBy,
  status,
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
      <OfferPropertyCard property={property} className="mb-2" />
      <OffersSentHeader
        offerId={offerId}
        propertyId={propertyId}
        propertyLabel={propertyLabel}
        offersSubmittedCount={offersSubmittedCount}
        onViewHistory={onViewHistory}
      />

      <OfferComparisonRow
        yourOffer={yourOffer}
        counterOffer={counterOffer}
        yourOfferTitle={yourOfferTitle}
        counterOfferTitle={counterOfferTitle}
      />

      <ConsolidatedSentOfferCard
        seller={seller}
        data={offer}
        onEditOfferDetails={onEditOfferDetails}
      />

      <OffersSentActionBar
        offerId={offerId}
        className="mt-6"
        onAcceptOffer={onAcceptOffer}
        onCounterOffer={onCounterOffer}
        onMessageBuyer={onMessageBuyer}
        onReject={onReject}
        isSubmitting={isSubmitting}
        lastActionBy={lastActionBy}
        status={status}
      />
    </div>
  );
}
