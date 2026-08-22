"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Flag, Loader2, OctagonAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Both fields are required — subject is a short label, description holds the detail
const reportSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(120, "Subject must be under 120 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Please provide a bit more detail (min 10 characters)")
    .max(2000, "Description must be under 2000 characters"),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportSellerDialogProps {
  sellerId: string;
  sellerName?: string;
  trigger?: React.ReactNode;
  onSubmitReport?: (
    data: ReportFormData & { sellerId: string },
  ) => Promise<void>;
}

export default function ReportSellerDialog({
  sellerId,
  sellerName,
  trigger,
  onSubmitReport,
}: ReportSellerDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  const onSubmit = async (data: ReportFormData) => {
    try {
      if (onSubmitReport) {
        await onSubmitReport({ ...data, sellerId });
      } else {
        console.log("Report submitted:", { ...data, sellerId });
      }
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to submit report:", error);
      alert("Failed to submit report. Please try again.");
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    // Don't allow closing mid-submit, and reset the form on every close
    if (isSubmitting) return;
    if (!nextOpen) reset();
    setOpen(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <div className="flex items-center text-[#BA1A1A] gap-1 text-xl cursor-pointer">
            <OctagonAlert size="20" /> Report this seller
          </div>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Report {sellerName ? sellerName : "this seller"}
          </DialogTitle>
          <DialogDescription>
            Let us know if this seller has violated our terms of service or
            engaged in abusive or violent behavior. Our team will review every
            report.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g. Threatening messages, fraud, fake listing"
              className="bg-gray-100 py-5"
              aria-invalid={!!errors.subject}
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={8}
              placeholder="Describe what happened, including dates, messages, or any other relevant details."
              className="resize-none bg-gray-100 h-32"
              aria-invalid={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              className="px-5 py-4.5 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-4.5 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit report"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
