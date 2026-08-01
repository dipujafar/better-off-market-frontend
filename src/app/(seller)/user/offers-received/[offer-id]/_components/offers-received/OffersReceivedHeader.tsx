import { SubmitOfferIcon } from "@/icons";
import { Clock, History } from "lucide-react";
import Link from "next/link";

interface OffersReceivedHeaderProps {
  buyerName: string;
  propertyLabel: string;
  offersSubmittedCount: number;
  onViewHistory?: () => void;
}

export function OffersReceivedHeader({
  buyerName,
  propertyLabel,
  offersSubmittedCount,
  onViewHistory,
}: OffersReceivedHeaderProps) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-primary-black sm:text-3xl">
        Offers received — {buyerName} on {propertyLabel}
      </h1>
      <div className="mb-5 flex  gap-3  items-center justify-between">
        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary-color">
          <SubmitOfferIcon />
          {offersSubmittedCount} offer{offersSubmittedCount === 1 ? "" : "s"}{" "}
          submitted
        </p>

        <Link href="/offer-negotiation-story">
          <button
            type="button"
            onClick={onViewHistory}
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-primary-border-color bg-card px-3 py-1.5 text-sm font-medium text-primary-color hover:bg-muted/50 sm:self-auto cursor-pointer"
          >
            <History size={14} />
            View History
          </button>
        </Link>
      </div>
    </div>
  );
}
