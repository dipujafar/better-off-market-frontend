import type { ReactNode } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { DollarIcon } from "@/icons";

interface ChangedSummaryCardProps {
  title: string;
  icon?: ReactNode;
  changedBy: string;
  modifiedAt: string;
  description: string;
  children: ReactNode;
  className?: string;
}

/**
 * Same shell as SummaryCard, but for a section the other party just edited:
 * a dark "Changed by <name>" strip up top with a timestamp, a short
 * explanation of what changed, then the diff content (DiffField, etc.).
 */
export function ChangedSummaryCard({
  title,
  icon,
  changedBy,
  modifiedAt,
  description,
  children,
  className,
}: ChangedSummaryCardProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-primary bg-card shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-1 bg-primary-color px-5 py-2 text-white">
        <span className="flex items-center gap-1.5 text-xs font-medium">
          <Pencil size={12} />
          Changed by {changedBy}
        </span>
        <span className="text-[11px] uppercase tracking-wide text-white/70">
          Modified {modifiedAt}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-primary-color md:text-xl">
          {icon ? <span className="text-primary">{icon}</span> : null}
          {title}
        </h3>
        <div className="flex">
          <div className="bg-[#E2F4FF] size-12 flex-center rounded-full">
            <DollarIcon />
          </div>
          <div>
            <p className="mb-4  text-[#594139]">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
