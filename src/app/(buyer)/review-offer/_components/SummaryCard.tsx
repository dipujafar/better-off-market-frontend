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
        "rounded-xl border border-primary-border-color bg-card p-5 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] sm:p-6",
        className
      )}
    >
      <h3 className="mb-4 flex items-center gap-2 md:text-xl text-lg font-semibold text-primary-color">
        {icon ? <span className="text-primary">{icon}</span> : null}
        {title}
      </h3>
      {children}
    </section>
  );
}