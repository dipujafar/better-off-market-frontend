"use client";

import { useCallback, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  offerFormSchema,
  offerFormDefaultValues,
  type OfferFormValues,
} from "@/lib/validations/offer-form";
import { FormFooter } from "./FormFooter";
import { OfferDetailsSection } from "./Offerdetailssection";
import { SellerConcessionsSection } from "./SellerConcessionsSectionImpl";
import { ContingenciesSection } from "./ContingenciesSectionImpl";
import { RealEstateAgentSection } from "./RealEstateAgentSectionImpl";
import { PersonalPropertySection } from "./PersonalPropertySectionImpl";
import { ClosingTermsSection } from "./ClosingTermsSectionImpl";
import { SingleTextareaSection } from "./SingleTextareaSectionImpl";
import { SupportingDocumentsSection } from "./SupportingDocumentsSectionImpl";

interface OfferFormProps {
  defaultValues?: Partial<OfferFormValues>;
  /** Shown as "Original: ..." hints under the Personal Property textareas. */
  originalPersonalProperty?: string;
  originalItemsToBeRemoved?: string;
  onSubmit: (
    values: OfferFormValues,
    supportingDocuments: File[],
  ) => void | Promise<void>;
  onCancel?: () => void;
}

/**
 * Top-level offer form. Owns the react-hook-form instance and wires every
 * section up through FormProvider so each section reads/writes the shared
 * form state without prop drilling.
 *
 * Performance notes:
 * - mode: "onBlur" + reValidateMode: "onChange" avoids validating on every
 *   keystroke while still giving fast feedback once a field has an error.
 * - Every section is React.memo'd and only subscribes (via useWatch /
 *   formState) to the specific fields it needs, so typing in one section
 *   never re-renders the others.
 * - File uploads are intentionally kept out of the zod-validated form
 *   state (see SupportingDocumentsSection) and merged in at submit time.
 */
export function OfferForm({
  defaultValues,
  originalPersonalProperty,
  originalItemsToBeRemoved,
  onSubmit,
  onCancel,
}: OfferFormProps) {
  const [supportingDocuments, setSupportingDocuments] = useState<File[]>([]);

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: { ...offerFormDefaultValues, ...defaultValues },
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const handleSubmit: SubmitHandler<OfferFormValues> = useCallback(
    (values) => onSubmit(values, supportingDocuments),
    [onSubmit, supportingDocuments],
  );

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit<OfferFormValues>(handleSubmit)}
        noValidate
        className="flex flex-col gap-6 lg:gap-8 lg:py-8 py-6"
      >
        <OfferDetailsSection />
        <SellerConcessionsSection />
        <ContingenciesSection />
        <RealEstateAgentSection />
        <PersonalPropertySection
          originalPersonalProperty={originalPersonalProperty}
          originalItemsToBeRemoved={originalItemsToBeRemoved}
        />
        <ClosingTermsSection />
        <SingleTextareaSection
          title="Additional Terms / Conditions"
          name="additionalTerms"
          placeholder="e.g., Buyer requests washer and dryer to remain with property."
        />
        <SupportingDocumentsSection onFilesChange={setSupportingDocuments} />
        <SingleTextareaSection
          title="Notes to seller"
          name="notesToSeller"
          placeholder="Add a personal note or explain specific parts of your offer..."
        />

        <FormFooter
          onCancel={onCancel}
          isSubmitting={form.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  );
}
