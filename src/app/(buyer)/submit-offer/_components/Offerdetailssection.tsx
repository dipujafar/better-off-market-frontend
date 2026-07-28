"use client";

import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormSectionCard } from "./FormSectionCard";
import { CurrencyFormField } from "./CurrencyFormField";
import { FINANCING_TYPES, type OfferFormValues } from "@/lib/validations/offer-form";

function OfferDetailsSectionImpl() {
  const { control } = useFormContext<OfferFormValues>();

  // Scoped watch: only this section re-renders when financingType changes,
  // not the whole form.
  const financingType = useWatch({ control, name: "financingType" });
  const isCash = financingType === "cash" || !financingType;

  return (
    <FormSectionCard title="Offer Details">
      <CurrencyFormField control={control} name="offerAmount" label="Offer amount ($)" />
      <CurrencyFormField control={control} name="earnestMoney" label="Earnest money ($)" />

      <FormField
        control={control}
        name="financingType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base text-primary-gray font-medium">Financing type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="border border-primary-border-color bg-[#F2F4F6] py-5.5 w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="text-lg p-2 space-y-2">
                {FINANCING_TYPES.map((option) => (
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
        name="financingTerms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base text-primary-gray font-medium">If not cash, explain terms</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                disabled={isCash}
                placeholder="Describe financing terms..."
                className="min-h-11.25 resize-none border border-primary-border-color bg-[#F2F4F6] "
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSectionCard>
  );
}

// Memoized: this section has no props, so it only ever re-renders due to
// its own RHF subscriptions (formState/useWatch), never because a sibling
// section's state changed.
export const OfferDetailsSection = memo(OfferDetailsSectionImpl);