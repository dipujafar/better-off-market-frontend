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
import { FormSectionCard } from "./FormSectionCard";
import { CurrencyFormField } from "./CurrencyFormField";
import {
  CLOSING_COST_OPTIONS,
  type OfferFormValues,
} from "@/lib/validations/offer-form";

function SellerConcessionsSectionImpl() {
  const { control } = useFormContext<OfferFormValues>();
  const closingCostOption = useWatch({ control, name: "closingCostOption" });
  const isRequesting = closingCostOption === "requested";

  return (
    <FormSectionCard title="Seller Concessions">
      <FormField
        control={control}
        name="closingCostOption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Closing costs</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="border border-primary-border-color bg-[#F2F4F6] py-5.5 w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="text-lg p-2 space-y-2">
                {CLOSING_COST_OPTIONS.map((option) => (
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

      <CurrencyFormField
        control={control}
        name="sellerContribution"
        label="Seller contribution ($)"
        disabled={!isRequesting}
      />
    </FormSectionCard>
  );
}

export const SellerConcessionsSection = memo(SellerConcessionsSectionImpl);
