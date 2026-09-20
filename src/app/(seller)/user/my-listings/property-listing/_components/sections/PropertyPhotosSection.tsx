"use client";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { PropertyListingFormValues } from "@/lib/validations/property-listing.schema";
import { CameraIcon, ImageIcon, ImagesIcon } from "lucide-react";

const MIN_PHOTOS = 5;

export function PropertyPhotosSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<PropertyListingFormValues>();

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-5 flex items-center gap-2">
          <ImagesIcon className="text-primary-blue size-5" />
          <h2 className="text-xl font-semibold text-primary-color">
            Property Photos<span className="text-red-500">*</span>
          </h2>
        </div>

        <span className="text-xs text-gray-400">
          Minimum {MIN_PHOTOS} high-res photos required
        </span>
      </div>

      <Controller
        name="photos"
        control={control}
        render={({ field }) => {
          const files = ((field.value ?? []) as Array<File | string>) || [];

          const addFiles = (newFiles: FileList | File[]) => {
            field.onChange([...files, ...Array.from(newFiles)]);
          };
          const removeFile = (index: number) => {
            field.onChange(files.filter((_, i) => i !== index));
          };

          return (
            <>
              <label
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.length)
                    addFiles(e.dataTransfer.files);
                }}
                onDragOver={(e) => e.preventDefault()}
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#004AC64D] bg-[#004AC60D] px-4 py-10 text-center"
              >
                <CameraIcon className="mb-3 size-8 text-primary-blue" />
                <p className="font-semibold text-2xl text-[#434655]">
                  Drag and drop images here
                </p>
                <p className="mb-4 text-sm text-[#737686]">
                  Or click to browse from your device
                </p>
                <Button type="button" asChild className="py-5 px-5 bg-primary-color">
                  <span>Upload Photos</span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) addFiles(e.target.files);
                  }}
                />
              </label>

              {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={typeof file === "string" ? file : URL.createObjectURL(file)}
                        alt={`photo-${index}`}
                        className="size-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute right-1 top-1 hidden size-6 items-center justify-center rounded-full bg-black/60 text-xs text-white group-hover:flex"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {Array.from({
                    length: Math.max(0, MIN_PHOTOS - files.length),
                  }).map((_, i) => (
                    <div
                      key={`placeholder-${i}`}
                      className="flex aspect-square items-center justify-center rounded-lg bg-gray-100"
                    >
                      <ImageIcon className="size-6 text-gray-300" />
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        }}
      />
      {errors.photos && (
        <p className="mt-2 text-xs text-red-500">
          {errors.photos.message as string}
        </p>
      )}
    </section>
  );
}
