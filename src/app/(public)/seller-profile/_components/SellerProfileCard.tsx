import Container from "@/components/shared/container/Container";
import { Button } from "@/components/ui/button";
import { OctagonAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SellerProfileProps {
  name?: string;
  avatarUrl?: string;
  title?: string;
  location?: string;
  bio?: string;
  activeListings?: number;
  totalListed?: number;
  avgRating?: number;
}

export function SellerProfileCard({
  name = "James R.",
  avatarUrl = "/seller_profile.png",
  bio = "Property investor and wholesaler · Hamilton County, OH. I specialise in off-market residential and land deals across the tri-state area. All listings have clear title. I respond to messages within 24 hours and am committed to smooth, transparent transactions.",
  activeListings = 12,
  totalListed = 28,
  avgRating = 4.8,
}: SellerProfileProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 sm:flex-row lg:gap-8">
        {/* Avatar */}
        <Image
          src={avatarUrl}
          alt={name}
          width={1200}
          height={1200}
          className="size-20 shrink-0 rounded-lg object-cover sm:size-28 lg:size-40"
        />

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-semibold text-primary-black sm:text-2xl">
            {name}
          </h2>
          <p className="mt-1 text-lg text-[#594139]">{bio}</p>

          {/* Divider */}
          <div className="my-4 border-t border-gray-200 sm:my-5" />

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 sm:gap-x-16">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#594139]">
                ACTIVE LISTINGS
              </p>
              <p className="mt-1 text-xl font-semibold text-primary-blue">
                {activeListings}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wide text-[#594139]">
                TOTAL LISTED
              </p>
              <p className="mt-1 text-xl font-semibold text-primary-blue">
                {totalListed}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wide text-[#594139]">
                AVG RATING
              </p>
              <p className="mt-1 flex items-center gap-1 text-xl font-semibold text-primary-blue text-primary-black sm:text-xl">
                {avgRating} <span className="text-primary-blue">★</span>
              </p>
            </div>
            <div>
              <Link href="/message">
                <Button className="lg:px-10 px-5 py-5 cursor-pointer">Message Seller</Button>
              </Link>
            </div>
            <div className="flex items-center text-[#BA1A1A] gap-1 text-xl cursor-pointer">
             <OctagonAlert size="20"/> Report this seller
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
