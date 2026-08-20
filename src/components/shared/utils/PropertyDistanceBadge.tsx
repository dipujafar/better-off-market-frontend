"use client";

import { useTravelTimeFromMe } from "@/hooks/useTravelTimeFromMe";
import { ILocation } from "@/types";
import { CarFront } from "lucide-react";

interface PropertyDistanceBadgeProps {
  location: ILocation;
}

export function PropertyDistanceBadge({
  location,
}: PropertyDistanceBadgeProps) {
  const { durationText, distanceText, isEstimate, loading, error } =
    useTravelTimeFromMe(location, "DRIVING");
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
