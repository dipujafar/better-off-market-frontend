import { ArrowLeft, MessageSquare, MessageSquareText } from "lucide-react";
import Link from "next/link";

interface NegotiationStoryHeaderProps {
  title?: string;
  backLabel?: string;
  onBack?: () => void;
  messageLabel?: string;
  onMessage?: () => void;
}

export function NegotiationStoryHeader({
  title = "Negotiation Story",
  backLabel = "Back to Offer",
  onBack,
  messageLabel = "Message Seller",
  onMessage,
}: NegotiationStoryHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer duration-300"
        >
          <ArrowLeft size={14} />
          {backLabel}
        </button>
        <h1 className="mt-1 text-2xl font-semibold text-primary-black sm:text-3xl">
          {title}
        </h1>
      </div>

      <Link href="/message">
        <button
          type="button"
          onClick={onMessage}
          className="inline-flex items-center gap-2 self-start rounded-lg bg-primary-gray px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-black sm:self-auto cursor-pointer duration-300 transform-active:scale-95"
        >
          <MessageSquareText size={14} />
          {messageLabel}
        </button>
      </Link>
    </div>
  );
}
