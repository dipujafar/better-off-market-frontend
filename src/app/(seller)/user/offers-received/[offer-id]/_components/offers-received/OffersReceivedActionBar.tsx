import { MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CLOSED_OFFER_STATUSES, OFFER_STATUS } from "./utils.offer-received";

interface OffersReceivedActionBarProps {
  buyerId?: string;
  offerId: string;
  onAcceptOffer?: () => void;
  onCounterOffer?: () => void;
  onMessageBuyer?: () => void;
  onReject?: () => void;
  isSubmitting?: boolean;
  className?: string;
  lastActionBy?: "buyer" | "seller";
  status: (typeof OFFER_STATUS)[keyof typeof OFFER_STATUS];
}

const baseButton =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function OffersReceivedActionBar({
  buyerId,
  offerId,
  onAcceptOffer,
  onCounterOffer,
  onMessageBuyer,
  onReject,
  isSubmitting,
  className,
  lastActionBy = "buyer",
  status,
}: OffersReceivedActionBarProps) {
  console.log(status);
  const showFullActions = lastActionBy !== "seller";
  const isStatusClosed = CLOSED_OFFER_STATUSES.includes(status);

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center",
        className,
      )}
    >
      {showFullActions && !isStatusClosed ? (
        <Link href={"/sign-agreement-contact"}>
          <button
            type="button"
            onClick={onAcceptOffer}
            disabled={isSubmitting}
            className={cn(
              baseButton,
              "bg-[#0D6F3A] text-white rounded-md hover:bg-emerald-700 cursor-pointer",
            )}
          >
            Accept Offer
          </button>
        </Link>
      ) : null}

      {showFullActions && !isStatusClosed ? (
        <Link href={`/send-counter-offer?offer=${offerId}`}>
          <button
            type="button"
            onClick={onCounterOffer}
            disabled={isSubmitting}
            className={cn(
              baseButton,
              "bg-[#2D3133] text-white hover:bg-slate-800 rounded-md cursor-pointer",
            )}
          >
            Counter offer
          </button>
        </Link>
      ) : null}

      <Link href={`/message?user=${buyerId}`}>
        <button
          type="button"
          onClick={onMessageBuyer}
          disabled={isSubmitting}
          className={cn(
            baseButton,
            "border border-primary-border-color rounded-md bg-card text-primary-color hover:bg-muted/50 cursor-pointer",
          )}
        >
          <MessageSquareText size={14} />
          Message buyer
        </button>
      </Link>

      {showFullActions && !isStatusClosed ? (
        <button
          type="button"
          onClick={onReject}
          disabled={isSubmitting}
          className={cn(
            baseButton,
            "border border-destructive/40 bg-card text-destructive hover:bg-destructive/5 cursor-pointer rounded-md",
          )}
        >
          Reject
        </button>
      ) : null}
    </div>
  );
}
