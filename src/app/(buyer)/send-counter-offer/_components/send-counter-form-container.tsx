"use client";
import type { OfferFormValues } from "@/lib/validations/offer-form";
import { CounterOfferEditor } from "./CounterOfferEditor";
import Container from "@/components/shared/container/Container";
import { useRouter, useSearchParams } from "next/navigation";
import OfferPropertyCard from "@/components/shared/card/offer-property-card";
import {
  useGetSingleOfferQuery,
  useSentCounterOfferMutation,
} from "@/redux/api/offerApi";
import CounterOfferEditorSkeleton from "@/components/skeleton/CounterOfferEditorSkeleton";
import { errorModification } from "@/lib/errors/errorModification";
import { toast } from "sonner";

export default function SendCounterFormContainer() {
  const router = useRouter();
  const offerId = useSearchParams().get("offer");
  const { data, isLoading } = useGetSingleOfferQuery(offerId, {
    skip: !offerId,
  });
  const [sentCounterOffer] = useSentCounterOfferMutation();

  if (isLoading) {
    return (
      <Container className="mt-8">
        <CounterOfferEditorSkeleton />
      </Container>
    );
  }

  const handleSentCounter = async (
    values: OfferFormValues,
    // changedFields: Partial<OfferFormValues>,
  ) => {
    toast.loading("Submitting counter offer...", { id: "counter-offer" });
    try {
      await sentCounterOffer({
        id: offerId,
        terms: values,
      }).unwrap();
      toast.success("Counter offer submitted successfully!", {
        id: "counter-offer",
      });
      router.back();
    } catch (error) {
      const errorMessage = errorModification(error);
      toast.error(errorMessage, { id: "counter-offer" });
    }
  };

  return (
    <Container className="mt-8">
      <h3 className="md:text-[28px] text-2xl font-bold text-primary-black mb-3">
        Send Counter Offer
      </h3>
      <OfferPropertyCard property={data?.data?.property} />
      <CounterOfferEditor
        originalValues={data?.data?.currentTerms}
        user={
          data?.data?.lastActionBy === "buyer"
            ? data?.data?.buyer
            : data?.data?.seller
        }
        documents={data?.data?.supportingDocuments || []}
        onSubmit={(values, changedFields) => {
          // handleSentCounter(values, changedFields);
          handleSentCounter(values);
        }}
        onCancel={() => router.back()}
      />
    </Container>
  );
}
