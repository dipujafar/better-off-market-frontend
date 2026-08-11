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
    <Dialog open={open} onOpenChange={onOpenChange} >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className={cn("sm:max-w-md rounded-md py-5", className)} showCloseButton={false} >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary-color">{title}</DialogTitle>
          {description && <DialogDescription className="text-gray-700 text-sm">{description}</DialogDescription>}
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
                  className={cn("cursor-pointer rounded-md",
                    action?.variant !== "destructive"
                      ? action?.variant !== "outline"
                        ? "bg-primary-color text-white"
                        : "border-primary-color/40"
                      : "",
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
