"use client";

import { memo } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FormSectionCard } from "./FormSectionCard";
import type { OfferFormValues } from "@/lib/validations/offer-form";

interface SingleTextareaSectionProps {
  title: string;
  name: "additionalTerms" | "notesToSeller";
  placeholder: string;
}

function SingleTextareaSectionImpl({
  title,
  name,
  placeholder,
}: SingleTextareaSectionProps) {
  const { control } = useFormContext<OfferFormValues>();

  return (
    <FormSectionCard title={title}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormControl>
              <Textarea {...field} placeholder={placeholder} className="min-h-35 bg-[#F2F4F6] border border-primary-border-color rounded-lg" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSectionCard>
  );
}

export const SingleTextareaSection = memo(SingleTextareaSectionImpl);