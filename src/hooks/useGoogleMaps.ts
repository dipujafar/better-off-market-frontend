import { envConfig } from "@/config"
import { useJsApiLoader } from "@react-google-maps/api"

const LIBRARIES: ("drawing" | "places" | "geometry")[] = ["drawing"]

export function useGoogleMaps() {
  return useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: envConfig.mapKey!,
    libraries: LIBRARIES,
  })
}