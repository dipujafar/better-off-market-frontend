import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { TagStarIcon } from "@/icons";

interface OfferComparisonCardProps {
  title: string;
  amount: number;
  previousAmount?: number;
  closingDate: string;
  previousClosingDate?: string;
  closingLabel?: string;
  /** Small numbered badge in the top-right corner, e.g. which counter round this is. */
  badgeNumber?: number;
  highlighted?: boolean;
}

function formatCurrency(amount: number) {
  return amount?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function OfferComparisonCard({
  title,
  amount,
  previousAmount,
  closingDate,
  previousClosingDate,
  closingLabel = "Closing:",
  badgeNumber,
  highlighted,
}: OfferComparisonCardProps) {
  const amountChanged =
    previousAmount !== undefined && previousAmount !== amount;
  const dateChanged =
    previousClosingDate !== undefined && previousClosingDate !== closingDate;

  return (
    <div
      className={cn(
        "relative flex-1 rounded-lg border p-4",
        highlighted
          ? "border-primary-border-color bg-[#AC34000D]"
          : " border-none bg-[#F2F4F6]",
      )}
    >
      {badgeNumber !== undefined ? (
        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full  text-xs font-semibold text-white">
          <TagStarIcon/>
        </span>
      ) : null}

      <p className="text-sm font-semibold text-primary-color">{title}</p>

      <p className="mt-2 flex flex-wrap items-baseline gap-2">
        {amountChanged ? (
          <span className="text-base text-muted-foreground line-through">
            {formatCurrency(previousAmount)}
          </span>
        ) : null}
        <span className="text-xl font-semibold text-foreground">
          {formatCurrency(amount)}
        </span>
      </p>

      <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar size={13} />
        {dateChanged ? (
          <>
            <span>{closingLabel}</span>
            <span className="line-through">{previousClosingDate}</span>
            <span className="font-medium text-foreground">{closingDate}</span>
          </>
        ) : (
          <>
            <span>{closingLabel}</span>
            <span className="font-medium text-foreground">{closingDate}</span>
          </>
        )}
      </p>
    </div>
  );
}
