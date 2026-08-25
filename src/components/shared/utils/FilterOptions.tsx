"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ListFilter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { CountySelector } from "@/components/shared/county_selector/CountySelector";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PriceRangeField } from "./PriceRangeField.tsx";

interface FilterState {
  counties: string[];
  propertyTypes: string[];
  minPrice: string;
  maxPrice: string;
  status: string[];
}

type FilterKey = "propertyTypes" | "status";

const PROPERTY_TYPES = [
  "Any Type",
  "Residential",
  "Multi-Family",
  "Commercial",
  "Land",
];
const STATUS_OPTIONS = ["Active", "Under Contract"];

const EMPTY_FILTERS: FilterState = {
  counties: [],
  propertyTypes: [],
  minPrice: "",
  maxPrice: "",
  status: [],
};

interface FilterOptionsProps {
  layout?: "vertical" | "horizontal";
}

// Reads current filter state straight out of the URL — used for initial
// state so a refresh / shared link keeps whatever was selected.
function readFiltersFromParams(
  searchParams: ReturnType<typeof useSearchParams>,
): FilterState {
  const parseArray = (key: string) => {
    const val = searchParams.get(key);
    return val ? val.split(",").filter(Boolean) : [];
  };

  return {
    counties: parseArray("county"),
    propertyTypes: parseArray("propertyType"),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    status: parseArray("status"),
  };
}

function hasActiveFilters(f: FilterState) {
  return (
    f.counties.length > 0 ||
    f.propertyTypes.length > 0 ||
    f.status.length > 0 ||
    Boolean(f.minPrice) ||
    Boolean(f.maxPrice)
  );
}

// Maps filter state -> exact param names, joining arrays with "," and
// leaving a key OUT (undefined) whenever its value is empty, so
// useUpdateSearchParams removes that param instead of writing "".
function buildParamsPayload(f: FilterState): Record<string, string | null> {
  return {
    county: f.counties.length ? f.counties.join(",") : null,
    propertyType: f.propertyTypes.length ? f.propertyTypes.join(",") : null,
    minPrice: f.minPrice.trim() ? f.minPrice.trim() : null,
    maxPrice: f.maxPrice.trim() ? f.maxPrice.trim() : null,
    status: f.status.length ? f.status.join(",") : null,
    page: "1",
  };
}

export default function FilterOptions({
  layout = "vertical",
}: FilterOptionsProps) {
  const searchParams = useSearchParams();
  const updateParams = useUpdateSearchParams();

  // "filters" = applied state, always in sync with the URL — edited
  // directly by the DESKTOP panel (auto-apply, no button needed).
  const [filters, setFilters] = useState<FilterState>(() =>
    readFiltersFromParams(searchParams),
  );

  // "draftFilters" = local-only state used ONLY inside the mobile Sheet.
  // Edits here don't touch the URL until "Apply Filters" is clicked.
  const [draftFilters, setDraftFilters] = useState<FilterState>(filters);

  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (layout !== "horizontal") return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [layout]);

  // ---- DESKTOP handlers: every change commits immediately to the URL ----

  const applyToUrl = (updated: FilterState) => {
    updateParams(buildParamsPayload(updated));
  };

  const desktopTogglePropertyType = (type: string) => {
    setFilters((prev) => {
      const updated =
        type === "Any Type"
          ? { ...prev, propertyTypes: [] }
          : (() => {
              const exists = prev.propertyTypes.includes(type);
              const next = exists
                ? prev.propertyTypes.filter((t) => t !== type)
                : [...prev.propertyTypes, type];
              return { ...prev, propertyTypes: next };
            })();
      applyToUrl(updated);
      return updated;
    });
  };

  const desktopToggleStatus = (status: string) => {
    setFilters((prev) => {
      const exists = prev.status.includes(status);
      const updated = {
        ...prev,
        status: exists
          ? prev.status.filter((s) => s !== status)
          : [...prev.status, status],
      };
      applyToUrl(updated);
      return updated;
    });
  };

  const desktopCountiesChange = (counties: string[]) => {
    setFilters((prev) => {
      const updated = { ...prev, counties };
      applyToUrl(updated);
      return updated;
    });
  };

  // Called by PriceRangeField only after its internal 500ms debounce
  // settles (or immediately on outside-click flush) — no debouncing
  // needed here, it's already handled inside the field itself.
  const desktopPriceChange = (
    field: "minPrice" | "maxPrice",
    value: string,
  ) => {
    setFilters((prev) => {
      const updated = { ...prev, [field]: value };
      applyToUrl(updated);
      return updated;
    });
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setDraftFilters(EMPTY_FILTERS);
    updateParams(buildParamsPayload(EMPTY_FILTERS));
  };

  // ---- MOBILE (draft) handlers: only touch local draft state ----

  const draftTogglePropertyType = (type: string) => {
    setDraftFilters((prev) =>
      type === "Any Type"
        ? { ...prev, propertyTypes: [] }
        : (() => {
            const exists = prev.propertyTypes.includes(type);
            const next = exists
              ? prev.propertyTypes.filter((t) => t !== type)
              : [...prev.propertyTypes, type];
            return { ...prev, propertyTypes: next };
          })(),
    );
  };

  const draftToggleStatus = (status: string) => {
    setDraftFilters((prev) => {
      const exists = prev.status.includes(status);
      return {
        ...prev,
        status: exists
          ? prev.status.filter((s) => s !== status)
          : [...prev.status, status],
      };
    });
  };

  const draftCountiesChange = (counties: string[]) => {
    setDraftFilters((prev) => ({ ...prev, counties }));
  };

  const draftPriceChange = (field: "minPrice" | "maxPrice", value: string) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    setFilters(draftFilters);
    updateParams(buildParamsPayload(draftFilters));
    setSheetOpen(false);
  };

  const handleClearDraft = () => {
    setDraftFilters(EMPTY_FILTERS);
  };

  const handleSheetOpenChange = (open: boolean) => {
    if (open) setDraftFilters(filters);
    setSheetOpen(open);
  };

  const propertyTypeSummary =
    filters.propertyTypes.length === 0
      ? "Any Type"
      : filters.propertyTypes.length === 1
        ? filters.propertyTypes[0]
        : `${filters.propertyTypes.length} selected`;

  const statusSummary =
    filters.status.length === 0
      ? "Any"
      : filters.status.length === 1
        ? filters.status[0]
        : `${filters.status.length} selected`;

  const ClearButton = ({
    onClick,
    visible,
  }: {
    onClick: () => void;
    visible: boolean;
  }) => {
    if (!visible) return null;
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-center gap-1 rounded-full border border-[#E0E3E5] py-2.5 text-sm font-semibold text-primary-gray hover:text-primary-black hover:bg-[#F2F4F6] transition-colors cursor-pointer"
      >
        <X className="size-3.5" />
        Clear Filters
      </button>
    );
  };

  const CountyField = ({
    value,
    onChange,
  }: {
    value: FilterState;
    onChange: (counties: string[]) => void;
  }) => (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-semibold text-[#1F2937] uppercase tracking-wider">
        County
      </label>
      <CountySelector
        selectedCounties={value.counties}
        onCountiesChange={onChange}
      />
    </div>
  );

  const PropertyTypeField = ({
    value,
    onToggle,
  }: {
    value: FilterState;
    onToggle: (type: string) => void;
  }) => (
    <div className="mb-6">
      <label className="mb-3 block text-sm font-medium text-[#594139]">
        Property type
      </label>
      <div className="space-y-3">
        {PROPERTY_TYPES.map((type) => {
          const checked =
            type === "Any Type"
              ? value.propertyTypes.length === 0
              : value.propertyTypes.includes(type);
          return (
            <label
              key={type}
              className="flex items-center gap-3 cursor-pointer"
            >
              <button
                type="button"
                onClick={() => onToggle(type)}
                className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                  checked
                    ? "bg-primary-color border-primary-color"
                    : "bg-white border-gray-300"
                }`}
              >
                {checked && <Check className="h-3.5 w-3.5 text-white" />}
              </button>
              <span className="text-primary-black">{type}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  const StatusField = ({
    value,
    onToggle,
  }: {
    value: FilterState;
    onToggle: (status: string) => void;
  }) => (
    <div className="mb-6">
      <label className="mb-3 block text-sm font-medium text-[#594139]">
        Status
      </label>
      <div className="space-y-3">
        {STATUS_OPTIONS.map((status) => {
          const checked = value.status.includes(status);
          return (
            <label
              key={status}
              className="flex items-center gap-3 cursor-pointer"
            >
              <button
                type="button"
                onClick={() => onToggle(status)}
                className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                  checked
                    ? "bg-primary-color border-primary-color"
                    : "bg-white border-gray-300"
                }`}
              >
                {checked && <Check className="h-3.5 w-3.5 text-white" />}
              </button>
              <span className="text-sm text-primary-black">{status}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  const ApplyButton = () => (
    <button
      type="button"
      onClick={handleApplyFilters}
      className="w-full cursor-pointer rounded-full bg-primary-color px-6 py-3 text-center font-semibold text-white hover:bg-[#011939] transition-colors"
    >
      Apply Filters
    </button>
  );

  const MobileFilterTrigger = (
    <div className="lg:hidden">
      <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open filters"
                  className="flex h-10 w-10 mb-2 cursor-pointer items-center justify-center rounded-md border border-[#E0E3E5] bg-white"
                >
                  <SlidersHorizontal size={18} color="#565E74" />
                </button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filter Options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-sm flex flex-col"
        >
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-primary-black">
              Filters
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 px-4 pb-6 flex-1">
            <CountyField value={draftFilters} onChange={draftCountiesChange} />
            <PropertyTypeField
              value={draftFilters}
              onToggle={draftTogglePropertyType}
            />
            <PriceRangeField
              minPrice={draftFilters.minPrice}
              maxPrice={draftFilters.maxPrice}
              onChange={draftPriceChange}
              layout={layout}
            />
            <StatusField value={draftFilters} onToggle={draftToggleStatus} />
          </div>
          {/* Bottom action area */}
          <div className="px-4 pb-6 space-y-3 border-t border-[#E0E3E5] pt-4">
            <ApplyButton />
            <ClearButton
              onClick={handleClearDraft}
              visible={hasActiveFilters(draftFilters)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  if (layout === "horizontal") {
    return (
      <>
        {MobileFilterTrigger}
        <div
          ref={containerRef}
          className="hidden w-full border-none bg-[#E9E9E9] px-4 pt-4 pb-1 lg:block"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-start">
            {/* County */}
            <div className="flex-1 min-w-0">
              <label className="mb-2 block text-xs font-semibold text-text-primary-gray uppercase tracking-wider">
                County
              </label>
              <CountySelector
                selectedCounties={filters.counties}
                onCountiesChange={desktopCountiesChange}
                className="border-none rounded-lg bg-[#F3F4F6]"
              />
            </div>

            {/* Property Type */}
            <div className="relative flex-1 min-w-0">
              <label className="mb-2 block text-xs font-semibold text-text-primary-gray uppercase tracking-wider">
                Property Type
              </label>
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === "propertyTypes" ? null : "propertyTypes",
                  )
                }
                className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#F3F4F6] px-4 py-2.5 text-left text-sm font-medium text-primary-black"
              >
                <span className="truncate">{propertyTypeSummary}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-text-primary-gray transition-transform duration-200 ${
                    openDropdown === "propertyTypes" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openDropdown === "propertyTypes" && (
                <div className="absolute left-0 top-full z-20 mt-2 w-56 rounded-xl border border-[#E0E3E5] bg-white p-3 shadow-lg">
                  <div className="space-y-3">
                    {PROPERTY_TYPES.map((type) => {
                      const checked =
                        type === "Any Type"
                          ? filters.propertyTypes.length === 0
                          : filters.propertyTypes.includes(type);
                      return (
                        <label
                          key={type}
                          className="flex cursor-pointer items-center gap-3"
                        >
                          <button
                            type="button"
                            onClick={() => desktopTogglePropertyType(type)}
                            className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                              checked
                                ? "bg-primary-color border-primary-color"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {checked && (
                              <Check className="h-3.5 w-3.5 text-white" />
                            )}
                          </button>
                          <span className="text-sm text-primary-black">
                            {type}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="relative flex-1 min-w-0">
              <PriceRangeField
                minPrice={filters.minPrice}
                maxPrice={filters.maxPrice}
                onChange={desktopPriceChange}
                layout={layout}
              />
            </div>

            {/* Status */}
            <div className="relative flex-1 min-w-0">
              <label className="mb-2 block text-xs font-semibold text-text-primary-gray uppercase tracking-wider">
                Status
              </label>
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === "status" ? null : "status",
                  )
                }
                className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#F3F4F6] px-4 py-2.5 text-left text-sm font-medium text-primary-black"
              >
                <span className="truncate">{statusSummary}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-text-primary-gray transition-transform duration-200 ${
                    openDropdown === "status" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openDropdown === "status" && (
                <div className="absolute left-0 top-full z-20 mt-2 w-56 rounded-xl border border-[#E0E3E5] bg-white p-3 shadow-lg">
                  <div className="space-y-3">
                    {STATUS_OPTIONS.map((status) => {
                      const checked = filters.status.includes(status);
                      return (
                        <label
                          key={status}
                          className="flex cursor-pointer items-center gap-3"
                        >
                          <button
                            type="button"
                            onClick={() => desktopToggleStatus(status)}
                            className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                              checked
                                ? "bg-primary-color border-primary-color"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {checked && (
                              <Check className="h-3.5 w-3.5 text-white" />
                            )}
                          </button>
                          <span className="text-sm text-primary-black">
                            {status}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clear — bottom of the panel, only visible once a filter is active */}
          <div className="mt-4">
            <ClearButton
              onClick={clearFilters}
              visible={hasActiveFilters(filters)}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {MobileFilterTrigger}
      <div className="hidden w-full max-w-sm rounded-2xl border border-[#E0E3E5] bg-white p-6 lg:block">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-primary-black">Filters</h2>
          <ListFilter color="#565E74" size={18} />
        </div>

        <CountyField value={filters} onChange={desktopCountiesChange} />
        <PropertyTypeField
          value={filters}
          onToggle={desktopTogglePropertyType}
        />
        <PriceRangeField
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onChange={desktopPriceChange}
        />
        <StatusField value={filters} onToggle={desktopToggleStatus} />

        {/* Clear — bottom of the card, only visible once a filter is active */}
        <ClearButton
          onClick={clearFilters}
          visible={hasActiveFilters(filters)}
        />
      </div>
    </>
  );
}
