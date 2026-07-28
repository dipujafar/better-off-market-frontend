import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Shared card shell for every block in the offer summary
 * (Offer Details, Seller Concessions, Contingencies, Documents, ...).
 */
export function SummaryCard({ title, icon, children, className }: SummaryCardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6",
        className
      )}
    >
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
        {icon ? <span className="text-primary">{icon}</span> : null}
        {title}
      </h3>
      {children}
    </section>
  );
}