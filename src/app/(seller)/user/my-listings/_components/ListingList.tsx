import DashboardPropertyCard from "@/components/shared/card/dashboard-property-card";
import PaginationSection from "@/components/shared/pagination/PaginationSection";

const properties = [
  {
    id: 1,
    type: "Residential",
    location: "Hamilton County",
    price: 48500,
    views: 48,
    saved: 48,
    offers: 2,
    image: "/properties/property_image_1.png",
    rsvp: 24,
  },
  {
    id: 2,
    type: "Land",
    location: "Hamilton County",
    price: 48500,
    views: 48,
    saved: 48,
    offers: 2,
    image: "/properties/property_image_2.png",
    rsvp: 24,
  },
  {
    id: 3,
    type: "Commercial",
    location: "Hamilton County",
    price: 48500,
    views: 48,
    saved: 48,
    offers: 2,
    image: "/properties/property_image_3.png",
    rsvp: 24,
  },
  {
    id: 4,
    type: "Land",
    location: "Hamilton County",
    price: 48500,
    views: 48,
    saved: 48,
    offers: 2,
    image: "/properties/property_image_2.png",
    rsvp: 24,
  },
];

export default function ListingList() {
  return (
    <div className="space-y-4 lg:p-6 p-4">
      {properties?.map((property) => (
        <DashboardPropertyCard
          key={property.id}
          image={property.image}
          type={property.type}
          location={property.location}
          price={property.price}
          views={property.views}
          saved={property.saved}
          offers={property.offers}
          rsvp={property.rsvp}
        />
      ))}
      <PaginationSection total={50} current={1} />
    </div>
  );
}
