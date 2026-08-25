"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

interface UseGeolocationParamsOptions {
  latKey?: string;
  lngKey?: string;
  enabled?: boolean;
}

export function useGeolocationParams({
  latKey = "lat",
  lngKey = "lng",
  enabled = true,
}: UseGeolocationParamsOptions = {}) {
  const searchParams = useSearchParams();
  const updateParams = useUpdateSearchParams();
  const hasRequested = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (hasRequested.current) return;
    if (!("geolocation" in navigator)) return;

    const hasExistingCoords =
      searchParams.get(latKey) && searchParams.get(lngKey);
    if (hasExistingCoords) return;

    hasRequested.current = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateParams({
          [latKey]: latitude.toString(),
          [lngKey]: longitude.toString(),
        });
      },
      (error) => {
        console.warn("Geolocation not available:", error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      },
    );
  }, [enabled, latKey, lngKey, searchParams, updateParams]);
}
