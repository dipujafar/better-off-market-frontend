"use client";

import { useTravelTimeFromMe, ILocation } from "@/hooks/useTravelTimeFromMe";

interface PropertyDistanceBadgeProps {
  location: ILocation;
}

export function PropertyDistanceBadge({ location }: PropertyDistanceBadgeProps) {
  const { durationText, distanceText, isEstimate, loading, error } =
    useTravelTimeFromMe(location, "DRIVING");

    console.log(durationText, distanceText, isEstimate, loading, error)

  if (loading) {
    return <span>…</span>;
  }

  if (error || !distanceText) return null;

  // Real travel time available (Distance Matrix succeeded)
  if (durationText && !isEstimate) {
    return (
      <span >
        {durationText} drive ({distanceText}) from your location
      </span>
    );
  }

  // Fallback: straight-line distance only, no route/duration available
  return (
    <span>
      {distanceText} away (straight-line) from your location
    </span>
  );
}