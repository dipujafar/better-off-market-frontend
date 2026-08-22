import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PROPERTY_STATUS = {
  pending: "Pending",
  active: "Active",
  under_contact: "Under Contact",
  sold: "Sold",
  rejected: "Rejected",
} as const;
