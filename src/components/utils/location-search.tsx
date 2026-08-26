"use client";

import { useEffect, useRef, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetPropertiesForWebQuery } from "@/redux/api/propertiesApi";
import { IPropertyResponse } from "@/types";
import Link from "next/link";

type LocationSearchProps = {
  placeholder?: string;
};

const SEARCH_DEBOUNCE_MS = 300;

// Escapes regex special characters in the search term so a query like
// "3.5" or "(Dhaka)" doesn't break the RegExp constructor below.
function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Splits `text` around every case-insensitive occurrence of `term` and
// bolds the matching parts. Returns plain text unchanged if term is empty.
function highlightMatch(text: string, term: string) {
  if (!term.trim()) return text;

  const pattern = new RegExp(`(${escapeRegExp(term.trim())})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    pattern.test(part) ? (
      <strong key={i} className="font-semibold text-base text-primary-black">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function LocationSearch({
  placeholder = "Search by city, ZIP, or address",
}: LocationSearchProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetPropertiesForWebQuery(
    { searchTerm: debouncedTerm },
    { skip: !debouncedTerm.trim() },
  );

  const properties: IPropertyResponse[] = data?.data ?? [];

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

  function handleInputChange(value: string) {
    setInputValue(value);
    setIsOpen(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedTerm(value);
    }, SEARCH_DEBOUNCE_MS);
  }

  function handleSearchClick() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setDebouncedTerm(inputValue);
    setIsOpen(true);
  }

  // function handleSelectProperty(propertyId: string) {
  //   setIsOpen(false);
  //   router.push(`/properties-list/${propertyId}`);
  // }

  const showList = isOpen && debouncedTerm.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search bar */}
      <div className="flex items-center gap-2 rounded-full bg-white p-3 shadow-lg">
        <div className="flex flex-1 items-center gap-2 rounded-md px-4 py-2">
          <Search className="h-5 w-5 shrink-0 text-[#8D7168]" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => inputValue.trim() && setIsOpen(true)}
            placeholder={placeholder}
            className="w-full bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleSearchClick}
          className="flex shrink-0 items-center gap-2 rounded-full bg-primary-color  px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Search className="h-4 w-4" />
          <span className="hidden md:block">Search Properties</span>
        </button>
      </div>

      {/* Dropdown */}
      {showList && (
        <div className="absolute left-2 top-[calc(100%+8px)] z-9999 md:max-w-150 max-w-88 min-w-72 overflow-hidden rounded-xl bg-white shadow-xl">
          {isLoading ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500 ">
              Searching...
            </div>
          ) : properties.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No properties found.
            </div>
          ) : (
            <ul className="max-h-52 overflow-y-auto py-1">
              {properties.map((property) => {
                const addressText = `${property?.streetAddress}, ${property?.city}, ${property?.state}, ${property?.zipCode}, ${property?.county}`;

                return (
                  <li key={property._id}>
                    <Link href={`/properties-list/${property._id}`}>
                      <button
                        type="button"
                        // onClick={() => setIsOpen(false)}
                        className="flex w-full items-start gap-3 px-4 py-2.5 text-left text-sm text-primary-gray hover:bg-gray-50 cursor-pointer"
                      >
                        <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#A9ACB3]" />
                        <span className="truncate">
                          {highlightMatch(addressText, debouncedTerm)}
                        </span>
                      </button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
