"use client";

import { CarFront } from "lucide-react";

interface PropertyDistanceBadgeProps {
  durationText?: string | null;
  distanceText?: string | null;
  isEstimate?: boolean | null;
  loading?: boolean | null;
  error: string | null;
}

export function PropertyDistanceBadge({
  durationText,
  distanceText,
  isEstimate,
  loading,
  error,
}: PropertyDistanceBadgeProps) {
  if (loading) {
    return <span>…</span>;
  }

  if (error || !distanceText) return null;

  // Real travel time available (Distance Matrix succeeded)
  if (durationText && !isEstimate) {
    return (
      <span className="flex gap-0.5 items-center">
        <CarFront size={15} />
        {durationText}
      </span>
    );
  }

  // Fallback: straight-line distance only, no route/duration available
  return <span>{distanceText}</span>;
}
