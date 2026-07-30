import { Eye, Tag, Trash2, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Share from "@/components/utils/share";
import Link from "next/link";

interface PropertyCardProps {
  image: string;
  type: string;
  location: string;
  price: number;
  views: number;
  saved: number;
  offers: number;
  rsvp: number;
}

export default function DashboardPropertyCard({
  image,
  type,
  location,
  price,
  views,
  saved,
  offers,
  rsvp,
}: PropertyCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:gap-6">
      {/* Image Section */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg sm:h-40 sm:w-60">
        <Image src={image} alt={type} fill className="object-cover" />
        <div className="absolute left-3 top-3 rounded-full bg-[#DCFCE7] px-3 py-0.5 text-sm font-semibold text-[#166534]">
          ACTIVE
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {/* Header with Type and Price */}
          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
            <div>
              <h3 className="text-sm font-semibold text-primary-black">
                {type}
              </h3>
              <div className="mt-1 flex items-center font-semibold gap-1 text-sm text-primary-gray">
                <span>
                  <MapPin size={16} />
                </span>
                <span>{location}</span>
              </div>
            </div>
            <span className="text-base text-primary-color">
              ${price.toLocaleString()}
            </span>
          </div>

          {/* Stats Row */}
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <Eye size={18} className="text-[#505F76]" />
              <span>{views} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={18} className="text-[#505F76]" />
              <span>{saved} Saved</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag size={18} className="text-[#505F76]" />
              <span>{offers} offers</span>
            </div>
            <div className="flex items-center text-[#505F76] gap-1">
              <span>{rsvp} rsvp</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/user/my-listings/property-listing">
            <Button className="rounded-md cursor-pointer bg-[#1F4E8B] px-6 py-2 text-sm font-semibold text-white hover:bg-[#1F4E8B] hover:opacity-90">
              Edit Listing
            </Button>
          </Link>
          <Link href="/user/my-listings/1">
            <Button
              variant="outline"
              className="rounded-md cursor-pointer border border-primary-border-color px-6 py-2 text-sm font-semibold text-primary-black hover:bg-gray-100 duration-300 ease-in-out transition-transform"
            >
              View Details
            </Button>
          </Link>

          <Button
            variant="outline"
            className="rounded-md cursor-pointer border border-primary-border-color px-6 py-2 text-sm font-semibold text-primary-black hover:bg-gray-100 duration-300 ease-in-out transition-transform"
          >
            Update Price
          </Button>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-2">
            <Share title="property" link="/properties-list/1" />
            <button className="rounded p-2 hover:bg-gray-100 cursor-pointer">
              <Trash2 size={20} className="text-primary-gray" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
