"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const SORT_OPTIONS = [
  "Newest First",
  "Oldest First",
  "Lowest Price",
  "Highest Price",
];

interface PropertiesSortBarProps {
  total: number;
  className?: string;
}

export function PropertiesSortBar({
  total,
  className,
}: PropertiesSortBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState("Newest First");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={cn("flex flex-wrap gap-2 w-full items-center justify-between mb-6", className)}
    >
      <p className="lg:text-2xl md:text-xl text-lg font-semibold text-primary-black">
        Showing {total} properties
      </p>

      <div className="relative flex items-center gap-2" ref={dropdownRef}>
        <span className="text-sm text-[#505F76] font-medium">Sort by:</span>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-md border border-primary-border-color bg-white px-3.5 py-1.5 text-sm text-primary-black hover:border-gray-400 transition-colors cursor-pointer"
        >
          {sortBy}
          <ChevronDown
            size={16}
            className={cn(
              "text-gray-500 transition-transform",
              isOpen ? "rotate-180" : "",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-lg border border-primary-border-color bg-white shadow-lg">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSortBy(option);
                  setIsOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 cursor-pointer",
                  sortBy === option
                    ? "font-semibold text-primary-black"
                    : "text-gray-700",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
