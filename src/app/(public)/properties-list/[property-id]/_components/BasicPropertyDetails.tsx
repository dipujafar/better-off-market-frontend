import { MapPin } from "lucide-react";

interface PropertyListingProps {
  price: string;
  buyItNowPrice: string;
  anticipatedPrice: string;
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
  buyItNowPrice,
  anticipatedPrice,
  address,
  bedrooms,
  bathrooms,
  sqft,
  yearBuilt,
  description,
  isActive = true,
}: PropertyListingProps) {
  return (
    <div className="w-full shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]">
      <div className="bg-white rounded-lg border border-[#EFEAE8] p-5 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-start gap-2 text-primary-gray">
              <MapPin className="w-5 h-5  shrink-0 mt-0.5" />
              <p className=" text-base md:text-xl font-semibold">{address}</p>
            </div>
          </div>

          {isActive && (
            <div className="inline-flex">
              <span className="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-md font-bold text-xs whitespace-nowrap">
                ACTIVE LISTING
              </span>
            </div>
          )}
        </div>

        {/* ------------------ Pricing details ---------------- */}
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] md:p-8 p-6">
          <div className="border-r border-primary-border-color ">
            <p className="text-xs font-semibold text-[#594139] mb-1">
              LISTING PRICE
            </p>
            <p className="lg:text-3xl text-xl font-bold text-primary-black ">
              ${price}
            </p>
          </div>
          <div className="border-r border-primary-border-color ">
            <p className="text-xs font-semibold text-[#594139] mb-1">
              BUY IT NOW
            </p>
            <p className="lg:text-3xl text-xl font-bold text-primary-black ">
              ${buyItNowPrice}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#594139] mb-1">
              ANTICIPATED ARV
            </p>
            <p className="lg:text-3xl text-xl font-bold text-primary-black ">
              ${anticipatedPrice}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-6 mt-2" />

        {/* Property Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-[90%]">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-primary-black">
                {bedrooms} <span>Beds</span>
              </span>
            </div>

            <p className="text-primary-gray text-sm">Bedrooms</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-primary-black">
                {bathrooms} <span>Baths</span>
              </span>
            </div>

            <p className="text-primary-gray text-sm">Bathrooms</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-primary-black">
                {sqft} <span>Sqft</span>{" "}
              </span>
            </div>

            <p className="text-primary-gray text-sm">Living Space</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-primary-black">
                {yearBuilt}
              </span>
            </div>
            <p className="text-primary-gray text-sm">Year Built</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-6" />

        {/* About Section */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold text-primary-black mb-4">
            About this property
          </h2>
          <div className="space-y-4 text-primary-gray leading-relaxed">
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
