import Container from "@/components/shared/container/Container";
import PropertyImages from "./PropertyImages";
import { PropertyListing } from "./BasicPropertyDetails";
import { ActionBtns } from "./ActionBtns";
import { PropertyInfo } from "./PropertyInfo";
import ProfileCard from "./ProfileCard";

export default function PropertyContainer() {
  return (
    <Container className="mt-12">
      <PropertyImages />
      <div className="grid md:grid-cols-6 gap-6 mt-4">
        <div className="md:col-span-4">
          <PropertyListing
            price="$48,500"
            address="1245 Willow Lane, Memphis, TN 38104"
            bedrooms={3}
            bathrooms={2}
            sqft="1,850"
            yearBuilt={1992}
            description={`This stunning 3–bedroom, 2–bathroom ranch-style home has been meticulously updated with modern finishes while maintaining its institutional-grade value. Located in the heart of Memphis, the property features a brand new roof installed in 2024 and a completely remodeled kitchen. The open-concept living area flows seamlessly into the dining space, making it perfect for both families and investors looking for a high-yield rental property. The large backyard offers significant potential for further development or landscaping.`}
            isActive={true}
          />
          <PropertyInfo />
        </div>
        <div className="md:col-span-2">
          <ActionBtns />
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
