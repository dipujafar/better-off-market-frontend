"use client";

import { ILocation } from "@/types";
import { useEffect, useState } from "react";

export type TravelMode = "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

interface TravelTimeResult {
  distanceText: string | null; // e.g. "4.2 km" (road distance, or straight-line if isEstimate)
  durationText: string | null; // e.g. "12 mins" — null when falling back to straight-line
  durationMinutes: number | null; // e.g. 12 — null when falling back to straight-line
  distanceMeters: number | null; // raw distance in meters, road or straight-line
  isEstimate: boolean; // true when this is straight-line distance, not real travel time
  loading: boolean;
  error: string | null;
}

// Haversine formula — straight-line distance between two lat/lng points, in meters.
function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatMeters(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Computes real (road) travel time in minutes from the device's current
 * location to `target`, using Google's Distance Matrix Service.
 *
 * Requires the Google Maps JS API to already be loaded (e.g. via your
 * existing useGoogleMaps hook) — DistanceMatrixService is part of the
 * core `maps` library, no extra "libraries" entry needed. However the
 * Distance Matrix API must be enabled + billed on your Google Cloud
 * project, separately from the Maps JavaScript API / Places API.
 *
 * Only fires once per `target` + `travelMode` combination.
 */
export function useTravelTimeFromMe(
  target: ILocation | undefined,
  travelMode: TravelMode = "DRIVING",
): TravelTimeResult {
  const [result, setResult] = useState<TravelTimeResult>({
    distanceText: null,
    durationText: null,
    durationMinutes: null,
    distanceMeters: null,
    isEstimate: false,
    loading: false,
    error: null,
  });

  const targetLng = target?.coordinates[0];
  const targetLat = target?.coordinates[1];

  useEffect(() => {
    if (targetLng === undefined || targetLat === undefined) return;

    if (typeof window === "undefined" || !navigator.geolocation) {
      setResult((r) => ({ ...r, error: "Geolocation not supported" }));
      return;
    }

    if (typeof google === "undefined" || !google.maps) {
      setResult((r) => ({ ...r, error: "Google Maps not loaded yet" }));
      return;
    }

    let cancelled = false;
    setResult((r) => ({ ...r, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled) return;

        const origin = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        const destination = { lat: targetLat, lng: targetLng };

        // Straight-line fallback, computed regardless — used if the
        // Distance Matrix call fails or isn't enabled/billed.
        const fallbackMeters = haversineMeters(
          origin.lat,
          origin.lng,
          destination.lat,
          destination.lng,
        );
        const fallbackResult: TravelTimeResult = {
          distanceText: formatMeters(fallbackMeters),
          durationText: null,
          durationMinutes: null,
          distanceMeters: fallbackMeters,
          isEstimate: true,
          loading: false,
          error: null,
        };

        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode[travelMode],
            unitSystem: google.maps.UnitSystem.METRIC,
          },
          (response, status) => {
            if (cancelled) return;

            if (status !== "OK" || !response) {
              // Distance Matrix unavailable (not enabled, no billing,
              // quota, etc.) — fall back to straight-line distance.
              setResult(fallbackResult);
              return;
            }

            const element = response.rows[0]?.elements[0];
            if (!element || element.status !== "OK") {
              // No routable path (e.g. across water for driving) —
              // straight-line distance is still meaningful here.
              setResult(fallbackResult);
              return;
            }

            setResult({
              distanceText: element.distance.text,
              durationText: element.duration.text,
              durationMinutes: Math.round(element.duration.value / 60),
              distanceMeters: element.distance.value,
              isEstimate: false,
              loading: false,
              error: null,
            });
          },
        );
      },
      () => {
        if (cancelled) return;
        setResult((r) => ({
          ...r,
          loading: false,
          error: "Location permission denied",
        }));
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 },
    );

    return () => {
      cancelled = true;
    };
  }, [targetLng, targetLat, travelMode]);

  return result;
}
