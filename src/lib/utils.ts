import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PROPERTY_STATUS = {
  pending: "Pending",
  active: "Active",
  under_contract: "Under Contract",
  sold: "Sold",
  rejected: "Rejected",
} as const;
