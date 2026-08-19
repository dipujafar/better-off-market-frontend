"use client";

import { useTravelTimeFromMe } from "@/hooks/useTravelTimeFromMe";
import { cn } from "@/lib/utils";
import { ILocation } from "@/types";
import { priceFormatter } from "../utils/priceFormatter";
import { PropertyDistanceBadge } from "../utils/PropertyDistanceBadge";

type TProps = {
  oldListingPrice?: number;
  listingPrice: number;
  location: ILocation;
};

export default function PropertyCardBadges({
  location,
  oldListingPrice,
  listingPrice,
}: TProps) {
  const { durationText, distanceText, isEstimate, loading, error } =
    useTravelTimeFromMe(location, "DRIVING");
  return (
    <>
      <div className="absolute top-3 left-3 bg-[#1F4E8B] text-white px-2.5 py-1 rounded-full text-xs font-semibold">
        <PropertyDistanceBadge
          durationText={durationText}
          distanceText={distanceText}
          isEstimate={isEstimate}
          loading={loading}
          error={error}
        />
      </div>
      {oldListingPrice && (
        <div
          className={cn(
            "absolute top-3 left-3 bg-[#147430] text-white px-2.5 py-1 rounded-full text-xs font-semibold",
            (!error || distanceText) && "left-24",
            ((!error || distanceText) && isEstimate) && "left-20",
          )}
        >
          ↓{" "}
          <span className="ml-0.5">
            {priceFormatter.format(
              Number(oldListingPrice) - Number(listingPrice),
            )}
          </span>
        </div>
      )}
    </>
  );
}
