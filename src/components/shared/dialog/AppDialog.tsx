"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DialogAction {
  label: string;
  onClick: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
  className?: string;
}

interface AppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  actions?: DialogAction[];
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  actions = [],
  trigger,
  children,
  className,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        className={cn("sm:max-w-lg rounded-md pb-5 pt-10 text-primary-color", className)}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold  text-center">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-gray-700  text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children && <div className="py-2">{children}</div>}

        {actions.length > 0 && (
          <DialogFooter className="sm:justify-start">
            <div className="flex justify-end w-full gap-2">
              {actions.map((action, i) => (
                <Button
                  key={i}
                  variant={action.variant ?? "default"}
                  disabled={action.disabled}
                  onClick={action.onClick}
                  size="lg"
                  className={cn(
                    "cursor-pointer rounded-md px-5",
                    action?.variant !== "destructive"
                      ? action?.variant !== "outline"
                        ? "bg-primary-color text-white"
                        : "border-primary-color/40"
                      : "",
                      action?.className
                  )}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
