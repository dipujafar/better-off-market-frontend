import Navbar from "@/components/shared/navbar/Navbar";
import PropertyContainer from "./_components/PropertyContainer";
import { apiGet } from "@/lib/api/fetcher";
import { tagTypes } from "@/redux/tagTypes";
import { IApiSingleDataResponse } from "@/types/api-response";
import { IPropertyResponse } from "@/types";
import Empty from "@/components/ui/empty-data";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ "property-id": string }>;
}

async function getProperty(propertyId: string) {
  return apiGet<IApiSingleDataResponse<IPropertyResponse>>(
    `/properties/${propertyId}`,
    {
      withAuth: false,
      tags: [tagTypes.property, `property-${propertyId}`],
    },
  );
}

export async function generateStaticParams() {
  const properties = await apiGet<{ data: { _id: string }[] }>("/properties", {
    withAuth: false,
    tags: [tagTypes.property],
  });

  return properties?.data?.map((p) => ({ "property-id": p._id })) ?? [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { "property-id": propertyId } = await params;
  const property = await getProperty(propertyId);

  if (!property?.data) {
    return {
      title: "Property Not Found",
      description: "This property could not be found on Better Off Market.",
    };
  }

  const { city, marketingDescription, streetAddress, listingPrice, photos } =
    property?.data;

  const metaTitle = `${city}, ${streetAddress}`;
  const metaDescription =
    marketingDescription?.slice(0, 160) ||
    `${city}, ${streetAddress} — $${listingPrice ?? "N/A"} in ${streetAddress ?? "Better Off Market"}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: photos?.[0] ? [{ url: photos[0], width: 1200, height: 630 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: photos?.[0] ? [photos[0]] : [],
    },
  };
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { "property-id": propertyId } = await params;
  const property = await getProperty(propertyId); 

  return (
    <div>
      <Navbar className="pt-10" />
      {!property?.data && (
        <Empty message="Property not found" className="mt-16" />
      )}
      {property?.data && <PropertyContainer property={property?.data} />}
    </div>
  );
}
