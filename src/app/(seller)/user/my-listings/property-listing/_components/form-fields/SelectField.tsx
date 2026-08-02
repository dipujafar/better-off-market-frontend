// SelectField.tsx
import type { ReactNode } from "react";
import {
  Controller,
  useWatch,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
  /** value that should reveal a free-text input below the select (defaults to "Other") */
  otherTriggerValue?: string;
}

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
  className,
  otherTriggerValue = "Other",
}: SelectFieldProps<TFieldValues>) {
  const selectedValue = useWatch({ control, name });
  const hasOtherOption = options.some((opt) => opt.value === otherTriggerValue);
  const showOtherInput = hasOtherOption && selectedValue === otherTriggerValue;
  // @ts-ignore - dynamic sibling field name, e.g. "roofMaterial" -> "roofMaterialOther"
  const otherFieldName = `${name}Other` as Path<TFieldValues>;

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

      {showOtherInput && (
        <Controller
          name={otherFieldName}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? ""}
              placeholder="Please specify"
              className="mt-2 w-full bg-[#F2F4F6] py-5 rounded-md border-[#E2E8F0]"
            />
          )}
        />
      )}
    </div>
  );
}