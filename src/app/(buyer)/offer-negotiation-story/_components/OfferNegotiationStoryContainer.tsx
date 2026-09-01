"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { NegotiationStory } from "./NegotiationStory";
import { mapOfferHistoryToNegotiationEvents } from "./utils.data";
import { useGetSingleOfferQuery } from "@/redux/api/offerApi";
import Empty from "@/components/ui/empty-data";
import { useAppSelector } from "@/redux/hooks";

export default function OfferNegotiationStoryContainer() {
  const offerId = useSearchParams().get("offer");
  const { data, isLoading } = useGetSingleOfferQuery(offerId, {
    skip: !offerId,
  });
  const router = useRouter();
  const user: any = useAppSelector((state) => state.auth.user);

  const offer = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-56 rounded bg-gray-200" />
        <div className="h-32 rounded bg-gray-100" />
        <div className="h-32 rounded bg-gray-100" />
      </div>
    );
  }

  if (!offer) return <Empty message="Offer not found" className="mt-16" />;

  const events = mapOfferHistoryToNegotiationEvents(offer);

  // Determine which side the logged-in user is on, so the button
  // always points at the OTHER party.
  const isCurrentUserSeller = user?.userId === offer.seller._id;

  const messageLabel = isCurrentUserSeller ? "Message Buyer" : "Message Seller";
  const messageTargetId = isCurrentUserSeller ? offer.buyer._id : offer.seller._id;
  const messageHref = `/message?selectedUser=${messageTargetId}`;

  return (
    <NegotiationStory
      events={events}
      onBack={() => router.back()}
      messageLabel={messageLabel}
      messageHref={messageHref}
    />
  );
}