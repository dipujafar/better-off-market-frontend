import type { Control, FieldPath, FieldValues } from "react-hook-form";
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
import { OriginalHint } from "./OriginalHint";

interface EditableSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  originalValue: string;
  options: ReadonlyArray<{ value: string; label: string }>;
}

export function EditableSelectField<T extends FieldValues>({
  control,
  name,
  label,
  originalValue,
  options,
}: EditableSelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-primary-gray font-medium">{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="border border-primary-border-color bg-[#F2F4F6] py-5 w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="p-2">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <OriginalHint value={originalValue} /> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
