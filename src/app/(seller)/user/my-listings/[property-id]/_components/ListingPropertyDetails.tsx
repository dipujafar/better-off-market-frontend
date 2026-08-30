import { BasicPropertyDetails } from "@/app/(public)/properties-list/[property-id]/_components/BasicPropertyDetails";
import { Documents } from "@/app/(public)/properties-list/[property-id]/_components/Documents";
import { LocationMap } from "@/app/(public)/properties-list/[property-id]/_components/LocationMap";
import PropertyImages from "@/app/(public)/properties-list/[property-id]/_components/PropertyImages";
import { PropertyInfo } from "@/app/(public)/properties-list/[property-id]/_components/PropertyInfo";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/utils/animation/AnimatedArrow";
import { IPropertyResponse } from "@/types";
import Link from "next/link";

export default function ListingPropertyDetails({
  property,
}: {
  property: IPropertyResponse;
}) {
  return (
    <div className="space-y-4">
      <PropertyImages
        propertyImages={property?.photos}
        propertyType={property?.propertyType}
        location={property?.location}
      />

      <BasicPropertyDetails property={property} />
      <PropertyInfo property={property} />
      {property?.documents?.length ? (
        <Documents documents={property?.documents} assignableContractFile={property?.assignableContractFile} />
      ) : (
        ""
      )}
      <LocationMap
        lat={property?.location?.coordinates[1]}
        lng={property?.location?.coordinates[0]}
      />
      <div className="mt-5 flex items-center gap-4">
        <Link href={"/user/my-listings/property-listing"}>
          <Button className="bg-primary-color hover:bg-primary-color/90 text-white font-semibold py-5.5 px-7 rounded-lg transition-colors cursor-pointer">
            Edit Properties
          </Button>
        </Link>
        <Button className="bg-[#0076AC] hover:bg-[#0076AC]/90 text-white font-semibold py-5.5 px-7 rounded-lg transition-colors cursor-pointer group">
          Mark Under Contract <AnimatedArrow size={20} />
        </Button>
      </div>
    </div>
  );
}
