import { useJsApiLoader } from "@react-google-maps/api"

const LIBRARIES: ("drawing" | "places" | "geometry")[] = ["drawing"]

export function useGoogleMaps() {
  return useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!,
    libraries: LIBRARIES,
  })
}