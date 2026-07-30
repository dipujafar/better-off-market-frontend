import type { ComponentType } from "react";
import { ClipboardCheck, X, ArrowLeftRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type NegotiationStatus = "pending" | "rejected" | "countered" | "accepted";

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
}

export const STATUS_CONFIG: Record<NegotiationStatus, StatusConfig> = {
  pending: {
    label: "Pending",
    icon: ClipboardCheck,
    badgeClassName: "bg-amber-100 text-amber-800",
    amountClassName: "text-amber-600",
    nodeClassName: "bg-slate-900 text-white",
    dividerClassName: "border-amber-300",
  },
  rejected: {
    label: "Rejected",
    icon: X,
    badgeClassName: "bg-rose-100 text-rose-700",
    amountClassName: "text-foreground",
    nodeClassName: "bg-muted text-muted-foreground",
    dividerClassName: "border-border",
  },
  countered: {
    label: "Countered",
    icon: ArrowLeftRight,
    badgeClassName: "bg-violet-100 text-violet-700",
    amountClassName: "text-foreground",
    nodeClassName: "bg-violet-100 text-violet-600",
    dividerClassName: "border-violet-200",
  },
  accepted: {
    label: "Accepted",
    icon: Check,
    badgeClassName: "bg-emerald-100 text-emerald-700",
    amountClassName: "text-emerald-600",
    nodeClassName: "bg-emerald-600 text-white",
    dividerClassName: "border-emerald-300",
  },
};

const AVATAR_PALETTE = [
  "bg-slate-200 text-slate-600",
  "bg-orange-200 text-orange-700",
  "bg-sky-200 text-sky-700",
  "bg-violet-200 text-violet-700",
  "bg-emerald-200 text-emerald-700",
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