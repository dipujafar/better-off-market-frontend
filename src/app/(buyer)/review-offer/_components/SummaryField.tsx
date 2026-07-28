import { cn } from "@/lib/utils";

interface SummaryFieldProps {
  label: string;
  value: string;
  className?: string;
  muted?: boolean;
}

/** Uppercase muted label with a bold value beneath it, e.g. OFFER AMOUNT / $48,500 */
export function SummaryField({ label, value, className, muted }: SummaryFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 truncate text-sm",
          muted ? "text-muted-foreground" : "font-semibold text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  );
}