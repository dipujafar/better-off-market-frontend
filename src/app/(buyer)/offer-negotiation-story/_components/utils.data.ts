import type { ComponentType } from "react";
import { ClipboardCheck, X, ArrowLeftRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type NegotiationStatus =
  | "pending"
  | "rejected"
  | "countered"
  | "accepted";

export interface NegotiationEvent {
  id: string;
  status: NegotiationStatus;
  amount: number;
  date: string;
  time: string;
  /** e.g. "Submitted by James Butler", "Rejected by James Butler" — kept as one string so callers control exact wording. */
  actionLabel: string;
  actorName: string;
  actorInitials: string;
  actorRole: string;
  /** Optional override; otherwise derived from actorName so the same person always gets the same color. */
  avatarClassName?: string;
}

interface StatusConfig {
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  badgeClassName: string;
  amountClassName: string;
  nodeClassName: string;
  dividerClassName: string;
  borderClassName?: string;
}

export const STATUS_CONFIG: Record<NegotiationStatus, StatusConfig> = {
  pending: {
    label: "Pending",
    icon: ClipboardCheck,
    badgeClassName: "bg-[#FFF2D0] text-[#390B00] font-semibold",
    amountClassName: "text-[#F19C1F]",
    nodeClassName: "bg-slate-900 text-white",
    dividerClassName: "border-[#E2BFB5]",
    borderClassName: " border-l-4 border-[#F19C1F]",
  },
  rejected: {
    label: "Rejected",
    icon: X,
    badgeClassName: "bg-[#FFDAD6] text-[#93000A] font-semibold",
    amountClassName: "text-primary-black",
    nodeClassName: "bg-muted text-muted-foreground",
    dividerClassName: "border-[#E2BFB5]",
  },
  countered: {
    label: "Countered",
    icon: ArrowLeftRight,
    badgeClassName: "bg-violet-100 text-violet-700",
    amountClassName: "text-foreground",
    nodeClassName: "bg-[#DAE2FD] text-[#5C647A]",
    dividerClassName: "border-[#E2BFB5]",
    borderClassName: " border-l-4 border-[#565E74]",
  },
  accepted: {
    label: "Accepted",
    icon: Check,
    badgeClassName: "bg-emerald-100 text-emerald-700",
    amountClassName: "text-emerald-600",
    nodeClassName: "bg-emerald-600 text-white",
    dividerClassName: "border-[#E2BFB5]",
  },
};

const AVATAR_PALETTE = [
  "bg-[#ECEEF0] text-[#565E74] text-sm",
  "bg-[#FFB59D] text-[#5E1900] text-sm",
];

/** Deterministic color per name so the same person's avatar is consistent across events. */
export function avatarColorForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

export function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export { cn };
