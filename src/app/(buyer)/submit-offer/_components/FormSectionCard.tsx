import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormSectionCardProps {
  title: string;
  icon?: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Shared "card" shell used by every section of the offer form
 * (Offer Details, Seller Concessions, Contingencies, ...).
 * Keeping this in one place means spacing/border/radius changes
 * only need to happen once.
 */
export function FormSectionCard({
  title,
  icon,
  description,
  children,
  className,
}: FormSectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-[#E0E3E580] bg-card p-6 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]",
        className
      )}
    >
      <div className="mb-4 border-b border-[#E0E3E580] pb-3">
        <h2 className="flex items-center gap-2 lg:text-2xl md:text-xl text-lg font-semibold text-foreground">
          {icon}
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {children}
      </div>
    </section>
  );
}