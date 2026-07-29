"use client";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import { PROPERTY_TYPES, PropertyType } from "../config/property-type.config";

interface PropertyTypeSelectProps {
  value: PropertyType;
  onChange: (value: PropertyType) => void;
  error?: string;
}

/**
 * Custom dropdown (not shadcn Select) so the selected row can show the
 * bold + highlighted-background treatment from the design, without a
 * checkmark icon on the right.
 */
export function PropertyTypeSelect({ value, onChange, error }: PropertyTypeSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <Label className="mb-1.5 flex items-center gap-1 text-sm font-bold text-primary-black">
        Property Type
        <span className="text-red-500">*</span>
      </Label>

      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`flex w-full items-center justify-between rounded-md border ${
            error ? "border-red-400" : "border-gray-200"
          } bg-[#F2F4F6] px-4 py-2.5 text-left text-sm text-primary-black focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue`}
        >
          {value}
          <ChevronDownIcon
            className={`size-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-gray-100 bg-white py-1 shadow-lg">
            {PROPERTY_TYPES.map((type) => (
              <li key={type}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(type);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    type === value
                      ? "bg-[#F2F4F6] font-semibold text-primary-blue"
                      : "text-primary-black hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
