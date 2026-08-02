import type { TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
  registration?: UseFormRegisterReturn;
  className?: string;
  extraClassName?: string;
}

export function TextareaField({
  label,
  required,
  error,
  registration,
  className,
  extraClassName,
  ...props
}: TextareaFieldProps) {
  return (
    <div className={cn("w-full", extraClassName)}>
      {label && (
        <Label className="mb-1.5 flex items-center gap-1 text-sm font-bold text-primary-black">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Textarea
        {...registration}
        {...props}
        className={`bg-gray-100 ${error ? "border-red-400" : "border-gray-200"} ${
          className ?? ""
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
