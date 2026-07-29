"use client";
import { useFormContext } from "react-hook-form";
import { TextField } from "../form-fields/TextField";
import { SelectField } from "../form-fields/SelectField";
import { CalendarIcon } from "@/icons";
import type { PropertyListingFormValues } from "@/lib/validations/property-listing.schema";
import { CLOSING_DATE_OPTIONS } from "../config/property-type.config";

export function ClosingPreferencesSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PropertyListingFormValues>();

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-2">
        <CalendarIcon className="text-primary-blue" />
        <h2 className="text-lg font-semibold text-primary-black">
          Closing Preferences
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Title Company"
          placeholder="Preferred Title Co."
          registration={register("titleCompany")}
        />
        <SelectField
          label="Closing Date"
          required
          name="closingDate"
          control={control}
          options={CLOSING_DATE_OPTIONS}
          error={errors.closingDate?.message}
        />
      </div>
    </section>
  );
}
