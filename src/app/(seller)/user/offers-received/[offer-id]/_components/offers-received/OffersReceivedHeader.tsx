import { SubmitOfferIcon } from "@/icons";
import { History } from "lucide-react";
import Link from "next/link";

interface OffersReceivedHeaderProps {
  offerId: string;
  propertyId: string;
  propertyLabel: string;
  offersSubmittedCount: number;
  onViewHistory?: () => void;
}

export function OffersReceivedHeader({
  offerId,
  propertyId,
  propertyLabel,
  offersSubmittedCount,
  onViewHistory,
}: OffersReceivedHeaderProps) {
  const showHistoryButton = offersSubmittedCount > 1;

  return (
    <div>
      <h1 className="text-xl font-semibold text-primary-black sm:text-2xl mb-1">
        <Link
          href={`/user/my-listings/${propertyId}`}
          className="hover:text-blue-800 hover:underline duration-200 ease-in-out "
        >
          Offers received — on {propertyLabel}{" "}
        </Link>
      </h1>
      <div className="mb-5 flex gap-3 items-center justify-between">
        <Link href={`/offer-negotiation-story?offer=${offerId}`} className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary-color">
          <SubmitOfferIcon />
          {offersSubmittedCount} offer{offersSubmittedCount === 1 ? "" : "s"}{" "}
          submitted
        </Link>

        {showHistoryButton ? (
          <Link href={`/offer-negotiation-story?offer=${offerId}`}>
            <button
              type="button"
              onClick={onViewHistory}
              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-primary-border-color bg-card px-3 py-1.5 text-sm font-medium text-primary-color hover:bg-muted/50 sm:self-auto cursor-pointer"
            >
              <History size={14} />
              View History
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
