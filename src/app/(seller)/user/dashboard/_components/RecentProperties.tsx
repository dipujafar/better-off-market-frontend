import PropertyCard from "./PropertyCard";


const properties = [
  {
    id: 1,
    type: "Residential",
    location: "Hamilton County",
    price: 48500,
    views: 48,
    saved: 48,
    offers: 2,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EIkwA0cr0rlh8kRv3SxbvHk4ka8KLe.png",
  },
  {
    id: 2,
    type: "Land",
    location: "Hamilton County",
    price: 48500,
    views: 48,
    saved: 48,
    offers: 2,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EIkwA0cr0rlh8kRv3SxbvHk4ka8KLe.png",
  },
  {
    id: 3,
    type: "Commercial",
    location: "Hamilton County",
    price: 48500,
    views: 48,
    saved: 48,
    offers: 2,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EIkwA0cr0rlh8kRv3SxbvHk4ka8KLe.png",
  },
];

export default function RecentProperties() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          image={property.image}
          type={property.type}
          location={property.location}
          price={property.price}
          views={property.views}
          saved={property.saved}
          offers={property.offers}
        />
      ))}
    </div>
  );
}
