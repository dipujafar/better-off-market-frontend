"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
import { envConfig } from "@/config";

// Add to .env.local:
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

const GOOGLE_MAPS_API_KEY = envConfig.mapKey!;

type Prediction = {
  place_id: string;
  description: string;
};

type LocationSearchProps = {
  placeholder?: string;
  onApply?: (locations: Prediction[]) => void;
};

let scriptLoadingPromise: Promise<void> | null = null;

function loadGoogleMapsScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).google?.maps?.places) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Maps script"));
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

export default function LocationSearch({
  placeholder = "Search by city, ZIP, or address",
  onApply,
}: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selected, setSelected] = useState<Prediction[]>([]);
  const [scriptReady, setScriptReady] = useState(false);

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        autocompleteService.current =
          new google.maps.places.AutocompleteService();
        setScriptReady(true);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchPredictions = useCallback((input: string) => {
    if (!autocompleteService.current || !input.trim()) {
      setPredictions([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input,
        // Covers city, state, county, ZIP, and full address searches
        types: ["geocode"],
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(
            results.map((r) => ({
              place_id: r.place_id,
              description: r.description,
            })),
          );
        } else {
          setPredictions([]);
        }
      },
    );
  }, []);

  function handleInputChange(value: string) {
    setQuery(value);
    setIsOpen(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(value), 300);
  }

  function addLocation(prediction: Prediction) {
    setSelected((prev) => {
      if (prev.some((p) => p.place_id === prediction.place_id)) return prev;
      return [...prev, prediction];
    });
    setQuery("");
    setPredictions([]);
  }

  function removeLocation(placeId: string) {
    setSelected((prev) => prev.filter((p) => p.place_id !== placeId));
  }

  function clearAll() {
    setSelected([]);
    setQuery("");
    setPredictions([]);
  }

  function handleApply() {
    onApply?.(selected);
    setIsOpen(false);
  }

  function handleSearchClick() {
    // If there's text typed but not added yet, fetch fresh predictions and open dropdown
    if (query.trim()) {
      fetchPredictions(query);
    }
    setIsOpen(true);
  }

  const listItems = query.trim() ? predictions : selected;
  const showList = isOpen && listItems.length > 0;

  return (
    <div ref={containerRef} className="relative  w-full">
      {/* Search bar */}
      <div className="flex items-center gap-2 rounded-xl bg-white p-4 shadow-lg">
        <div className="flex flex-1 bg-[#F2F4F6] items-center gap-2 rounded-md px-4 py-2">
          <Search className="h-5 w-5 shrink-0 text-[#8D7168]" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            disabled={!scriptReady}
            className="w-full bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleSearchClick}
          className="flex shrink-0 items-center gap-2 rounded-full bg-primary-color cursor-pointer px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Search className="h-4 w-4" />
          <span className="hidden md:block">Search Properties</span>
        </button>
      </div>

      {/* Dropdown */}
      {showList && (
        <div className="absolute left-2 top-[calc(100%+8px)] z-20 w-80 overflow-hidden rounded-xl bg-white shadow-xl">
          <ul className="max-h-72 overflow-y-auto py-2">
            {listItems.map((item) => {
              const isSelected = selected.some(
                (s) => s.place_id === item.place_id,
              );
              return (
                <li key={item.place_id}>
                  <button
                    type="button"
                    onClick={() =>
                      query.trim()
                        ? addLocation(item)
                        : removeLocation(item.place_id)
                    }
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-primary-black hover:bg-gray-50 cursor-pointer"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-[#A9ACB3]" />
                    <span className="truncate">{item.description}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-medium text-primary-color hover:text-gray-700"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded-sm bg-primary-color px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
