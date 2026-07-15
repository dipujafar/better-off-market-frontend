import { MapPin } from "lucide-react";

interface PropertyListingProps {
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  yearBuilt: number;
  description: string;
  isActive?: boolean;
}

export function PropertyListing({
  price,
  address,
  bedrooms,
  bathrooms,
  sqft,
  yearBuilt,
  description,
  isActive = true,
}: PropertyListingProps) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {price}
            </h1>
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-600 text-base md:text-lg">{address}</p>
            </div>
          </div>

          {isActive && (
            <div className="inline-flex">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md font-semibold text-sm whitespace-nowrap">
                ACTIVE LISTING
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-6" />

        {/* Property Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {bedrooms}
              </span>
            </div>
            <p className="text-gray-700 font-medium">Bedrooms</p>
            <p className="text-gray-500 text-sm">Bedrooms</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {bathrooms}
              </span>
            </div>
            <p className="text-gray-700 font-medium">Bathrooms</p>
            <p className="text-gray-500 text-sm">Bathrooms</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">{sqft}</span>
            </div>
            <p className="text-gray-700 font-medium">sqft</p>
            <p className="text-gray-500 text-sm">Living Space</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {yearBuilt}
              </span>
            </div>
            <p className="text-gray-700 font-medium">Year Built</p>
            <p className="text-gray-500 text-sm">Year Built</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            About this property
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            {description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
