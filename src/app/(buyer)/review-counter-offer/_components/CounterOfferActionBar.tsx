import { MessageSquare, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CounterOfferActionBarProps {
  onAcceptCounter?: () => void;
  onCounterOffer?: () => void;
  onMessageBuyer?: () => void;
  onReject?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

const baseButton =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function CounterOfferActionBar({
  onAcceptCounter,
  onCounterOffer,
  onMessageBuyer,
  onReject,
  isSubmitting,
  className,
}: CounterOfferActionBarProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center ",
        className,
      )}
    >
      <button
        type="button"
        onClick={onAcceptCounter}
        disabled={isSubmitting}
        className={cn(
          baseButton,
          "bg-[#0D6F3A] rounded-md text-white hover:bg-emerald-700 flex-1 cursor-pointer",
        )}
      >
        Accept counter
      </button>

      <Link href={"#"} className="block flex-1">
        <button
          type="button"
          // onClick={onCounterOffer}
          disabled={isSubmitting}
          className={cn(
            baseButton,
            "bg-[#2D3133] text-white hover:bg-slate-800 w-full cursor-pointer",
          )}
        >
          Counter offer
        </button>
      </Link>
      <Link href={"/message"} className="block flex-1">
        <button
          type="button"
          onClick={onMessageBuyer}
          disabled={isSubmitting}
          className={cn(
            baseButton,
            "border border-primary-border-color bg-card text-primary-black hover:bg-muted/50 w-full cursor-pointer",
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
          "border border-destructive/40 bg-card text-destructive hover:bg-destructive/5 flex-1",
        )}
      >
        Reject
      </button>
    </div>
  );
}
