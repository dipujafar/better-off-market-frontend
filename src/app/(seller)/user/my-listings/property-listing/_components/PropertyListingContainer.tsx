"use client";
import { PropertyListingFormValues } from "@/lib/validations/property-listing.schema";
import { PropertyListingForm } from "./PropertyListingForm";
import { ZodError } from "zod";
import { zodFormErrorModification } from "@/lib/errors/zodFormErrorModification";
import { toast } from "sonner";
import { useCreatePropertyMutation } from "@/redux/api/propertiesApi";
import { errorModification } from "@/lib/errors/errorModification";
import { revalidateProperties } from "@/lib/actions/revalidate";

export default function PropertyListingContainer() {
  const [crateProperty] = useCreatePropertyMutation();
  const handleSubmit = async (values: PropertyListingFormValues) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      values?.photos?.forEach((file) => formData.append("photos", file));

      if (values?.documents?.length) {
        values?.documents?.forEach((file) =>
          formData.append("documents", file),
        );
      }

      if (values?.assignableContractFile) {
        formData.append(
          "assignableContractFile",
          values?.assignableContractFile,
        );
      }
      await crateProperty(formData).unwrap();
      await revalidateProperties();
      toast.success(
        "Property Listing request submitted successfully!. Please wait for admin approval.",
      );
      return true;
    } catch (err) {
      const errMessage = errorModification(err);
      toast.error(errMessage);
    }
  };

  const handleError = (err: ZodError) => {
    const errMessage = zodFormErrorModification(err);
    toast.error(errMessage);
  };
  return (
    <div>
      <PropertyListingForm onSubmit={handleSubmit} onError={handleError} />
    </div>
  );
}
