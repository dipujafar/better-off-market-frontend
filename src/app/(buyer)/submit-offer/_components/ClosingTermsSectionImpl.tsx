"use client";

import { memo } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSectionCard } from "./FormSectionCard";
import {
  POSSESSION_OPTIONS,
  type OfferFormValues,
} from "@/lib/validations/offer-form";
import { CalendarIcon } from "lucide-react";

function ClosingTermsSectionImpl() {
  const { control } = useFormContext<OfferFormValues>();

  return (
    <FormSectionCard title="Closing Terms">
      <FormField
        control={control}
        name="titleCompany"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-primary-gray">Title company</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter company name" className="border border-primary-border-color bg-[#F2F4F6] py-5.5" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="closingDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-primary-gray">Closing date</FormLabel>
            <FormControl>
              <div className="relative">
                <Input {...field} type="date" className="border border-primary-border-color bg-[#F2F4F6] py-5.5" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="possession"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-primary-gray">Possession</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="border border-primary-border-color bg-[#F2F4F6] py-5.5 w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="text-lg p-2 space-y-2">
                {POSSESSION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sellerPostClosingDays"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-primary-gray">Seller post-closing occupancy (number of days)</FormLabel>
            <FormControl>
              <Input {...field} type="number" inputMode="numeric" min="0" className="border border-primary-border-color bg-[#F2F4F6] py-5.5" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSectionCard>
  );
}

export const ClosingTermsSection = memo(ClosingTermsSectionImpl);