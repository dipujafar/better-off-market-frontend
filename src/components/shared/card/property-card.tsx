import { IPropertyResponse } from "@/types";
import FavoriteIcon from "../favorite_icon/FavoriteIcon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ImageWithFallback from "../image/ImageWithFallback";
import { handlePropertiesSpecifications } from "@/utils/handlePropertiesSpecifications";

export function PropertyCard({
  _id,
  photos,
  timeEstimate,
  originalPrice,
  listingPrice,
  arv,
  streetAddress,
  city,
  state,
  className,
  propertyType,
  specifications,
  propertiesSpecificationsClassName
}: IPropertyResponse & { className?: string , propertiesSpecificationsClassName?: string}) {
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });



  // Only keep entries whose value is truthy (drops undefined, null, 0, "", NaN)
  const propertySpecs = handlePropertiesSpecifications(propertyType, specifications).filter(
    (spec) => Boolean(spec.value),
  );

  return (
    <Link
      href={`/properties-list/${_id}`}
      className="w-full  rounded-lg overflow-hidden  shadow-sm hover:shadow-md transition-shadow bg-white group"
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative xl:h-64 h-56 w-full overflow-hidden bg-gray-100",
          className,
        )}
      >
        <ImageWithFallback
          src={photos?.[0]}
          alt={"property_image"}
          width={1200}
          height={1200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Time Badge */}
        <div className="absolute top-3 left-3 bg-[#1F4E8B] text-white px-2.5 py-1 rounded-full text-xs font-semibold">
          {timeEstimate}
        </div>

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3  text-white px-2.5 py-1 text-xs font-semibold rounded-full border border-[rgba(255,255,255,0.19)] bg-[rgba(0,0,0,0.45)]">
          {propertyType}
        </div>

        {/* Original Price Badge */}
        {originalPrice && (
          <div
            className={cn(
              "absolute top-3 left-3 bg-[#147430] text-white px-2.5 py-1 rounded-full text-xs font-semibold",
              timeEstimate && "left-18",
            )}
          >
            ↓{" "}
            <span className="ml-0.5">
              {priceFormatter.format(originalPrice)}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <FavoriteIcon id={_id} />
      </div>

      {/* Content Container */}
      <div className="xl:p-6  p-4 space-y-1">
        {/* Price */}
        <div className="space-y-1">
          <p className="xl:text-xl text-lg font-bold text-[#1F4E8B]">
            {priceFormatter.format(listingPrice)}

            {arv && (
              <span className={cn("text-primary-gray  font-medium ml-2")}>
                (ARV: {priceFormatter.format(arv)})
              </span>
            )}
          </p>
        </div>

        {originalPrice && (
          <span className="text-base text-primary-gray font-medium">
            {priceFormatter.format(originalPrice)}
          </span>
        )}

        {/* Address */}
        <h3 className="xl:text-lg font-semibold text-primary-black line-clamp-1">
          {streetAddress}, {city}, {state}
        </h3>

        {/* Property Details */}
        {propertySpecs.length > 0 && (
          <div className="flex justify-between items-center gap-4 text-gray-700 pt-1">
            {propertySpecs.map(({ icon: Icon, value, suffix }, index) => (
              <div key={index} className="flex items-center gap-1 ">
                {Icon && <Icon size={18} color="#594139" />}
                <span className={cn("text-[rgb(92,67,58)] text-sm font-semibold line-clamp-1", propertiesSpecificationsClassName)}>
                  {value} {suffix}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
