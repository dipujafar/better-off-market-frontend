import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OriginalHint } from "./OriginalHint";

interface EditableTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  originalValue: string;
  type?: "text" | "number" | "date";
  placeholder?: string;
  step?: string;
}

export function EditableTextField<T extends FieldValues>({
  control,
  name,
  label,
  originalValue,
  type = "text",
  placeholder,
  step,
}: EditableTextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-primary-gray font-medium">{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} step={step} min={type === "number" ? "0" : undefined}
            className="border border-primary-border-color bg-[#F2F4F6] py-5"/>
          </FormControl>
          <OriginalHint value={originalValue} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
