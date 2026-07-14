import OfferedCard from "@/components/shared/card/offered-card";


const sampleListings = [
  {
    id: "1",
    image: "/properties/property_offer_image_2.jpg",
    agent: "James B.",
    property: "Memphis house",
    location: "Hamilton County",
    status: "PENDING" as const,
    price: 46000,
    originalPrice: 48500,
    actionType: "review" as const,
  },
  {
    id: "2",
    image: "/properties/property_offer_image_1.jpg",
    agent: "James B.",
    property: "Memphis house",
    location: "Hamilton County",
    status: "PENDING" as const,
    price: 46000,
    originalPrice: 48500,
    actionType: "review" as const,
  },
  {
    id: "3",
    image: "/properties/property_offer_image_3.png",
    agent: "James B.",
    property: "Memphis house",
    location: "Hamilton County",
    status: "SOLD" as const,
    price: 19500,
    actionType: "message" as const,
  },
  {
    id: "4",
    image: "/properties/property_image_1.png",
    agent: "James B.",
    property: "Memphis house",
    location: "Hamilton County",
    status: "SOLD" as const,
    price: 19500,
    actionType: "message" as const,
  },
  {
    id: "5",
    image: "/properties/property_image_2.png",
    agent: "James B.",
    property: "Memphis house",
    location: "Hamilton County",
    status: "SOLD" as const,
    price: 19500,
    actionType: "message" as const,
  },
  {
    id: "6",
    image: "/properties/property_image_3.png",
    agent: "James B.",
    property: "Memphis house",
    location: "Hamilton County",
    status: "REJECTED" as const,
    price: 165000,
    actionType: "details" as const,
  },
];

export default function OfferList() {
  return (
    <div className="w-full   space-y-4">
      {sampleListings.map((listing) => (
        <OfferedCard key={listing.id} {...listing} />
      ))}
    </div>
  );
}
