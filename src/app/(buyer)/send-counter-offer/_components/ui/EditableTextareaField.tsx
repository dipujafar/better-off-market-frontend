import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { OriginalHint } from "./OriginalHint";

interface EditableTextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  originalValue: string;
  placeholder?: string;
  disabled?: boolean;
}

export function EditableTextareaField<T extends FieldValues>({
  control,
  name,
  label,
  originalValue,
  placeholder,
  disabled,
}: EditableTextareaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#594139] font-semibold">{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              className="min-h-10.5 resize-none   border border-primary-border-color bg-[#F2F4F6]"

            />
          </FormControl>
          <OriginalHint value={originalValue} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
