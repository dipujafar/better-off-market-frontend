"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface RadioCardOption {
  value: string;
  title: string;
  subtitle?: string;
}

interface RadioCardGroupProps {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: [RadioCardOption, RadioCardOption];
  disabled?: boolean;
}

/**
 * Two-up card-style radio picker, e.g.
 *   ( Yes — inspection required )   ( No — waiving inspection )
 *   ( Standard 7-10 day window   )   ( Strengthens offer position )
 *
 * Pure/controlled component: it only re-renders when `value` changes,
 * so wiring it up with react-hook-form's <Controller> keeps every other
 * field in the section from re-rendering on selection.
 */
export function RadioCardGroup({
  name,
  value,
  onChange,
  onBlur,
  options,
  disabled,
}: RadioCardGroupProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        const id = `${name}-${option.value}`;
        return (
          <Label
            key={option.value}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
              "hover:border-primary/50",
              isSelected
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-primary-border-color bg-background"
            )}
          >
            <RadioGroupItem value={option.value} id={id} className="mt-0.5" />
            <span className="flex flex-col gap-0.5">
              <span className=" font-medium text-primary-black mb-1">
                {option.title}
              </span>
              {option.subtitle ? (
                <span className="text-xs text-[#505F76] font-medium">
                  {option.subtitle}
                </span>
              ) : null}
            </span>
          </Label>
        );
      })}
    </RadioGroup>
  );
}