"use client";

import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Download, MessageSquareText } from "lucide-react";
import {
  offerFormSchema,
  type OfferFormValues,
} from "@/lib/validations/offer-form";
import { OfferDetailsEditable } from "./sections/OfferDetailsEditable";
import { SellerConcessionsEditable } from "./sections/SellerConcessionsEditable";
import { ContingenciesEditable } from "./sections/ContingenciesEditable";
import { RealEstateAgentEditable } from "./sections/RealEstateAgentEditable";
import { PersonalPropertyEditable } from "./sections/PersonalPropertyEditable";
import { ClosingTermsEditable } from "./sections/ClosingTermsEditable";
import { useEditableSections } from "@/hooks/useEditableSections";
import { SectionKey } from "./counter-offer-helpers";
import { SummaryCard } from "../../review-offer/_components/SummaryCard";
import { OfferSummaryDocument } from "../../review-offer/_components/OfferSummary";
import SellerProfileCard from "@/components/shared/card/seller-profile-card";

export interface CounterOfferEditorProps {
  /** The buyer's original offer — the baseline every "Original: ..." hint and change badge compares against. */
  originalValues: OfferFormValues;
  /** Starting values for the form; defaults to originalValues. Pass a partially-modified offer to start with a section already flagged "Changed". */
  initialValues?: Partial<OfferFormValues>;
  /** Force these sections to render as "Changed" even before any field literally differs (rare — usually the diff against originalValues is enough). */
  initiallyChangedSections?: SectionKey[];
  documents?: OfferSummaryDocument[];
  notesToBuyer?: string;
  onSubmit: (
    values: OfferFormValues,
    changedFields: Partial<OfferFormValues>,
  ) => void | Promise<void>;
  onCancel?: () => void;
}

function getChangedFields(
  current: OfferFormValues,
  original: OfferFormValues,
): Partial<OfferFormValues> {
  const changed: Partial<OfferFormValues> = {};
  (Object.keys(original) as (keyof OfferFormValues)[]).forEach((key) => {
    if (JSON.stringify(current[key]) !== JSON.stringify(original[key])) {
      (changed as Record<string, unknown>)[key] = current[key];
    }
  });
  return changed;
}

export function CounterOfferEditor({
  originalValues,
  initialValues,
  initiallyChangedSections,
  documents,
  notesToBuyer,
  onSubmit,
  onCancel,
}: CounterOfferEditorProps) {
  const form = useForm<OfferFormValues>({
    // @ts-ignore
    resolver: zodResolver(offerFormSchema),
    defaultValues: { ...originalValues, ...initialValues },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { editing, changed, startEdit, cancelEdit } = useEditableSections({
    // @ts-ignore
    control: form.control,
    setValue: form.setValue,
    originalValues,
    initiallyChanged: initiallyChangedSections,
  });

  const handleSubmit = useCallback(
    (values: OfferFormValues) =>
      onSubmit(values, getChangedFields(values, originalValues)),
    [onSubmit, originalValues],
  );

  return (
    <FormProvider {...form}>
      <form
        //   @ts-ignore
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className=" grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:items-start shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] mt-8"
      >
        {/* Main column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <OfferDetailsEditable
            originalValues={originalValues}
            isEditing={editing.offerDetails}
            isChanged={changed.offerDetails}
            onEdit={() => startEdit("offerDetails")}
            onCancel={() => cancelEdit("offerDetails")}
          />

          <SellerConcessionsEditable
            originalValues={originalValues}
            isEditing={editing.sellerConcessions}
            isChanged={changed.sellerConcessions}
            onEdit={() => startEdit("sellerConcessions")}
            onCancel={() => cancelEdit("sellerConcessions")}
          />

          <ContingenciesEditable
            originalValues={originalValues}
            isEditing={editing.contingencies}
            isChanged={changed.contingencies}
            onEdit={() => startEdit("contingencies")}
            onCancel={() => cancelEdit("contingencies")}
          />

          <RealEstateAgentEditable
            originalValues={originalValues}
            isEditing={editing.agent}
            isChanged={changed.agent}
            onEdit={() => startEdit("agent")}
            onCancel={() => cancelEdit("agent")}
          />

          <PersonalPropertyEditable
            originalValues={originalValues}
            isEditing={editing.personalProperty}
            isChanged={changed.personalProperty}
            onEdit={() => startEdit("personalProperty")}
            onCancel={() => cancelEdit("personalProperty")}
          />

          <ClosingTermsEditable
            originalValues={originalValues}
            isEditing={editing.closingTerms}
            isChanged={changed.closingTerms}
            onEdit={() => startEdit("closingTerms")}
            onCancel={() => cancelEdit("closingTerms")}
          />

          <div className="lg:flex flex-wrap items-center gap-3 hidden">
            <button
              type="button"
              onClick={onCancel}
              disabled={form.formState.isSubmitting}
              className="rounded-md border border-primary-border-color bg-card px-4 py-2.5 text-sm font-bold text-[#8D7168] hover:bg-muted/50 disabled:opacity-60 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="rounded-md bg-primary-color cursor-pointer px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {form.formState.isSubmitting
                ? "Sending..."
                : "Send Counter Offer"}
            </button>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="flex flex-col gap-6">
          {documents && documents.length > 0 ? (
            <SummaryCard title="Documents" icon={<FileText size={18} />}>
              <ul className="flex flex-col gap-2">
                {documents.map((doc) => (
                  <li key={doc.url}>
                    <a
                      href={doc.url}
                      download
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm text-foreground hover:border-primary/50"
                    >
                      <span className="truncate">{doc.name}</span>
                      <Download
                        size={16}
                        className="shrink-0 text-muted-foreground"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </SummaryCard>
          ) : null}

          {notesToBuyer ? (
            <SummaryCard
              title="Notes to Buyer"
              icon={<MessageSquareText color="#00214C" size={18} />}
            >
              <p className="rounded-lg bg-[#F2F4F6] p-3 text-[#594139] italic leading-relaxed">
                &ldquo;{notesToBuyer}&rdquo;
              </p>
            </SummaryCard>
          ) : null}

          <SellerProfileCard />

          <div className="flex flex-wrap items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={onCancel}
              disabled={form.formState.isSubmitting}
              className="rounded-lg border border-primary-border-color bg-card px-4 py-2.5 text-sm font-medium text-primary-color hover:bg-muted/50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {form.formState.isSubmitting
                ? "Sending..."
                : "Send Counter Offer"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
