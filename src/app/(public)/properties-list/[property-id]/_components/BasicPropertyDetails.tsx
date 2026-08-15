import ReadMoreText from "@/components/shared/utils/ReadMoreText";
import { IPropertyResponse } from "@/types";
import { MapPin, TrendingDown } from "lucide-react";

interface PropertyListingProps {
  property: IPropertyResponse;
}

export function PropertyListing({ property }: PropertyListingProps) {
  return (
    <div className="w-full shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]">
      <div className="bg-white rounded-lg border border-[#EFEAE8] p-5 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex-1">
            {/* <h2 className="text-primary-black lg:text-3xl text-2xl font-semibold">
              {title}
            </h2> */}
            <div className="flex  gap-1.5 text-primary-gray xl:text-2xl lg:text-xl md:text-lg">
              <MapPin size={22} className=" mt-1 shrink-0" />
              <p className=" ">
                {property?.streetAddress}, {property?.city}, {property?.state},{" "}
                {property?.zipCode}, {property?.county}{" "}
              </p>
            </div>
          </div>

          {
            <div className="inline-flex">
              <span className="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-md font-bold text-xs whitespace-nowrap">
                ACTIVE LISTING
              </span>
            </div>
          }
        </div>

        {/* ------------------ Pricing details ---------------- */}
        <div className="rounded-md shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] lg:p-6 p-4 bg-white border border-[#EFEAE8]">
          <p className="text-xl md:text-2xl font-bold text-[#1F4E8B]">
            ${property?.listingPrice}{" "}
            {/* <span className="text-blue-900/40 font-normal mx-1">|</span> */}
            <span className="text-xl md:text-2xl font-normal  text-primary-gray scroll-pl-2.5">
              (ARV : ${property?.arv})
            </span>
          </p>

          {property?.oldListingPrice &&
            property?.oldListingPrice > property?.listingPrice && (
              <div className="inline-flex items-center gap-1.5 bg-[#E9F0FA] text-[#1F4E8B] text-sm font-medium px-3 py-1.5 rounded-full mt-3">
                <TrendingDown className="w-4 h-4" />
                <span>
                  Price Reduced{" "}
                  <span className="">
                    ~~ ${property?.oldListingPrice - property?.listingPrice} ~~
                  </span>
                </span>
              </div>
            )}
        </div>

        {/* Divider */}
        {/* <div className="h-px bg-gray-200 mb-6 mt-2" /> */}

        {/* Property Details Grid */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 lg:mt-5 mt-4 rounded-md shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] lg:p-6 p-4 bg-white border border-[#EFEAE8]">
          <div className="flex items-center gap-2">
            <BedIcon className="size-5" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-primary-black">
                  {bedrooms} <span>Beds</span>
                </span>
              </div>

              <p className="text-primary-gray text-sm">Bedrooms</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BathPoolIcon className="size-5" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-primary-black">
                  {bathrooms} <span>Baths</span>
                </span>
              </div>

              <p className="text-primary-gray text-sm">Bathrooms</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SQFTIcon className="size-5" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-primary-black">
                  {sqft} <span>Sqft</span>{" "}
                </span>
              </div>

              <p className="text-primary-gray text-sm">Living Space</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CalendarIcon className="size-5" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-primary-black">
                  {yearBuilt}
                </span>
              </div>
              <p className="text-primary-gray text-sm">Year Built</p>
            </div>
          </div>
        </div> */}

        {/* Divider */}
        {/* <div className="h-px bg-gray-200 mb-6" /> */}

        {/* About Section */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold text-primary-black mb-4">
            About this property
          </h2>
          <div className="space-y-4 text-primary-gray leading-relaxed">
            <p className="text-base md:text-lg">
              <ReadMoreText
                text={property?.marketingDescription}
                wordLimit={100}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
