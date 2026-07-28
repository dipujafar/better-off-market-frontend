"use client";

import { memo, useCallback, useId, useState } from "react";
import { FormSectionCard } from "./FormSectionCard";
import { DocIcon, PDFIcon } from "@/icons";

interface SupportingDocumentsSectionProps {
  onFilesChange?: (files: File[]) => void;
  maxSizeMb?: number;
}

/**
 * Kept independent of the react-hook-form/zod schema: files aren't
 * serializable the way the rest of the form values are, so this section
 * manages its own state and lifts the file list up via `onFilesChange`.
 * The parent decides how (or whether) to include it in the submit payload.
 */
function SupportingDocumentsSectionImpl({
  onFilesChange,
  maxSizeMb = 20,
}: SupportingDocumentsSectionProps) {
  const inputId = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(event.target.files ?? []);
      const tooLarge = selected.find((f) => f.size > maxSizeMb * 1024 * 1024);

      if (tooLarge) {
        setError(`${tooLarge.name} is over ${maxSizeMb}MB`);
        return;
      }

      setError(null);
      const next = [...files, ...selected];
      setFiles(next);
      onFilesChange?.(next);
      event.target.value = "";
    },
    [files, maxSizeMb, onFilesChange],
  );

  const removeFile = useCallback(
    (index: number) => {
      const next = files.filter((_, i) => i !== index);
      setFiles(next);
      onFilesChange?.(next);
    },
    [files, onFilesChange],
  );

  return (
    <FormSectionCard
      title="Supporting Documents (Optional)"
      icon={<DocIcon/>}
    >
      <div className="sm:col-span-2">
        <label
          htmlFor={inputId}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-primary-border-color bg-[#F7F9FB] px-4 py-3 text-sm text-foreground hover:border-primary/50"
        >
          {/* <DockIcon size={18} className="text-muted-foreground" /> */}
          <PDFIcon  className="size-4"/>
          Upload PDF
          <input
            id={inputId}
            type="file"
            accept="application/pdf"
            multiple
            className="sr-only"
            onChange={handleChange}
          />
        </label>
        <p className="mt-1 text-xs italic font-semibold text-primary-gray">
          Upload proof of funds, pre-approval letter, or other supporting
          documents.
        </p>
        {error ? (
          <p className="mt-1 text-xs text-destructive">{error}</p>
        ) : null}

        {files.length > 0 ? (
          <ul className="mt-3 space-y-1">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
              >
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-3 text-xs text-muted-foreground hover:text-destructive"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </FormSectionCard>
  );
}

export const SupportingDocumentsSection = memo(SupportingDocumentsSectionImpl);
