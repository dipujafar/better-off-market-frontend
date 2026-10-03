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
  placeholder = "0",
}: CurrencyFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base text-primary-gray font-medium">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                {...field}
                type="text"
                inputMode="numeric"
                disabled={disabled}
                placeholder={placeholder}
                className="pl-7 border border-primary-border-color bg-[#F2F4F6] py-5.5"
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown",
                    "Tab",
                    "Home",
                    "End",
                  ];

                  if (allowedKeys.includes(e.key)) return;

                  if (
                    (e.ctrlKey || e.metaKey) &&
                    ["a", "c", "v", "x"].includes(e.key.toLowerCase())
                  ) {
                    return;
                  }

                  // Block everything that isn't a digit (no "." allowed at all)
                  if (!/^[0-9]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  // Strip out anything that isn't a digit (handles paste too)
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(value);
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
