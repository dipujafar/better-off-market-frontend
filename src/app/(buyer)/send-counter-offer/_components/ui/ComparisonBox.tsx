interface ComparisonBoxProps {
  currentLabel?: string;
  currentValue: string;
  originalLabel?: string;
  originalValue: string;
}

export function ComparisonBox({
  currentLabel = "Current Selection",
  currentValue,
  originalLabel = "Original Offer",
  originalValue,
}: ComparisonBoxProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border border-primary-border-color bg-muted/30 p-4 sm:grid-cols-2">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {currentLabel}
        </p>
        <p className="mt-1 text-base font-semibold text-primary-color">{currentValue}</p>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {originalLabel}
        </p>
        <p className="mt-1 text-base text-muted-foreground line-through">{originalValue}</p>
      </div>
    </div>
  );
}
