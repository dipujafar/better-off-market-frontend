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
      <PropertyImages
        propertyImages={property?.photos}
        propertyType={property?.propertyType}
      />
      <div className="grid lg:grid-cols-6 gap-6 mt-4">
        <div className="lg:col-span-4 space-y-6">
          <PropertyListing property={property} />
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
          <Link href={"/properties-list"}>
            <Button className="w-full mt-5 bg-primary-color hover:bg-primary-color/90 text-white font-semibold py-5 px-4 rounded-lg transition-colors cursor-pointer">
              Back listing
            </Button>
          </Link>
        </div>
        <div className="lg:col-span-2 md:flex flex-wrap lg:flex-col gap-4 space-y-4">
          <ActionBtns id={property?._id} totalViews={property?.totalViews} createdAt={property?.createdAt} />
          <AuthenticationRequired />
          {property?.openHouse && (
            <OpenHouse openHouse={property?.openHouse} id={property?._id} />
          )}

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
