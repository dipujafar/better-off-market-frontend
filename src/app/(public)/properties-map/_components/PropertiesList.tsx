"use client";

import { useEffect, useRef, useState } from "react";
import { List } from "lucide-react";
import { PropertyCard } from "@/components/shared/card/property-card";
import { properties } from "@/data/properties";
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

export default function PropertiesList({ id }: { id: string }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrolledRef = useRef<string | null>(null);

  // Track viewport: "medium and small" = below the md breakpoint (768px)
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Auto-open the sheet only on medium/small screens whenever a selected id comes in via props
  useEffect(() => {
    if (id && isMobile) {
      setSheetOpen(true);
    }
  }, [id, isMobile]);

  // Scroll the selected property into view once it's rendered (desktop and inside the sheet)
  useEffect(() => {
    if (!id || scrolledRef.current === id) return;
    const timeout = setTimeout(() => {
      document
        .getElementById(`property-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      scrolledRef.current = id;
    }, 300);
    return () => clearTimeout(timeout);
  }, [id, sheetOpen]);

  const PropertyGrid = ({
    prioritizeSelected = false,
  }: {
    prioritizeSelected?: boolean;
  }) => {
    const list =
      prioritizeSelected && id
        ? [...properties]
            .sort((a, b) => {
              const aSelected = Number(a.id) === Number(id);
              const bSelected = Number(b.id) === Number(id);
              if (aSelected && !bSelected) return -1;
              if (bSelected && !aSelected) return 1;
              return 0;
            })
            .slice(0, 9)
        : properties.slice(0, 9);

    return (
      <div className="grid grid-cols-1">
        {list.map((property, index) => (
          <div
            key={index}
            className={
              Number(property.id) === Number(id)
                ? "border-2 border-primary-color rounded-md scale-105 duration-300 transform transition-transform mt-4"
                : ""
            }
            id={`property-${property.id}`}
          >
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Mobile / tablet: list icon opens a Sheet with the same content */}
      <div className="lg:hidden px-4 py-2">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open properties list"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#E0E3E5] bg-white"
                  >
                    <List size={18} color="#565E74" />
                  </button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Properties List</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <SheetContent
            side="left"
            className="w-full overflow-y-auto p-0 sm:max-w-md"
          >
            <SheetHeader className="px-4 pt-4">
              <SheetTitle className="text-lg font-semibold">
                Off-Market Opportunities
              </SheetTitle>
            </SheetHeader>
            <div className="max-h-[calc(100vh-96px)] overflow-y-auto px-4 pb-6">
              <PropertyGrid prioritizeSelected />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <div className="hidden max-w-95.75 max-h-[calc(100vh-145px)] overflow-y-auto px-4 lg:block">
        <h1 className="text-2xl font-semibold">Off-Market Opportunities</h1>
        <PropertyGrid />
      </div>
    </>
  );
}
