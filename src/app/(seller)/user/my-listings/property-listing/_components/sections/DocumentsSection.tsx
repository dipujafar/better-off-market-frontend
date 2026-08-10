"use client";
import { Controller, useFormContext } from "react-hook-form";
import type { PropertyListingFormValues } from "@/lib/validations/property-listing.schema";
import { DocIcon } from "@/icons";
import { CheckCircleIcon, PlusIcon, Trash2Icon, TrashIcon } from "lucide-react";

const formatFileSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export function DocumentsSection() {
  const { control } = useFormContext<PropertyListingFormValues>();

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <Controller
        name="documents"
        control={control}
        render={({ field }) => {
          const files: File[] = field.value ?? [];

          const addFiles = (newFiles: FileList) => {
            field.onChange([...files, ...Array.from(newFiles)]);
          };
          const removeFile = (index: number) => {
            field.onChange(files.filter((_, i) => i !== index));
          };

          return (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DocIcon className="text-primary-blue" />
                  <h2 className="text-xl font-semibold text-primary-color">
                    Documents
                  </h2>
                </div>
                <label className="flex cursor-pointer items-center gap-1 text-sm font-medium text-primary-blue">
                  <PlusIcon className="size-4" />
                  Add Document
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.length) addFiles(e.target.files);
                    }}
                  />
                </label>
              </div>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-md bg-green-50 text-green-600">
                        <CheckCircleIcon className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-primary-black">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatFileSize(file.size)} • Just now
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 cursor-pointer duration-300   transform-active:scale-95 "
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          );
        }}
      />
    </section>
  );
}
