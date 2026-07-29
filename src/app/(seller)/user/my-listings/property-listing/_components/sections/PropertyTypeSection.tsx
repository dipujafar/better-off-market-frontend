"use client";
import { Controller, useFormContext } from "react-hook-form";
import { PropertyTypeSelect } from "../form-fields/PropertyTypeSelect";
import type { PropertyListingFormValues } from "@/lib/validations/property-listing.schema";

export function PropertyTypeSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<PropertyListingFormValues>();

  return (
    <section className="rounded-lg border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] p-6">
      <Controller
        name="propertyType"
        control={control}
        render={({ field }) => (
          <PropertyTypeSelect
            value={field.value}
            onChange={field.onChange}
            error={errors.propertyType?.message}
          />
        )}
      />
    </section>
  );
}
