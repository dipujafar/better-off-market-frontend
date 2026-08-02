import { MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface OffersReceivedActionBarProps {
  onAcceptOffer?: () => void;
  onCounterOffer?: () => void;
  onMessageBuyer?: () => void;
  onReject?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

const baseButton =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function OffersReceivedActionBar({
  onAcceptOffer,
  onCounterOffer,
  onMessageBuyer,
  onReject,
  isSubmitting,
  className,
}: OffersReceivedActionBarProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center",
        className,
      )}
    >
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

      <Link href={"/send-counter-offer"}>
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

      <Link href={"/message"}>
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
    </div>
  );
}
