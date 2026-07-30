"use client";
import { useRouter } from "next/navigation";
import { NegotiationStory } from "./NegotiationStory";
import type { NegotiationEvent } from "./utils.data";

const events: NegotiationEvent[] = [
  {
    id: "1",
    status: "pending",
    amount: 48500,
    date: "June 24, 2024",
    time: "2:15 PM EST",
    actionLabel: "Submitted by James Butler",
    actorName: "James Butler",
    actorInitials: "JB",
    actorRole: "Buyer",
  },
  {
    id: "2",
    status: "rejected",
    amount: 47500,
    date: "June 22, 2024",
    time: "11:05 AM EST",
    actionLabel: "Rejected by James Butler",
    actorName: "James Butler",
    actorInitials: "JB",
    actorRole: "Seller",
  },
  {
    id: "3",
    status: "countered",
    amount: 49500,
    date: "June 21, 2024",
    time: "4:50 PM EST",
    actionLabel: "Counter by James Butler",
    actorName: "Emma Parker",
    actorInitials: "EP",
    actorRole: "Seller",
  },
  {
    id: "4",
    status: "rejected",
    amount: 46000,
    date: "June 20, 2024",
    time: "9:30 AM EST",
    actionLabel: "Rejected by James Butler",
    actorName: "James Butler",
    actorInitials: "JB",
    actorRole: "Seller",
  },
];

export default function OfferNegotiationStoryContainer() {
  const router = useRouter();
  return (
    <NegotiationStory
      events={events}
      onBack={() => router.back()}
      onMessage={() => console.log("message seller")}
      hasMore
      onLoadMore={() => console.log("load more")}
    />
  );
}