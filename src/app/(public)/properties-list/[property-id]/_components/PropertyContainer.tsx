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

export default function PropertyContainer() {
  return (
    <Container className="mt-12">
      <PropertyImages />
      <div className="grid lg:grid-cols-6 gap-6 mt-4">
        <div className="lg:col-span-4 space-y-6">
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
          <Link href={"/properties-list"}>
            <Button className="w-full mt-5 bg-primary-color hover:bg-primary-color/90 text-white font-semibold py-5 px-4 rounded-lg transition-colors cursor-pointer">
              Back listing
            </Button>
          </Link>
        </div>
        <div className="lg:col-span-2 md:flex flex-wrap lg:flex-col gap-4 space-y-4">
          <ActionBtns />
          <OpenHouse />
          <div className="border-l-4 border-primary-color bg-[#F2F4F6] rounded-md p-4 space-y-1 w-full">
            <p className="text-sm font-medium text-primary-gray">
              You need a free account to submit offers or message sellers.{" "}
              <Link
                href="/sign-up"
                className="text-[#1F4E8B] hover:underline font-semibold"
              >
                Sign up free
              </Link>{" "}
              or{" "}
              <Link
                href="/login"
                className="text-[#1F4E8B] hover:underline font-semibold"
              >
                log in
              </Link>
            </p>
          </div>
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
