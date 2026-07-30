import { PropertyListing } from "@/app/(public)/properties-list/[property-id]/_components/BasicPropertyDetails";
import { Documents } from "@/app/(public)/properties-list/[property-id]/_components/Documents";
import { LocationMap } from "@/app/(public)/properties-list/[property-id]/_components/LocationMap";
import PropertyImages from "@/app/(public)/properties-list/[property-id]/_components/PropertyImages";
import { PropertyInfo } from "@/app/(public)/properties-list/[property-id]/_components/PropertyInfo";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/utils/animation/AnimatedArrow";
import Link from "next/link";

export default function ListingPropertyDetails() {
  return (
    <div className="space-y-4">
      <PropertyImages />

      <PropertyListing
        title="1245 Willow Lane"
        price="48,500"
        originalPrice="53,000"
        anticipatedPrice="26,000"
        address="Memphis, TN 38103"
        bedrooms={3}
        bathrooms={2}
        sqft="1,850"
        yearBuilt={1992}
        description={`This stunning 3–bedroom, 2–bathroom ranch-style home has been meticulously updated with modern finishes while maintaining its institutional-grade value. Located in the heart of Memphis, the property features a brand new roof installed in 2024 and a completely remodeled kitchen. The open-concept living area flows seamlessly into the dining space, making it perfect for both families and investors looking for a high-yield rental property. The large backyard offers significant potential for further development or landscaping.`}
        isActive={true}
      />
      <PropertyInfo />
      <Documents />
      <LocationMap lat={23.811056} lng={90.407608} />
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
