"use client";
import { BasicPropertyDetails } from "@/app/(public)/properties-list/[property-id]/_components/BasicPropertyDetails";
import { Documents } from "@/app/(public)/properties-list/[property-id]/_components/Documents";
import { LocationMap } from "@/app/(public)/properties-list/[property-id]/_components/LocationMap";
import PropertyImages from "@/app/(public)/properties-list/[property-id]/_components/PropertyImages";
import { PropertyInfo } from "@/app/(public)/properties-list/[property-id]/_components/PropertyInfo";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/utils/animation/AnimatedArrow";
import { revalidateProperties } from "@/lib/actions/revalidate";
import { errorModification } from "@/lib/errors/errorModification";
import { useUpdatePropertyMutation } from "@/redux/api/propertiesApi";
import { IPropertyResponse } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const closedStatus = ["Under Contract", "Sold", "Rejected"];

export default function ListingPropertyDetails({
  property,
}: {
  property: IPropertyResponse;
}) {
  const [updateStatus, { isLoading }] = useUpdatePropertyMutation();
  const router = useRouter();

  const handleMarkUnderContract = async () => {
    try {
      await updateStatus({
        id: property?._id,
        formData: {
          status: "Under Contract",
        },
      });
      toast.success("Property status updated to Under Contract.");
      await revalidateProperties();
      router.back();
    } catch (error) {
      const errorMessage = errorModification(error);
      toast.error(
        errorMessage || "An error occurred while updating the property status.",
      );
    }
  };
  return (
    <div className="space-y-4">
      <PropertyImages
        propertyImages={property?.photos}
        propertyType={property?.propertyType}
      />

      <BasicPropertyDetails property={property} />
      <PropertyInfo property={property} />
      {property?.documents?.length ? (
        <Documents documents={property?.documents} />
      ) : (
        ""
      )}
      <LocationMap
        lat={property?.location?.coordinates[1]}
        lng={property?.location?.coordinates[0]}
      />
      <div className="mt-5 flex items-center gap-4">
        <Link
          href={`/user/my-listings/property-listing?property=${property?._id}`}
        >
          <Button className="bg-primary-color hover:bg-primary-color/90 text-white font-semibold py-5.5 px-7 rounded-lg transition-colors cursor-pointer">
            Edit Properties
          </Button>
        </Link>
        {!closedStatus.includes(property?.status) && (
          <Button
            onClick={handleMarkUnderContract}
            disabled={isLoading}
            className="bg-[#0076AC] hover:bg-[#0076AC]/90 text-white font-semibold py-5.5 px-7 rounded-lg transition-colors cursor-pointer group"
          >
            Mark Under Contract{isLoading ? "..." : <AnimatedArrow size={20} />}
          </Button>
        )}
      </div>
    </div>
  );
}
