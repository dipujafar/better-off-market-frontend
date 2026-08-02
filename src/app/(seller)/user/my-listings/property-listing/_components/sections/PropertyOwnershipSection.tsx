"use client";
import { Controller, useFormContext } from "react-hook-form";
import type { PropertyListingFormValues } from "@/lib/validations/property-listing.schema";
import { PeopleIcon, PropertyOwnershipIcon } from "@/icons";
import { CheckIcon, Lock, PanelsTopLeftIcon, UploadIcon } from "lucide-react";

export function PropertyOwnershipSection() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<PropertyListingFormValues>();

  const ownership = watch("ownership");

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
                  className={`flex size-5 items-center justify-center rounded-full ${
                    field.value === "own"
                      ? "border-primary-color bg-primary-color"
                      : "border-[#737686]"
                  }`}
                >
                  {field.value === "own" && <CheckIcon className="size-3" />}
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
            <div>
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
                    className={`size-5 rounded-full border ${
                      field.value === "assignable"
                        ? "border-primary-color bg-primary-color"
                        : "border-[#737686]"
                    }`}
                  />
                  <span className="font-bold text-sm text-primary-black">
                    I Have an Assignable Contract
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  You have the equitable interest and right to assign the
                  purchase agreement.
                </p>
              </button>

              {ownership === "assignable" && <AssignableContractUpload />}
            </div>
          </div>
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
    <div className="mt-3 rounded-lg border border-[#DBE1FF33] bg-[#DBE1FF33] p-4">
      <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-primary-black">
        <Lock color="#004AC6"  className="size-4" />
        Attention
      </div>
      <p className="mb-4 text-sm text-gray-600">
       This document will not be publicly visible. It will only be shared with a buyer after both parties agree to the transaction. Buyers can review the document before signing. If desired, you may redact your original purchase price before uploading.
      </p>

      <Controller
        name="assignableContractFile"
        control={control}
        render={({ field }) => (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#C3C6D7] bg-white/60 py-6 text-center">
            <UploadIcon className="mb-2 size-5 text-gray-400" />
            <span className="text-sm font-medium text-primary-black">
              {field.value
                ? field.value.name
                : "Upload Assignable Contract PDF"}
            </span>
            <span className="mt-1 text-xs text-gray-400">
              Required for verification
            </span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
            />
          </label>
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
