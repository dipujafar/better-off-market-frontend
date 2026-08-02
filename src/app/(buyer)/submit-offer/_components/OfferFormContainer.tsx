"use client";;
import type { OfferFormValues } from "@/lib/validations/offer-form";
import { OfferForm } from "./OfferForm";
import Container from "@/components/shared/container/Container";
import { MapPin } from "lucide-react";
import ImagePreviewer from "@/components/shared/utils/images-previewer";
import { useState } from "react";
import OfferPropertyCard from "@/components/shared/card/offer-property-card";
import { useSearchParams } from "next/navigation";

export default function OfferFormContainer() {
  const [previewImgIndex, setPreviewImgIndex] = useState(-1);
  const isEdit = useSearchParams().get("edit") === "true";
  async function handleSubmit(
    values: OfferFormValues,
    supportingDocuments: File[],
  ) {
    const formData = new FormData();
    formData.append("payload", JSON.stringify(values));
    supportingDocuments.forEach((file) => formData.append("documents", file));

    await fetch("/api/offers", { method: "POST", body: formData });
  }

  const images = ["/properties/property_details_image_1.png"];

  return (
    <Container className="mt-4">
      {/* ===========================  property info ============================= */}
      <div className="mb-1">
        <span className="text-sm text-primary-color font-medium flex gap-1 items-center">
          <MapPin size={14} /> Memphis, TN
        </span>
        <h4 className="md:text-3xl text-2xl font-semibold">{ isEdit ? "Edit Offer" : "Submit an Offer" }</h4>
      </div>
      <OfferPropertyCard />
      {/* ========================================================================== */}

      <OfferForm
        onSubmit={handleSubmit}
        onCancel={() => window.history.back()}
        originalPersonalProperty="Refrigerator, Washer/Drye"
        originalItemsToBeRemoved="Broken shed, debris in basement..."
      />

      <ImagePreviewer
        imageUrls={images}
        previewImgIndex={previewImgIndex}
        setPreviewImgIndex={setPreviewImgIndex}
      />
    </Container>
  );
}
