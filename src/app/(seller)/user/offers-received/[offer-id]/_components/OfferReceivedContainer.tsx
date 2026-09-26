"use client";
import {
  useAcceptOfferMutation,
  useGetSingleOfferQuery,
  useRejectOfferMutation,
} from "@/redux/api/offerApi";
import { OffersReceived } from "./offers-received";
import { useParams } from "next/navigation";
import {
  formatDate,
  getRoundTitle,
  mapTermsToConsolidatedOfferData,
} from "./offers-received/utils.offer-received";
import Empty from "@/components/ui/empty-data";
import { useState } from "react";
import { AppDialog } from "@/components/shared/dialog/AppDialog";
import { errorModification } from "@/lib/errors/errorModification";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import OffersDetailsPageSkeleton from "@/components/skeleton/OffersDetailsPageSkeleton";

export default function OfferReceivedContainer() {
  const params = useParams();
  const offerId = params["offer-id"] as string;
  const router = useRouter();
  const [rejectOffer] = useRejectOfferMutation();
  const [acceptOffer] = useAcceptOfferMutation();
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const { data, isLoading } = useGetSingleOfferQuery(offerId, {
    skip: !offerId,
  });

  const offer = data?.data;

  if (isLoading) {
    return <OffersDetailsPageSkeleton />;
  }

  if (!offer) return <Empty message="Offer not found" className="mt-16" />;

  const {
    buyer,
    property,
    history,
    currentTerms,
    currentRound,
    lastActionBy,
    supportingDocuments,
  } = offer;

  const buyerName = buyer?.name;
  const propertyLabel = `${property.propertyType} — ${property.streetAddress},  ${property.city}, ${property.state}, ${property.zipCode}, ${property.county}`;
  const offersSubmittedCount = history.length;

  // The most recent round always mirrors currentTerms
  const currentSnapshot = {
    amount: currentTerms.offerAmount,
    closingDate: formatDate(currentTerms.closingDate),
  };

  // Only show a comparison ("previous vs current") once a second round exists
  const previousRound =
    history.length > 1 ? history[history.length - 2] : undefined;
  const previousSnapshot = previousRound
    ? {
        amount: previousRound.offerAmount,
        closingDate: formatDate(previousRound.closingDate),
      }
    : undefined;

  // Single-round case: show just the one card, labeled by who made it.
  // Multi-round case: left card = previous round, right (highlighted) card = current round.
  const yourOffer = previousSnapshot ?? currentSnapshot;
  const counterOffer = previousSnapshot
    ? { ...currentSnapshot, badgeNumber: currentRound }
    : undefined;

  const yourOfferTitle = getRoundTitle(previousRound?.madeBy);
  const counterOfferTitle = getRoundTitle(lastActionBy);

  const consolidatedOfferData = mapTermsToConsolidatedOfferData(
    currentTerms,
    supportingDocuments,
  );

  const handleAcceptOffer = async () => {
    toast.loading("Accepting offer...", { id: "accept" });
    try {
      await acceptOffer(offerId).unwrap();
      toast.success("Offer accepted successfully!", { id: "accept" });
      router.push(`/sign-agreement-contact?offerId=${offerId}&actionBy=seller`);
    } catch (error) {
      const errorMessage = errorModification(error);
      toast.error(errorMessage, { id: "accept" });
    }
  };

  const handleRejectOffer = async () => {
    setOpenRejectModal(false);
    toast.loading("Rejecting offer...", { id: "reject" });
    try {
      await rejectOffer(offerId).unwrap();
      toast.success("Offer rejected successfully!", { id: "reject" });
      router.push("/user/offers-received");
    } catch (error) {
      setOpenRejectModal(false);
      const errorMessage = errorModification(error);
      toast.error(errorMessage, { id: "reject" });
    }
  };

  return (
    <>
      <OffersReceived
        offerId={offerId}
        property={property}
        buyerName={buyerName}
        buyerId={buyer?._id}
        propertyId={property?._id}
        propertyLabel={propertyLabel}
        offersSubmittedCount={offersSubmittedCount}
        yourOffer={yourOffer}
        counterOffer={counterOffer}
        yourOfferTitle={yourOfferTitle}
        counterOfferTitle={counterOfferTitle}
        offer={consolidatedOfferData}
        lastActionBy={lastActionBy}
        status={offer.status}
        isSellerAddedAuthorizedSigner={offer?.isSellerAddedAuthorizedSigner}
        onAcceptOffer={() => setOpenAcceptModal(true)}
        onReject={() => setOpenRejectModal(true)}
      />
      <AppDialog
        open={openRejectModal}
        onOpenChange={setOpenRejectModal}
        title="Reject offer"
        description="Are you sure you want to reject this offer?"
        actions={[
          {
            label: "Cancel",
            variant: "outline",
            onClick: () => setOpenRejectModal(false),
          },
          {
            label: "Confirm",
            onClick: () => handleRejectOffer(),
          },
        ]}
      />
      <AppDialog
        open={openAcceptModal}
        onOpenChange={setOpenAcceptModal}
        title="Accept offer"
        description="Are you sure you want to accept this offer and proceed to agreement?"
        actions={[
          {
            label: "Cancel",
            variant: "outline",
            onClick: () => setOpenAcceptModal(false),
          },
          {
            label: "Confirm",
            onClick: () => handleAcceptOffer(),
          },
        ]}
      />
    </>
  );
}
