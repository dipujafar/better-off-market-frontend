"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DropdownLink {
  label: string;
  path: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownLink[];
  onSelect?: () => void;
}

export default function NavDropdown({ label, items, onSelect }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const activeItem = items.find((item) => pathname === item.path);
  const isActive = !!activeItem;
  const displayLabel = activeItem?.label ?? label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors cursor-pointer",
          isActive ? "text-white" : "text-white/80 hover:text-white",
        )}
      >
        {displayLabel}
        <span
          className={cn(
            "inline-block h-0 w-0 border-x-4 border-x-transparent border-t-[6px] border-t-current opacity-70 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {items.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => {
                setIsOpen(false);
                onSelect?.();
              }}
              className={cn(
                "block px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50",
                pathname === item.path && "font-semibold text-primary-color",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}