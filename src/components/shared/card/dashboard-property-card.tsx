"use client";
import { Eye, Tag, Trash2, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Share from "@/components/utils/share";
import Link from "next/link";
import { UpdateListingPriceDialog } from "../dailogs/UpdateListingPriceDialog";
import { useState } from "react";
import { ScheduleOpenHouseDialog } from "../dailogs/ScheduleOpenHouseDialog";
import ImageWithFallback from "../image/ImageWithFallback";
import { cn } from "@/lib/utils";
import { IOpenHouse } from "@/types";

interface PropertyCardProps {
  id: string;
  image: string;
  type: string;
  location: string;
  price: number;
  views: number;
  saved: number;
  offers: number;
  rsvp: number;
  status: "Pending" | "Active" | "Under Contact" | "Sold" | "Rejected";
  openHouse: IOpenHouse;
}

const statusColor = {
  Active: "bg-[#DCFCE7] text-[#166534]",
  Pending: "bg-[#FEF3C7] text-[#92400E]",
  "Under Contact": "bg-[#ECE6F8] text-[#321ABA]",
  Sold: "bg-[#E5E7EB] text-[#374151]",
  Rejected: "bg-[#FEEAEA] text-[#BA1A1A]",
};

export default function DashboardPropertyCard({
  id,
  image,
  type,
  location,
  price,
  views,
  saved,
  offers,
  rsvp,
  status,
  openHouse,
}: PropertyCardProps) {
  const [open, setOpen] = useState(false);
  const [openHouseOpen, setOpenHouseOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:gap-6">
        {/* Image Section */}
        <Link href={`/user/my-listings/${id}`}>
          <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg sm:h-40 sm:w-60">
            <ImageWithFallback
              src={image}
              alt={"property image"}
              fill
              className="object-cover"
            />
            <div
              className={cn(
                "absolute left-3 top-3 rounded-full bg-[#DCFCE7] px-3 py-0.5 text-sm font-semibold text-[#166534]",
                statusColor[status],
              )}
            >
              {status}
            </div>
          </div>
        </Link>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {/* Header with Type and Price */}
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              <div>
                <Link href="/user/my-listings/1">
                  <h3 className="text-sm font-semibold text-primary-black">
                    {type}
                  </h3>
                </Link>
                <div className="mt-1 flex items-center font-semibold gap-1 text-sm text-primary-gray">
                  <span>
                    <MapPin size={16} />
                  </span>
                  <span className="line-clamp-1">{location}</span>
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

            <Button
              onClick={() => setOpenHouseOpen(true)}
              variant="outline"
              className="rounded-md cursor-pointer border border-primary-border-color px-6 py-2 text-sm font-semibold text-primary-black hover:bg-gray-100 duration-300 ease-in-out transition-transform"
            >
              Open House
            </Button>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="rounded-md cursor-pointer border border-primary-border-color px-6 py-2 text-sm font-semibold text-primary-black hover:bg-gray-100 duration-300 ease-in-out transition-transform"
            >
              Update Price
            </Button>

            {/* Right Icons */}
            <div className="ml-auto flex items-center gap-2">
              <Share title="property" link={`/properties-list/${id}`} />
              <button className="rounded p-2 hover:bg-gray-100 cursor-pointer">
                <Trash2 size={20} className="text-primary-gray" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <UpdateListingPriceDialog
        open={open}
        onOpenChange={setOpen}
        currentPrice={price}
        id={id}
      />

      <ScheduleOpenHouseDialog
        open={openHouseOpen}
        onOpenChange={setOpenHouseOpen}
        id={id}
        openHouse={openHouse}
      />
    </>
  );
}
