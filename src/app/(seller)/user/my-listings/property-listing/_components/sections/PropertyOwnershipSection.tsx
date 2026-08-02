"use client";
import { Controller, useFormContext } from "react-hook-form";
import type { PropertyListingFormValues } from "@/lib/validations/property-listing.schema";
import { PropertyOwnershipIcon } from "@/icons";
import { CheckIcon, FileUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PropertyOwnershipSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<PropertyListingFormValues>();

  return (
    <section className="rounded-lg border border-[#E2E8F0]  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] p-6">
      <div className="mb-5 flex items-center gap-2">
        <PropertyOwnershipIcon className="text-primary-blue" />
        <h2 className="text-xl font-semibold text-primary-black">
          Property Ownership<span className="text-red-500">*</span>
        </h2>
      </div>

      <Controller
        name="ownership"
        control={control}
        render={({ field }) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2 items-start">
              {/* Own it */}
              <button
                type="button"
                onClick={() => field.onChange("own")}
                className={`rounded-lg border p-4 text-left transition-colors ${
                  field.value === "own"
                    ? "border-2 border-primary-color bg-[#DBE1FF33]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={`flex size-5 items-center justify-center rounded-full  border ${
                      field.value === "own"
                        ? "border-primary-color bg-primary-color"
                        : "border-[#737686] bg-transparent"
                    }`}
                  >
                    {field.value === "own" && <CheckIcon color="white" className="size-3" />}
                  </span>
                  <span className="font-bold text-sm text-primary-black">
                    I Own This Property
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  You are the primary title holder of this commercial asset.
                </p>
              </button>

              {/* Assignable contract */}
              <button
                type="button"
                onClick={() => field.onChange("assignable")}
                className={`w-full rounded-lg border p-4 text-left transition-colors ${
                  field.value === "assignable"
                    ? "border-2 border-primary-color bg-[#DBE1FF33]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={`flex size-5 items-center justify-center rounded-full  border ${
                      field.value === "assignable"
                        ? "border-primary-color bg-primary-color"
                        : "border-[#737686] bg-transparent"
                    }`}
                  >
                    {field.value === "assignable" && (
                      <CheckIcon color="white" className="size-3" />
                    )}
                  </span>
                  <span className="font-bold text-sm text-primary-black">
                    I Have an Assignable Contract
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  You have the equitable interest and right to assign the
                  purchase agreement.
                </p>
              </button>
            </div>

            {field.value === "assignable" && <AssignableContractUpload />}
          </>
        )}
      />

      {errors.ownership && (
        <p className="mt-2 text-xs text-red-500">{errors.ownership.message}</p>
      )}
    </section>
  );
}

function AssignableContractUpload() {
  const {
    control,
    formState: { errors },
  } = useFormContext<PropertyListingFormValues>();

  return (
    <div className="mt-5">
      <Controller
        name="assignableContractFile"
        control={control}
        render={({ field }) => (
          <>
            <p className="mb-1.5 text-sm font-medium text-primary-black">
              Assignable Contract PDF
            </p>
            <label
              onDrop={(e) => {
                e.preventDefault();
                const dropped = e.dataTransfer.files?.[0];
                if (dropped) field.onChange(dropped);
              }}
              onDragOver={(e) => e.preventDefault()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center"
            >
              <FileUp className="mb-3 size-6 text-gray-400" />
              <p className="mb-4 text-sm text-gray-500">
                {field.value
                  ? field.value.name
                  : "Drag and drop PDF or DOCX here"}
              </p>
              <Button type="button" asChild className="py-5 px-5 bg-primary-color">
                <span>Upload Contract</span>
              </Button>
              <input
                type="file"
                accept="application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
              />
            </label>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
              <Lock className="mt-0.5 size-4 shrink-0 text-gray-500" />
              <p>
                This document will not be publicly visible. It will only be
                shared with a buyer after both parties agree to the
                transaction. Buyers can review the document before signing.
                If desired, you may redact your original purchase price
                before uploading.
              </p>
            </div>
          </>
        )}
      />
      {errors.assignableContractFile && (
        <p className="mt-1 text-xs text-red-500">
          {errors.assignableContractFile.message as string}
        </p>
      )}
    </div>
  );
}