import Container from "@/components/shared/container/Container";
import PropertyImages from "./PropertyImages";
import { PropertyListing } from "./BasicPropertyDetails";
import { ActionBtns } from "./ActionBtns";
import { PropertyInfo } from "./PropertyInfo";
import ProfileCard from "./ProfileCard";
import { Documents } from "./Documents";
import { LocationMap } from "./LocationMap";
import { OpenHouse } from "./OpenHouse";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthenticationRequired from "./AuthenticationRequired";
import { IPropertyResponse } from "@/types";

export default function PropertyContainer({
  property,
}: {
  property: IPropertyResponse;
}) {
  return (
    <Container className="mt-12">
      <PropertyImages propertyImages={property?.photos} propertyType={property?.propertyType} />
      <div className="grid lg:grid-cols-6 gap-6 mt-4">
        <div className="lg:col-span-4 space-y-6">
          <PropertyListing
            title="1245 Willow Lane"
            price="48,500"
            originalPrice="53,000"
            anticipatedPrice="26,000"
            address="1245 Willow Lane, Memphis, TN 38103"
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
          <Link href={"/properties-list"}>
            <Button className="w-full mt-5 bg-primary-color hover:bg-primary-color/90 text-white font-semibold py-5 px-4 rounded-lg transition-colors cursor-pointer">
              Back listing
            </Button>
          </Link>
        </div>
        <div className="lg:col-span-2 md:flex flex-wrap lg:flex-col gap-4 space-y-4">
          <ActionBtns id={property?._id} />
          <AuthenticationRequired />
          <OpenHouse />

          <ProfileCard
            image="/user_profile.jpg"
            name="Sarah Jenkins"
            title="Global Assets LLC Specialist"
            rating={4.8}
            memberSince="Jan 2024"
            listings={12}
          />
        </div>
      </div>
    </Container>
  );
}
