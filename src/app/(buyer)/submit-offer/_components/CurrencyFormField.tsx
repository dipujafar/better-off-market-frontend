"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CurrencyFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * $-prefixed numeric input. Generic over the form's value type so it can be
 * reused for offer amount, earnest money, seller contribution, etc. without
 * duplicating the markup each time.
 */
export function CurrencyFormField<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  placeholder = "0.00",
}: CurrencyFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base text-primary-gray font-medium">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                {...field}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                disabled={disabled}
                placeholder={placeholder}
                className="pl-7 border border-primary-border-color bg-[#F2F4F6] py-5.5"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
