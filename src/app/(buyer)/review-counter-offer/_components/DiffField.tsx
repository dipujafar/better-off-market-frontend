import { DollarIcon } from "@/icons";
import { cn } from "@/lib/utils";

interface DiffFieldProps {
  label: string;
  oldValue: string;
  newValue: string;
  className?: string;
}

/** Uppercase label with the previous value struck through next to the new bold value. */
export function DiffField({
  label,
  oldValue,
  newValue,
  className,
}: DiffFieldProps) {
  return (
    <div>
      
      <div className={cn("rounded-lg bg-[#F2F4F6] px-4 py-3", className)}>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#594139]">
          {label}
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-2 text-sm">
          <span className="text-[#594139]/70 text-2xl font-bold line-through">{oldValue}</span>
          <span className="text-2xl font-bold text-primary-color">{newValue}</span>
        </p>
      </div>
    </div>
  );
}
