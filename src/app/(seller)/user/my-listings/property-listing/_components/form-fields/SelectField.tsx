import type { ReactNode } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SelectFieldOption } from "../config/property-type.config";
import { cn } from "@/lib/utils";

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
  error?: string;
  options: SelectFieldOption[];
  placeholder?: string;
  disabled?: boolean;
  tooltip?: ReactNode;
  className?: string;
}

/**
 * Wraps shadcn's Select (a Radix primitive, not a native <select>),
 * so it must be driven via Controller rather than register().
 */
export function SelectField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  required,
  error,
  options,
  placeholder = "Select",
  disabled,
  tooltip,
  className
}: SelectFieldProps<TFieldValues>) {
  console.log(className)
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-primary-black">
          {label}
          {required && <span className="text-red-500">*</span>}
          {tooltip}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={`w-full bg-[#F2F4F6] py-5 rounded-md ${error ? "border-red-400" : "border-[#E2E8F0]"}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="p-2">
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="cursor-pointer text-sm">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
