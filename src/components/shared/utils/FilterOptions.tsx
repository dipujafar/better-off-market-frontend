"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, DollarSign, ListFilter, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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

interface FilterState {
  counties: string[];
  propertyTypes: string[];
  minPrice: string;
  maxPrice: string;
  status: string[];
}

type FilterKey = "propertyTypes" | "status";

const PROPERTY_TYPES = ["Any Type", "Residential", "Multi-Family", "Commercial", "Land"];
const STATUS_OPTIONS = ["Active", "Under Contract"];

interface FilterOptionsProps {
  layout?: "vertical" | "horizontal";
}

export default function FilterOptions({ layout = "vertical" }: FilterOptionsProps) {
  const [filters, setFilters] = useState<FilterState>({
    counties: [],
    propertyTypes: ["Any Type"],
    minPrice: "",
    maxPrice: "",
    status: ["Active"],
  });

  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (layout !== "horizontal") return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [layout]);

  const togglePropertyType = (type: string) => {
    setFilters((prev) => {
      if (type === "Any Type") {
        return { ...prev, propertyTypes: ["Any Type"] };
      }
      const withoutAny = prev.propertyTypes.filter((t) => t !== "Any Type");
      const exists = withoutAny.includes(type);
      const updated = exists
        ? withoutAny.filter((t) => t !== type)
        : [...withoutAny, type];
      return { ...prev, propertyTypes: updated.length ? updated : ["Any Type"] };
    });
  };

  const toggleStatus = (status: string) => {
    setFilters((prev) => {
      const exists = prev.status.includes(status);
      return {
        ...prev,
        status: exists
          ? prev.status.filter((s) => s !== status)
          : [...prev.status, status],
      };
    });
  };

  const handleMinPriceChange = (value: string) => {
    setFilters((prev) => ({ ...prev, minPrice: value }));
  };

  const handleMaxPriceChange = (value: string) => {
    setFilters((prev) => ({ ...prev, maxPrice: value }));
  };

  const handleApplyFilters = () => {
    console.log("Applied filters:", filters);
    setSheetOpen(false);
  };

  const propertyTypeSummary =
    filters.propertyTypes.includes("Any Type") || filters.propertyTypes.length === 0
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

  const priceSummary =
    filters.minPrice || filters.maxPrice
      ? `$${filters.minPrice || "0"} - $${filters.maxPrice || "Any"}`
      : "Any Price";

  // Shared field blocks (used inside the vertical card AND inside the mobile sheet)
  const CountyField = () => (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-semibold text-[#1F2937] uppercase tracking-wider">
        County
      </label>
      <CountySelector
        selectedCounties={filters.counties}
        onCountiesChange={(counties) =>
          setFilters((prev) => ({ ...prev, counties }))
        }
      />
    </div>
  );

  const PropertyTypeField = () => (
    <div className="mb-6">
      <label className="mb-3 block text-sm font-medium text-[#594139]">
        Property type
      </label>
      <div className="space-y-3">
        {PROPERTY_TYPES.map((type, index) => {
          const checked = filters.propertyTypes.includes(type);
          return (
            <motion.label
              key={type}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.15 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => togglePropertyType(type)}
                animate={{
                  backgroundColor: checked ? "#00214C" : "#ffffff",
                  borderColor: checked ? "#00214C" : "#d1d5db",
                }}
                transition={{ duration: 0.15 }}
                className="flex h-5 w-5 items-center justify-center rounded border"
              >
                <AnimatePresence>
                  {checked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check className="h-3.5 w-3.5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <span className=" text-primary-black">{type}</span>
            </motion.label>
          );
        })}
      </div>
    </div>
  );

  const PriceField = () => (
    <div className="mb-6">
      <label className="mb-3 block text-sm font-medium text-[#594139]">
        Price range
      </label>
      <div className="space-y-3">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary-gray" />
          <input
            type="number"
            inputMode="numeric"
            value={filters.minPrice}
            onChange={(e) => handleMinPriceChange(e.target.value)}
            placeholder="Min Price"
            className="w-full rounded-lg bg-[#F2F4F6] py-2.5 pl-9 pr-3 text-sm text-primary-black placeholder:text-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-color/20 border border-[#E2BFB54D] "
          />
        </div>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary-gray" />
          <input
            type="number"
            inputMode="numeric"
            value={filters.maxPrice}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            placeholder="Max Price"
            className="w-full rounded-lg bg-[#F2F4F6] py-2.5 pl-9 pr-3 text-sm text-primary-black placeholder:text-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-color/20 border border-[#E2BFB54D]"
          />
        </div>
      </div>
    </div>
  );

  const StatusField = () => (
    <div className="mb-6">
      <label className="mb-3 block text-sm font-medium text-[#594139]">
        Status
      </label>
      <div className="space-y-3">
        {STATUS_OPTIONS.map((status, index) => {
          const checked = filters.status.includes(status);
          return (
            <motion.label
              key={status}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.15 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleStatus(status)}
                animate={{
                  backgroundColor: checked ? "#00214C" : "#ffffff",
                  borderColor: checked ? "#00214C" : "#d1d5db",
                }}
                transition={{ duration: 0.15 }}
                className="flex h-5 w-5 items-center justify-center rounded border"
              >
                <AnimatePresence>
                  {checked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check className="h-3.5 w-3.5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <span className="text-sm text-primary-black">{status}</span>
            </motion.label>
          );
        })}
      </div>
    </div>
  );

  const ApplyButton = () => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleApplyFilters}
      className="w-full cursor-pointer rounded-full bg-primary-color px-6 py-3 text-center font-semibold text-white hover:bg-[#011939] transition-colors duration-500"
    >
      Apply Filters
    </motion.button>
  );

  // Mobile: icon-only trigger + shadcn Sheet. Used regardless of the `layout` prop.
  const MobileFilterTrigger = (
    <div className="lg:hidden">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-primary-black">
              Filters
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 px-4 pb-6">
            <CountyField />
            <PropertyTypeField />
            <PriceField />
            <StatusField />
            <ApplyButton />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  if (layout === "horizontal") {
    return (
      <>
        {MobileFilterTrigger}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="hidden w-full border-none bg-[#E9E9E9] p-4 lg:block"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            {/* County */}
            <div className="flex-1 min-w-0">
              <label className="mb-2 block text-xs font-semibold text-text-primary-gray uppercase tracking-wider">
                County
              </label>
              <CountySelector
                selectedCounties={filters.counties}
                onCountiesChange={(counties) =>
                  setFilters((prev) => ({ ...prev, counties }))
                }
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
                  setOpenDropdown((prev) => (prev === "propertyTypes" ? null : "propertyTypes"))
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
              <AnimatePresence>
                {openDropdown === "propertyTypes" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full z-20 mt-2 w-56 rounded-xl border border-[#E0E3E5] bg-white p-3 shadow-lg"
                  >
                    <div className="space-y-3">
                      {PROPERTY_TYPES.map((type) => {
                        const checked = filters.propertyTypes.includes(type);
                        return (
                          <label
                            key={type}
                            className="flex cursor-pointer items-center gap-3"
                          >
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.9 }}
                              onClick={() => togglePropertyType(type)}
                              animate={{
                                backgroundColor: checked ? "#00214C" : "#ffffff",
                                borderColor: checked ? "#00214C" : "#d1d5db",
                              }}
                              transition={{ duration: 0.15 }}
                              className="flex h-5 w-5 items-center justify-center rounded border"
                            >
                              <AnimatePresence>
                                {checked && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                  >
                                    <Check className="h-3.5 w-3.5 text-white" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                            <span className="text-sm text-primary-black">{type}</span>
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price */}
            <div className="relative flex-1 min-w-0">
              <label className="mb-2 block text-xs font-semibold text-text-primary-gray uppercase tracking-wider">
                Price range
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 min-w-0">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#565E74]" />
                  <input
                    type="number"
                    inputMode="numeric"
                    value={filters.minPrice}
                    onChange={(e) => handleMinPriceChange(e.target.value)}
                    placeholder="Min"
                    className="w-full rounded-lg bg-[#F3F4F6] py-2.5 pl-8 pr-2 text-sm text-primary-black placeholder:text-[#565E74] focus:outline-none focus:ring-2 focus:ring-[#00214C]/20"
                  />
                </div>
                <div className="relative flex-1 min-w-0">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#565E74]" />
                  <input
                    type="number"
                    inputMode="numeric"
                    value={filters.maxPrice}
                    onChange={(e) => handleMaxPriceChange(e.target.value)}
                    placeholder="Max"
                    className="w-full rounded-lg bg-[#F3F4F6] py-2.5 pl-8 pr-2 text-sm text-primary-black placeholder:text-[#565E74] focus:outline-none focus:ring-2 focus:ring-[#00214C]/20"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="relative flex-1 min-w-0">
              <label className="mb-2 block text-xs font-semibold text-text-primary-gray uppercase tracking-wider">
                Status
              </label>
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((prev) => (prev === "status" ? null : "status"))
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
              <AnimatePresence>
                {openDropdown === "status" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full z-20 mt-2 w-56 rounded-xl border border-[#E0E3E5] bg-white p-3 shadow-lg"
                  >
                    <div className="space-y-3">
                      {STATUS_OPTIONS.map((status) => {
                        const checked = filters.status.includes(status);
                        return (
                          <label
                            key={status}
                            className="flex cursor-pointer items-center gap-3"
                          >
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleStatus(status)}
                              animate={{
                                backgroundColor: checked ? "#00214C" : "#ffffff",
                                borderColor: checked ? "#00214C" : "#d1d5db",
                              }}
                              transition={{ duration: 0.15 }}
                              className="flex h-5 w-5 items-center justify-center rounded border"
                            >
                              <AnimatePresence>
                                {checked && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                  >
                                    <Check className="h-3.5 w-3.5 text-white" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                            <span className="text-sm text-primary-black">{status}</span>
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      {MobileFilterTrigger}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="hidden w-full max-w-sm rounded-2xl border border-[#E0E3E5] bg-white p-6 md:block"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-primary-black">Filters</h2>
          <motion.div whileHover={{ rotate: 20 }} transition={{ duration: 0.2 }}>
            <ListFilter color="#565E74" size={18} />
          </motion.div>
        </div>

        <CountyField />
        <PropertyTypeField />
        <PriceField />
        <StatusField />
        <ApplyButton />
      </motion.div>
    </>
  );
}