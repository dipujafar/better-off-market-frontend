import type { InputHTMLAttributes, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  registration?: UseFormRegisterReturn;
  tooltip?: ReactNode;
  extraClassName?: string;
}

export function TextField({
  label,
  required,
  error,
  registration,
  tooltip,
  className,
  extraClassName,
  ...props
}: TextFieldProps) {
  return (
    <div className={cn("w-full", extraClassName)}>
      {label && (
        <Label className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-primary-black">
          {label}
          {required && <span className="text-red-500">*</span>}
          {tooltip}
        </Label>
      )}
      <Input
        {...registration}
        {...props}
        className={`bg-[#F2F4F6] py-5 rounded-md ${error ? "border-red-400" : "border-[#E2E8F0]"} ${
          className ?? ""
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
