"use client";

import { useEffect, useRef, useState } from "react";
import { DollarSign } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface PriceRangeFieldProps {
  minPrice: string;
  maxPrice: string;
  onChange: (field: "minPrice" | "maxPrice", value: string) => void;
  debounceMs?: number;
  layout?: "vertical" | "horizontal";
}

export function PriceRangeField({
  minPrice,
  maxPrice,
  onChange,
  debounceMs = 800,
  layout,
}: PriceRangeFieldProps) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const debouncedMin = useDebounce(localMin, debounceMs);
  const debouncedMax = useDebounce(localMax, debounceMs);

  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstMinRun = useRef(true);
  const isFirstMaxRun = useRef(true);

  useEffect(() => {
    setLocalMin(minPrice);
  }, [minPrice]);

  useEffect(() => {
    setLocalMax(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    if (isFirstMinRun.current) {
      isFirstMinRun.current = false;
      return;
    }
    if (debouncedMin !== minPrice) onChange("minPrice", debouncedMin);
  }, [debouncedMin]);

  useEffect(() => {
    if (isFirstMaxRun.current) {
      isFirstMaxRun.current = false;
      return;
    }
    if (debouncedMax !== maxPrice) onChange("maxPrice", debouncedMax);
  }, [debouncedMax]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (localMin !== minPrice) onChange("minPrice", localMin);
        if (localMax !== maxPrice) onChange("maxPrice", localMax);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [localMin, localMax, minPrice, maxPrice, onChange]);

  return (
    <div ref={containerRef} className={layout !== "horizontal" ? "mb-6" : ""}>
      <label
        className={cn(
          " block text-sm font-medium text-[#594139]",
          layout === "horizontal" ? "mb-1.5" : "mb-3",
        )}
      >
        Price range
      </label>
      <div className={cn(layout === "horizontal" ? "flex gap-1" : "space-y-3")}>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary-gray" />
          <input
            type="number"
            inputMode="numeric"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            placeholder={layout === "horizontal" ? "Min" : "Min Price"}
            className="w-full rounded-lg bg-[#F2F4F6] py-2.5 pl-9 pr-3 text-sm text-primary-black placeholder:text-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-color/20 border border-[#E2BFB54D]"
          />
        </div>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary-gray" />
          <input
            type="number"
            inputMode="numeric"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            placeholder={layout === "horizontal" ? "Max" : "Max Price"}
            className="w-full rounded-lg bg-[#F2F4F6] py-2.5 pl-9 pr-3 text-sm text-primary-black placeholder:text-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-color/20 border border-[#E2BFB54D]"
          />
        </div>
      </div>
    </div>
  );
}
