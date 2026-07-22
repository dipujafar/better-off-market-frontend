// data/mock-messages.ts
import type { Conversation, ChatThread } from "@/types";

export const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "James R.",
    initials: "JR",
    avatarColor: "bg-[#DAE2FD] text-[#131B2E]",
    lastMessage: "Thanks for the update!",
    timestamp: "2h ago",
    online: true,
  },
  {
    id: "2",
    name: "Sarah K.",
    initials: "SK",
    avatarColor: "bg-[#8A9AB2] text-white",
    lastMessage: "Counter-offer received",
    timestamp: "1d ago",
  },
  {
    id: "3",
    name: "Mike T.",
    initials: "MT",
    avatarColor: "bg-[#5C647A] text-white",
    lastMessage: "Congrats on the sale!",
    timestamp: "3d ago",
  },
];

export const mockThreads: Record<string, ChatThread> = {
  "1": {
    contact: {
      id: "1",
      name: "James R.",
      initials: "JR",
      avatarColor: "bg-indigo-100 text-indigo-700",
      propertyType: "3bd house",
      city: "Memphis",
      county: "Hamilton County",
    },
    dateLabel: "JUNE 14, 2024",
    messages: [
      { id: "m1", sender: "me", content: "Hi James, is the price negotiable?", time: "10:22 AM" },
      { id: "m2", sender: "them", content: "Yes, some flexibility. What are you thinking?", time: "10:45 AM" },
      { id: "m3", sender: "me", content: "I submitted $46,000 — hoping we can work it out.", time: "11:02 AM" },
      { id: "m4", sender: "them", content: "Thanks, I'll review it shortly.", time: "2:30 PM" },
    ],
  },
};