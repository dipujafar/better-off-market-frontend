import { AreaIcon, BedIcon, ShawarIcon } from "@/icons";
import { IProperty } from "@/types";
import Image from "next/image";
import FavoriteIcon from "../favorite_icon/FavoriteIcon";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PropertyCard({
  id,
  imageUrl,
  timeEstimate,
  originalPrice,
  price,
  arv,
  address,
  beds,
  baths,
  sqft,
  className,
  savedProperty,
  propertyType
}: IProperty & { className?: string, savedProperty?: boolean }) {
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <Link href={`/properties-list/${id}`} className="w-full  rounded-lg overflow-hidden  shadow-sm hover:shadow-md transition-shadow bg-white group">
      {/* Image Container */}
      <div className={cn("relative xl:h-64 h-56 w-full overflow-hidden bg-gray-100", className)}>
        <Image
          src={imageUrl}
          alt={address}
          width={1200}
          height={1200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Time Badge */}
        <div className="absolute top-3 left-3 bg-[#1F4E8B] text-white px-2.5 py-1 rounded-full text-xs font-semibold">
          {timeEstimate}
        </div>

        {/* Time Badge */}
        <div className="absolute bottom-3 left-3  text-white px-2.5 py-1 text-xs font-semibold rounded-full border border-[rgba(255,255,255,0.19)] bg-[rgba(0,0,0,0.45)]">
          {propertyType}
        </div>

        {/* Time Badge */}
        {originalPrice && (
          <div
            className={cn(
              "absolute top-3 left-3 bg-[#147430] text-white px-2.5 py-1 rounded-full text-xs font-semibold",
              timeEstimate && "left-18",
            )}
          >
            ↓ <span className="ml-0.5">{priceFormatter.format(originalPrice)}</span>
          </div>
        )}

        {/* Favorite Button */}
        <FavoriteIcon savedProperty={savedProperty} />
      </div>

      {/* Content Container */}
      <div className="xl:p-6  p-4 space-y-1">
        {/* Price */}
        <div className="space-y-1">
          <p className="xl:text-xl text-lg font-bold text-[#1F4E8B]">
            {priceFormatter.format(price)}

            {originalPrice && (
              <span className="text-base text-[#594139] font-normal  line-through ml-2">
                {priceFormatter.format(originalPrice)}
              </span>
            )}

            {arv && (
              <span
                className={cn(
                  "text-primary-gray  font-medium ml-2",
                  originalPrice && "block ml-0",
                )}
              >
                (ARV: {priceFormatter.format(arv)})
              </span>
            )}
          </p>
        </div>

        {/* Address */}
        <h3 className="xl:text-xl text-lg font-semibold text-primary-black line-clamp-1">
          {address}
        </h3>

        {/* Property Details */}
        <div className="flex justify-between items-center gap-4 text-gray-700 pt-1">
          <div className="flex items-center xl:gap-2 gap-1">
            <BedIcon />
            <span className=" text-[#594139] font-semibold">
              {beds} Beds
            </span>
          </div>
          <div className="flex items-center xl:gap-2 gap-1">
            <ShawarIcon />
            <span className=" text-[#594139] font-semibold">
              {baths} Bath
            </span>
          </div>
          <div className="flex items-center xl:gap-2 gap-1">
            <AreaIcon />
            <span className=" text-[#594139] font-semibold">
              {(sqft / 1000).toFixed(0)}k sqft
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
