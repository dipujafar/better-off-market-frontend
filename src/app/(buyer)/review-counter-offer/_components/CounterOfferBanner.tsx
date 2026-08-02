import { History } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CounterOfferBannerProps {
  title: string;
  sellerName: string;
  changedSectionCount: number;
  propertyAddress: string;
  onViewHistory?: () => void;
  className?: string;
}

/**
 * "Counter Offer Received" banner. The changed-section count is rendered
 * as its own inline element so it's easy to bold/link without touching
 * the surrounding sentence.
 */
export function CounterOfferBanner({
  title,
  sellerName,
  changedSectionCount,
  propertyAddress,
  onViewHistory,
  className,
}: CounterOfferBannerProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-primary-color bg-[#9ACEF91A] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5",
        className,
      )}
    >
      <div className="min-w-0">
        <h2 className="md:text-2xl text-xl font-semibold text-primary-color">
          {title}
        </h2>
        <p className="mt-1 md:text-base text-sm text-[#594139]">
          {sellerName} has modified{" "}
          <span className=" text-primary-color">
            {changedSectionCount} section{changedSectionCount === 1 ? "" : "s"}
          </span>{" "}
          of your offer for {propertyAddress}.
        </p>
      </div>

      <Link href={"/offer-negotiation-story"}>
        <button
          type="button"
          onClick={onViewHistory}
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-primary-border-color bg-card px-3 py-1.5 text-sm font-medium text-primary-color hover:bg-muted/50 sm:self-auto cursor-pointer"
        >
          <History size={14} />
          View History
        </button>
      </Link>
    </section>
  );
}
