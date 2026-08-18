"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locate } from "lucide-react";
import { useCallback, useState } from "react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

const containerStyle = {
  width: "100%",
  height: "300px",
};

// Muted grayscale style to match the reference screenshot
// const mapStyles: google.maps.MapTypeStyle[] = [
//   { elementType: "geometry", stylers: [{ color: "#e9e9e9" }] },
//   { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
//   { elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
//   { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
//   {
//     featureType: "administrative.land_parcel",
//     stylers: [{ visibility: "off" }],
//   },
//   { featureType: "poi", stylers: [{ visibility: "off" }] },
//   {
//     featureType: "poi.park",
//     elementType: "geometry",
//     stylers: [{ color: "#e5e5e5" }],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [{ color: "#ffffff" }],
//   },
//   {
//     featureType: "road.arterial",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#757575" }],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry",
//     stylers: [{ color: "#dadada" }],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#616161" }],
//   },
//   {
//     featureType: "road.local",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#9e9e9e" }],
//   },
//   { featureType: "transit", stylers: [{ visibility: "off" }] },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#dbe3e5" }],
//   },
// ];

type Coordinates = [number, number][];

interface LocationMapProps {
  lat?: number;
  lng?: number;
  coordinates?: Coordinates; // optional [lng, lat][] — center will be derived from this if lat/lng not given
  title?: string;
  zoom?: number;
}

function getCenterFromCoordinates(coords: Coordinates): {
  lat: number;
  lng: number;
} {
  const lats = coords.map(([, lat]) => lat);
  const lngs = coords.map(([lng]) => lng);
  return {
    lat: (Math.min(...lats) + Math.max(...lats)) / 2,
    lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
  };
}

// Custom pin icon matching the blue circular marker in the screenshot
function getPinIcon(): google.maps.Symbol {
  return {
    path: "M12 0C7.6 0 4 3.6 4 8c0 5.4 6.7 13.2 7.1 13.6.2.3.6.4.9.4s.7-.1.9-.4C13.3 21.2 20 13.4 20 8c0-4.4-3.6-8-8-8zm0 11.5c-1.9 0-3.5-1.6-3.5-3.5S10.1 4.5 12 4.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z",
    fillColor: "#1e5a8e",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 1.5,
    scale: 1.6,
    anchor: new google.maps.Point(12, 22),
  };
}

export function LocationMap({
  lat,
  lng,
  coordinates,
  title = "Location",
  zoom = 14,
}: LocationMapProps) {
  const { isLoaded } = useGoogleMaps();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [locating, setLocating] = useState(false);

  const center =
    lat !== undefined && lng !== undefined
      ? { lat, lng }
      : coordinates && coordinates.length > 0
        ? getCenterFromCoordinates(coordinates)
        : { lat: 0, lng: 0 };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Google Maps has no built-in "recenter on my location" control —
  // this button pans/zooms the existing map instance to the browser's
  // current position. It does NOT change the marker/pin, which still
  // represents the property's actual location.
  const goToMyLocation = useCallback(() => {
    if (!map || typeof window === "undefined" || !navigator.geolocation)
      return;

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.panTo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        map.setZoom(16);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 }
    );
  }, [map]);

  return (
    <div className="w-full border-none shadow-none">
      <CardHeader className="px-0 pb-3">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="relative rounded-2xl overflow-hidden">
          {isLoaded ? (
            <>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                  scrollwheel: true,
                  gestureHandling: "cooperative",
                  // styles: mapStyles,
                }}
              >
                <Marker position={center} icon={getPinIcon()} />
              </GoogleMap>

              <button
                type="button"
                onClick={goToMyLocation}
                disabled={locating}
                aria-label="Go to my location"
                className="absolute bottom-1 right-3 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 disabled:opacity-50"
              >
                <Locate
                  className={`h-4 w-4 text-[#1e5a8e] ${locating ? "animate-pulse" : ""}`}
                />
              </button>
            </>
          ) : (
            <div className="h-75 flex items-center justify-center text-muted-foreground text-sm bg-gray-100">
              Loading Map...
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}